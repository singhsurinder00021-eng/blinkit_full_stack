import React, { useEffect, useState } from 'react'
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import ProductAdmin from './ProductAdmin'



const Product = () => {
  const [productData,setProductData]= useState([])
  const [page,setPage]=useState(1)
  const [loading,setLoading]= useState(false)
  const fetchProductData = async ()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data:{
          page:page,
        }
      })

      const {data:responseData} = response

      if (responseData.success) {
        setProductData(responseData.data)
      }
    } catch (error) {
       AxiosToastError(error)
    }finally{
    setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductData()
  },[])
  return (
    <div>
 <ProductAdmin/>
    </div>
  )
}

export default Product
