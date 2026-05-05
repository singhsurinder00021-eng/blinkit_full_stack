
import { Outlet, useLocation } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory,setLoadingCategory} from './store/ProductSlice';
import Axios from './utils/Axios';
import SummaryApi from './comman/SummaryApi';
import AxiosToastError from './utils/AxiosTosatErorr'; 
import { GlobalProvider } from './Provider/Globle.Provider';

import CartMobileLink from './components/CartMobil';
import { handleAddItemCart } from './store/Cart.product';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()


const fetchUser = async () => {
  try {
    const userData = await fetchUserDetails()

    if (!userData) return   // ✅ null check

    dispatch(setUserDetails(userData?.data || {}))  // ✅ safe access

  } catch (error) {
    console.log("Fetch User Error 👉", error)
  }
}

  const fetchCategory = async()=>{
    try {
    dispatch(setLoadingCategory(true))
      const response =  await Axios({
       ...SummaryApi.getCategory
      })
      const {data : responseData} = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }

    } catch (error) {
        console.log("Fetch category error:", error)
    }finally{
        dispatch(setLoadingCategory(false))
    }
  }
  const fetchSubCategory = async()=>{
    try {

      const response =  await Axios({
       ...SummaryApi.getSubCategory
      })
      const {data : responseData} = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
        // setCategoryData(responseData.data)
      }

    } catch (error) {
        console.log("Fetch category error:", error)
    }
  }

  const fetchCartItem = async ()=>{
    try {
      const response = await Axios({
        ...SummaryApi.getCartItems
      })
      const {data : responseData} = response

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data))
        console.log(responseData)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
useEffect(() => {
  fetchUser()
  fetchCategory()
  fetchSubCategory()
  fetchCartItem()
},[])


console.log(
)
  return (
   <GlobalProvider>
  <Header/>
  <main className="min-h-[80vh]">
    <Outlet/>
  </main>
  <Footer/>
  <Toaster/>
 {
  location.pathname !== '/checkout' && (
    <CartMobileLink/>

  )
 }
  
</GlobalProvider>
  )
}

export default App