import Axios from "./Axios";
import SummaryApi from "../comman/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });

    console.log("Response:", response.data);

    return response.data;

  } catch (error) {
    if (error?.response?.status === 401) {
      console.log("Token expired → logout");

      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return null;
  }
};

export default fetchUserDetails;