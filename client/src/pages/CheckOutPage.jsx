import React, { useState } from 'react'
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupess'
import { useGlobalContext } from '../Provider/Globle.Provider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
// import {loadStripe} from "@stripe/stripe-js"


const CheckOutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty,fetchCartItem } = useGlobalContext()
  const [openAdress,setOpenAdress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress,setSelectAddress]= useState()
  const cartItemList = useSelector(state =>state.cartItem.cart)
  const navigate = useNavigate()

 const handleCashOnDelivery = async ()=>{
    try {
       const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrderController,
        data:{
          list_items:cartItemList,
          totalAmt:totalPrice,
          totalQty:totalQty,
           addressId:addressList [selectAddress]?._id,
           sub_totalAmt:totalPrice
        }
       })

       const {data:responseData} = response

       if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) {
          fetchCartItem()
        }
        navigate('/success',{
          state:{
            text:"Order"
          }

        })
       }

    } catch (error) {
      AxiosToastError(error)
    }
 }

//  const handleOnLinePayment = async()=>{
//    try {

//     const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
//     const stripePromise = await loadStripe(stripePublicKey)

//     const response = await Axios({
//       ...SummaryApi.paymentController,
//       data:{
//         list_items:cartItemList,
//           totalAmt:totalPrice,
//           totalQty:totalQty,
//            addressId:addressList [selectAddress]?._id,
//            sub_totalAmt:totalPrice
//       }
//     })

//     const {data: responseData} = response

//     stripePromise.redirectToCheckout({sessionId : responseData.id})

//    } catch (error) {
//     AxiosToastError(error)
//    }
//  }


  return (
    <section className='bg-blue-50'>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-4 justify-between">
        <div className="w-full ">
          {/* address */}
          <h3 className='text-lg font-semibold' > Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {
              addressList.map((address,index)=>{
                return(
                 <label htmlFor={"address"+index} className={!address.status && "hidden"}>
                   <div className="border rounded p-3 flex gap-2 hover:bg-blue-50">
                    <div className="">
                      <input type="radio" value={index} id={"address"+index}  onChange={(e)=>setSelectAddress(e.target.value)} name='address' />
                    </div>
                    <div className="">
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.mobile}</p>
                    <p>{address.country} - {address.pincode}</p>

                    </div>
                  </div>
                 </label>
                )
              })
            }
             <div onClick={()=>setOpenAdress(true)} className="h-16 bg-blue-50 cursor-pointer border-2 border-dashed flex justify-center items-center">
            Add Adress
          </div>
          </div>

         
        </div>
        <div className="w-full max-w-md bg-white py-4 px-2 ">
          {/* summary */}
          <h3 className='text-lg font-semibold' >Summary</h3>
          <div className="bg-white p-2">
            <h3 className='font-semibold'>bill details</h3>
            <div className="flex gap-4 justify-between">
              <p>IQty Total</p>
              <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupess(notDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupess(totalPrice)}</span>
              </p>
            </div>
            <h3 className='font-semibold'>bill details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>IQty Total</p>
              <p className='flex items-center justify-between gap-2 ml-2'>
                {totalQty} items
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery charge</p>
              <p className='flex items-center justify-between gap-2 ml-2'>
                Free
              </p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p className=''>grand total</p>
              <p>{DisplayPriceInRupess(totalPrice)}</p>
            </div>
          </div>
<div className="w-full max-w-sm flex flex-col gap-4">
          <button onClick={handleCashOnDelivery} className=' py-2 px-4 bg-green-600 text-white font-semibold hover:bg-green-700  rounded'>online Payment</button>
          <button onClick={handleCashOnDelivery} className=' py-2 border-2 px-4 border-green-600 text-green font-semibold hover:bg-green-600  hover:text-white  rounded'>Cash on dilivery</button>
</div>
        </div>
      </div>
      {
        openAdress && (
          <AddAddress close={()=>setOpenAdress(false)} />
        )
      }
    </section>
  )
}

export default CheckOutPage
