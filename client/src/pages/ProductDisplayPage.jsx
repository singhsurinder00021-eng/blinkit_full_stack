import React, { useEffect, useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupess'
import Divider from '../components/Divider'
import img1 from "../assets/minute_delivery.png"
import img2 from "../assets/Best_Prices_Offers.png"
import img3 from "../assets/Wide_Assortment.png"
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  const productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(0)
  const imageContainer = useRef()

  const fetchProductDetials = async () => {
    try {
      setLoading(true)


      const response = await Axios({
        ...SummaryApi.getProductdetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)

      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetials()
  }, [params])


  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollRight -= 100
  }
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
 
      <div className="">
        <div className="min-h-56 lg:min-h-[72vh] lg:max-h-[72vh]  max-h-56 bg-white rounded h-full w-full">
          <img src={data.image[image]}
            className='w-full h-full object-scale-down'
            alt="" />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"} `}>

                </div>
              )
            })
          }
        </div>
        <div className="grid relative">
          <div ref={imageContainer} className="flex  relative z-10 gap-3 w-full overflow-x-auto scrollbar-none ">
            {
              data.image.map((img, index) => {
                return (
                  <div className="w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md" key={img + index}>
                    <img src={img}
                      className='w-full h-full object-scale-down'
                      alt="mini-product "
                      onClick={() => setImage(index)}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="w-full h-full -ml-3 flex justify-between  absolute items-center">
            <button onClick={handleScrollLeft} className='z-10 bg-white relative  p-1  rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1  rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="my-4 grid gap-3 hidden lg:grid">
          <div className="">
            <p className='font-semibold'>Description</p>
          <p className='text-base'>{data.description}</p>
          </div>
          <div className="">
            <p className='font-semibold'>Unit</p>
          <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
              return(
                 <div className="">
            <p className='font-semibold'>{element}</p>
          <p className='text-base'>{data?.more_details[element]}</p>
          </div>
              )
            })
          }
        </div>
      </div>



      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className='bg-green-300 w-fit px-2 rounded-full' >10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p > {data.unit}</p>
        <Divider />
        <div className="">
          <p>Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-500 px-4 py-2 rounded bg-green-100 w-fit">
            <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupess(PriceWithDiscount(data.price,data.discount))}</p>
          </div>
          {
             data.discount &&(
              <p className='line-through text-lg'>{DisplayPriceInRupess(data.price)}</p>
             )
          }
          {
            data.discount && (

              <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-600'>Discount</span></p>
            )
          }
          </div>

        </div>
        {
          data.stock === 0  ? (
            <p className='text-lg text-red-500 my-3'>Out Of Stock</p>
          ) :(
        // <button className='my-4 px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded'>Add</button>
        <div className=" my-4 ">
          <AddToCartButton data={data}/>

        </div>
          )
        }
        <Divider />
    <h2 className='font-semibold'>Why Shop From Blinkit?</h2>

     <div className="flex items-center gap-4 my-5">
      <div className="">
        <img src={img1}
        className='w-20 h-20'
        alt="superfast delivery" />
      </div>
      <div className="text-sm">
        <div className="font-semibold">
          superfast delivery
        </div>
        <p>Get Your Order Delivered to Your Doorstep at the Earliest from dark Store near You...</p>
      </div>
     </div>


  <div className="flex items-center gap-4 my-5">
  <div className="flex items-center gap-4 my-5">
        <img src={img2}
        className='w-20 h-20'
        alt="best Price offer" />
      </div>
      <div className="text-sm">
        <div className="font-semibold">
          Best Prices & offer
        </div>
        <p>best Price Destination with offers directly From the nanuFacturers</p>
      </div>
      </div>
     <div className="flex items-center gap-4 my-5">
  <div className="">
        <img src={img3}
        className='w-20 h-20'
        alt="Wide Assortment" />
      </div>
      <div className="text-sm">
        <div className="font-semibold">
          Wide Assortment
        </div>
        <p>Choose From 5000+ products across food personal care,household & other Categories.</p>
      </div>
      </div>
      {/* mobil onlu */}

              <div className="my-4 grid gap-3 ">
          <div className="">
            <p className='font-semibold'>Description</p>
          <p className='text-base'>{data.description}</p>
          </div>
          <div className="">
            <p className='font-semibold'>Unit</p>
          <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element)=>{
              return(
                 <div className="">
            <p className='font-semibold'>{element}</p>
          <p className='text-base'>{data?.more_details[element]}</p>
          </div>
              )
            })
          }
        </div>
      </div>

    </section>
  )
}

export default ProductDisplayPage
