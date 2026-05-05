import axios from "axios";
import SummaryApi, { baseURL } from "../comman/SummaryApi.js"; 

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true
});


// Sending access token in the header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accesstoken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken)

        if (newAccessToken) {
          originalRequest.headers.Authorization = `bearer  ${newAccessToken}`
          return Axios(originalRequest)
        }
      }
    }

     return Promise.reject(error)
  }
);

const refreshAccessToken = async (refresToken)=>{
  try {
      const response =await Axios({
        ...SummaryApi.refreshToken,
        headers:{
          Authorization:`Bearer ${refresToken}`
        }
      })

      const accessToken = response.data.data.accessToken
      localStorage.setItem('accessToken',accessToken)
      return accessToken
  } catch (error) {
     console.log(error)
  }
}

export default Axios;
