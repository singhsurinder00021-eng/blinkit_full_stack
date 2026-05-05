import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import { Link, useParams } from "react-router-dom"
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { VaildeUrlConvert } from '../utils/VaildeUrlConvert'


const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCategory, setDisplaySubCategory] = useState([])
  console.log(setPage,totalPage)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.splice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params?.category?.split("-")?.slice(-1)[0]
  const subCategoryId = params?.subCategory?.split("-")?.slice(-1)[0]

  const fetchProductdata = async () => {

    try {

      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {

        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : null

    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[270px,1fr] ">
        {/* sub category */}
        <div className="py-2 bg-white min-h-[90vh] overflow-y-scroll lg:py-4 max-h-[90vh] p-2 grid gap-1 shadow-md scrollbarCustom">
          {
            DisplaySubCategory.map((s)=>{
                const link = `/${VaildeUrlConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${VaildeUrlConvert(s.name)}-${s._id}`
              
              return(
                <Link to={link} className={`w-full p-2 bg-white lg:flex items-center  box-border  lg:w-full lg:h-16 lg:gap-4 border-b hover:bg-green-300 cursor-pointer ${subCategoryId  === s._id ? "bg-green-100":"" }`}>
                 <div className="w-fit lg:mx-0 max-w-28 mx-auto box-border ">
                   <img src={s.image}
                   className='w-14 lg:h-14 lg:w-12 h-full object-scale-dwon '
                   alt="SubCategory" />
                 </div>
<p className='mt-1 lg:mt-0 text-[11px] sm:text-xs md:text-sm lg:text-base text-center lg:text-left leading-tight line-clamp-2 lg:line-clamp-1'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>

        {/* product  */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-2 z-10">
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-3 ">
              {
                data.map((p, index) => {
                  return (
                    <CardProduct data={p} key={p._id + "productSubCategory" + index} />
                  )
                })
              }
            </div>
            {
              loading && (
                <Loading />
              )
            }
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage

