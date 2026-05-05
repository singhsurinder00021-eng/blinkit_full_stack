import React from 'react'
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupess'
import { Link } from 'react-router-dom'
import { VaildeUrlConvert } from '../utils/VaildeUrlConvert'
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
   const url = `/product/${VaildeUrlConvert(data?.name || "")}-${data?._id}`
    
  
// ,updateCartItem
 
  return (
       <Link to={url} className='border py-2  lg:p-4 grid gap-2 gap-1 lg:gap-3 min-w-38 lg:min-w-52 rounded cursor-pointer  bg-white '>
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
       <img src={data.image[0]} alt="image"
        className='w-full h-full object-scale-down lg:scale-125 '
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div className="p-[1px] px-2 text-xs w-fit rounded  text-green-600 bg-green-50">
          <h6>10 Min</h6>
          </div>
            <div>
         {
          Boolean(data.discount) && (
            <p className='text-green-600 rounded-full bg-green-100 px-2 w-fit text-sm'>{data.discount}% Discount</p>
          )
        }
       
      </div>
      </div>
      <div className="px-2 lg:px-0  font-medium text-ellipsis lg:text-base text-sm line-clamp-2">
        {data.name}
      </div>
      <div className="flex items-center gap-2 px-2 lg:px-0 text-sm lg:text-base">
        {data.unit} 
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupess(PriceWithDiscount(data.price,data.discount))}
        </div>
      
        </div>
        <div className="">
          {
            data.stock ==0 ?(
              <p className='text-red-500 text-sm text-center'>Out Of stock</p>
            ) :(
             <AddToCartButton data={data} />

            )
          }
        </div>
      </div>
    </Link>
  )
}

export default CardProduct