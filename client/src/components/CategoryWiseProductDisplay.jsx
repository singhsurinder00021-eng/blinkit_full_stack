import React, { useEffect, useRef, useState } from 'react'
import { Link} from 'react-router'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VaildeUrlConvert } from '../utils/VaildeUrlConvert'
import { useSelector } from 'react-redux'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)
    const fetchCotegoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
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
        fetchCotegoryWiseProduct()
    }, [])




    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }


const handleRedirectProductListPage = () => {
  if (!Array.isArray(subCategoryData)) {
    return `/${VaildeUrlConvert(name)}-${id}`;
  }

  const subCategory = subCategoryData.find((sub) =>
    sub?.category?.some(
      (c) => c?._id?.toString() === id?.toString()
    )
  );

  if (!subCategory) {
    return `/${VaildeUrlConvert(name)}-${id}`;
  }

  const url = `/${VaildeUrlConvert(name)}-${id}/${VaildeUrlConvert(subCategory?.name)}-${subCategory?._id}`;

  return url;
};

const redirectURL = handleRedirectProductListPage();
    return (
        <>
            <div className="">
                <div className="container mx-auto p-4 flex items-center justify-between gap-4">
                    <h3 className='font-semibold text:lg md:text-xl'>{name}</h3>
                    <Link  to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
                </div>
                <div className="relative flex items-center">
                    <div className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth" ref={containerRef}>
                        {
                            loading &&
                            loadingCardNumber.map((_, index) => {
                                return (
                                    <CardLoading key={"categorywiseProductDisplay123" + index} />
                                )
                            })
                        }

                        {
                            data.map((p, index) => {
                                return (
                                    <CardProduct data={p} key={p._id + "categorywiseProductDisplay" + index} />
                                )
                            })
                        }


                    </div>
                    <div className="w-full left-0 right-0 container mx-auto px-2 absolute lg:flex hidden  justify-between">
                        <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg'>
                            <FaChevronLeft />
                        </button>
                        <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg'>
                            <FaChevronRight />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CategoryWiseProductDisplay
