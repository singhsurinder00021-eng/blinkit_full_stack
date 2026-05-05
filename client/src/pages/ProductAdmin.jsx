
import React, { useEffect, useState } from 'react'
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import PrductCardAdmin from '../components/PrductCardAdmin'
import { IoSearch } from "react-icons/io5";


const ProductAdmin = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [search, setSearch] = useState("")

    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, 300)

        return () => clearTimeout(timer)
    }, [search])

    const fetchProductData = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                    limit: 12,
                    search: debouncedSearch
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setProductData(responseData.data)
                setTotalPageCount(responseData.totalPage || 1) // ✅ FIX
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData()
    },[page, debouncedSearch])

    const handleNext = () => {
        if (page < totalPageCount) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    const handleOnChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <section>
            <div className="p-2 h-full bg-white shadow-md flex items-center justify-between gap-4">
                <h2 className='font-semibold'>Product</h2>

                <div className="h-full w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 border focus-within:border-primary-200 rounded py-2">
                    <IoSearch size={25} />
                    <input
                        type="text"
                        placeholder='search product....'
                        className='h-full w-full outline-none bg-transparent'
                        onChange={handleOnChange}
                        value={search}
                    />
                </div>
            </div>

            {loading && <Loading />}

            <div className="p-4 bg-blue-50">
                <div className="min-h-[55vh]">
                    {/* ✅ FIXED GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {
                            productData.map((p) => (
                                <PrductCardAdmin key={p._id} data={p} fetchProductData={fetchProductData} />
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-between my-4">
                    <button onClick={handlePrevious} className='border px-4 py-1'>
                        Previous
                    </button>

                    <button className='w-full bg-white'>
                        {page}/{totalPageCount}
                    </button>

                    <button onClick={handleNext} className='border px-4 py-1'>
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductAdmin