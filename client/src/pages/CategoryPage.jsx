import React, { useEffect, useState } from 'react'
import UplordCategoryModel from '../components/UplordCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/noData'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosTosatErorr'
import { useSelector } from 'react-redux'

const CategoryPage = () => {

  const [openUplordCategory, setOpenUplordCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    image: ""
  })

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })

  const allCategory = useSelector(state => state.product.allCategory)

useEffect(() => {
  setCategoryData(allCategory)
}, [allCategory])


  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        setCategoryData(responseData.data)
      }

    } catch (error) {
      console.log("Fetch category error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handelDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <>
      {/* <section>
        <div className="p-2 bg-white shadow-md flex items-center justify-between">
          <h2 className='font-semibold '> Category</h2>
          <button onClick={() => setOpenUplordCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Cotegory</button>
        </div>
        {!categoryData[0] && !loading && (
          <NoData />
        )}
        {/* {
          loading && (
            <Loading />
          )
        } */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {
            categoryData.map((category, index) => {
              return (
                <div className='w-32 h-56 rounded shadow-md' key={category._id || index}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full"
                  />
                  <div className="items-center h-9 flex gap-2">
                    <button onClick={() => {
                      setOpenEdit(true)
                      setEditData(category)
                    }} className='flex-1 hover:bg-green-200  bg-green-100 text-green-600 font-medium py-1 rounded'>
                      Edit
                    </button>
                    <button onClick={() => {
                      setOpenConfirmBoxDelete(true)
                      setDeleteCategory(category)
                    }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
        {(
          <Loading />
        )}
        {
          openUplordCategory && (
            <UplordCategoryModel fetchData={fetchCategory} close={() => setOpenUplordCategory(false)} />
          )
        }
        {
          openEdit && (
            <EditCategory data={editData} fetchData={fetchCategory} close={()=> setOpenEdit(false)} />
          )
        }
        {
          openConfirmBoxDelete && (
            <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cencel={() => setOpenConfirmBoxDelete(false)} confirm={handelDeleteCategory} />
          )
        }

      {/* </section> */} 
      <section className="w-full">

  {/* 🔹 Header */}
  <div className="p-3 bg-white shadow-md flex items-center justify-between sticky top-0 z-10">
    <h2 className='font-semibold text-base sm:text-lg'>Category</h2>

    <button
      onClick={() => setOpenUplordCategory(true)}
      className='text-xs sm:text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded transition'
    >
      + Add Category
    </button>
  </div>

  {/* 🔹 No Data */}
  {!categoryData[0] && !loading && (
    <NoData />
  )}

  {/* 🔹 Loader */}
  {loading && (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {new Array(10).fill(null).map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-3 shadow animate-pulse">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded mt-2"></div>
        </div>
      ))}
    </div>
  )}

  {/* 🔹 Category Grid */}
  <div className="p-3 sm:p-4 grid 
    grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
    gap-3 sm:gap-4">

    {
      categoryData.map((category) => (
        <div
          key={category._id}
          className='bg-white rounded-xl shadow hover:shadow-md transition p-3 flex flex-col justify-between'
        >

          {/* Image */}
          <div className="h-24 sm:h-28 flex items-center justify-center">
            <img
              src={category.image}
              alt={category.name}
              className="max-h-full object-contain"
            />
          </div>

          {/* Name */}
          <p className="text-center text-sm sm:text-base font-medium mt-2 truncate">
            {category.name}
          </p>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                setOpenEdit(true)
                setEditData(category)
              }}
              className='flex-1 text-xs sm:text-sm bg-green-100 hover:bg-green-200 text-green-600 py-1 rounded transition'
            >
              Edit
            </button>

            <button
              onClick={() => {
                setOpenConfirmBoxDelete(true)
                setDeleteCategory(category)
              }}
              className='flex-1 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-600 py-1 rounded transition'
            >
              Delete
            </button>
          </div>

        </div>
      ))
    }
  </div>

  {/* 🔹 Modals */}
  {
    openUplordCategory && (
      <UplordCategoryModel
        fetchData={fetchCategory}
        close={() => setOpenUplordCategory(false)}
      />
    )
  }

  {
    openEdit && (
      <EditCategory
        data={editData}
        fetchData={fetchCategory}
        close={() => setOpenEdit(false)}
      />
    )
  }

  {
    openConfirmBoxDelete && (
      <ConfirmBox
        close={() => setOpenConfirmBoxDelete(false)}
        cencel={() => setOpenConfirmBoxDelete(false)}
        confirm={handelDeleteCategory}
      />
    )
  }

</section>
    </>
  )
}

export default CategoryPage



