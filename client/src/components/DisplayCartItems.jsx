import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, Links, useNavigate } from 'react-router'
import { useGlobalContext } from '../Provider/Globle.Provider'
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupess'
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from "../assets/empty_cart.webp"
import toast from 'react-hot-toast'

const DisplayCartItems = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice,totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage =()=>{
if (user?._id) {
     navigate('/checkout')
     if (close) {
        close()
     }
     return
}
toast("please Login")
    }
    return (
        <section className='bg-neutral-900 fixed top-0  bottom-0  left-0 right-0 bg-opacity-70 z-50'>
            <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
                <div className="flex items-center p-3 shadow-md gap-3 justify-between">
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} />
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} />
                    </button>
                </div>
                <div className="lg:min-h-[80vh] min-h-[75vh] h-full max-h-[clac(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
                    {/* display items  */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full ">
                                    <p>Your Total sarving</p>
                                    <p>{DisplayPriceInRupess(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className="bg-white rounded-lg p-2 gap-5 overflow-auto">
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item) => {
                                                return (
                                                    <div key={item?._id+"cartItemDisplay"} className="flex w-full gap-4 ">
                                                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                                                            <img src={item?.productId?.image[0]}
                                                                className='object-scale-down'
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="w-full max-w-sm text-xs">
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name} </p>
                                                            <p className='text-neutral-400 '>{item?.productId?.unit} </p>
                                                            <p className='font-semibold'>{DisplayPriceInRupess(PriceWithDiscount((item?.productId?.price, item?.productId?.discount)))} </p>
                                                        </div>
                                                        <div className="">
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
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
                            </>
                        ) : (
                                <div className="bg-white flex flex-col justify-center items-center">
                                    
                                        <img src={imageEmpty}
                                        className='w-full h-full object-scale-down'
                                        alt="" />
                                        <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link >
                                </div>
                        )
                    }
                </div>
                {
                    cartItem[0] && (
                <div className="p-2">
                    <div className="bg-green-700 text-neutral-100 px-4 py-4 font-bold text-base static bottom-3 rounded flex items-center gap-4 justify-between">
                        <div className="">
                            {DisplayPriceInRupess(totalPrice)}
                        </div>
                        <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                            PROCEED
                            <span><FaCaretRight /></span>
                        </button>
                    </div>
                </div>

                    )
                }

            </div>
        </section>
    )
}

export default DisplayCartItems
