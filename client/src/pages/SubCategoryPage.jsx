import React, { useEffect, useState } from 'react'  
import UploadSubcategory from '../components/UploadSubcategory'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import ViewImage from '../components/ViewImage'
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import { createColumnHelper } from "@tanstack/react-table"


const SubCategoryPage = () => {
  const [openSubCategory, setOpenSubCategory] = useState(false)
  const [data, setdata] = useState([])
  const [loading,setLoading]=useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)

  const [EditData, setEditData] = useState({
    _id: ""
  })

  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })

  const [openDeleteCorfirmBox, setOpenDeleteCorfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        setdata(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
 useEffect(()=>{
  fetchSubCategory( )
 },[])

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
      // cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return <div className=" flex justify-center items-center">
          <img src={row.original.image}
            onClick={() => {
              setImageURL(row.original.image)
            }}
            alt={row.original.image} className="w-8 h-8 cursor-pointer" />

        </div>
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-1">
            {(row.original.category || []).map((c) => (
              <p
                key={c?._id}
                className="shadow-md px-2 py-1 text-xs rounded bg-gray-100"
              >
                {c?.name}
              </p>
            ))}
          </div>
        );
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-200 rounded-full hover:text-green-600 text-green-500'>
              <MdOutlineEdit size={20} />
            </button>
            <button onClick={()=>{
              setOpenDeleteCorfirmBox(true)
              setDeleteSubCategory(row.original)}
            } className='p-2 bg-red-200 rounded-full hover:text-red-600 text-red-500'>
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    })
  ];

const handleDeleteSubCategory = async ()=>{
   try {
    const response = await Axios({
      ...SummaryApi.deleteSubCategory,
      data: { _id: deleteSubCategory._id }
    })

    const {data : responseData} = response

    if (responseData.success) {
      toast.success(responseData.message)
      fetchSubCategory()
      setOpenDeleteCorfirmBox(false)
      setDeleteSubCategory({_id : ""})
    }
   } catch (error) {
     AxiosToastError(error)
   }
}
  return (
    <section className=''>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className='font-semibold '>Sub Category</h2>
        <button onClick={() => setOpenSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Cotegory</button>
      </div>

      <div className="">
        {/* <DisplayTable data={data} columns={column} /> */}
        {
    loading ? (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-200 rounded-full animate-spin"></div>
      </div>
    ) : (
      <DisplayTable data={data} columns={column} />
    )
  }
      </div>
      {
        openSubCategory && (
          <UploadSubcategory close={() => setOpenSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )
      }

      {
        ImageURL &&
        <ViewImage url={ImageURL} close={() => setImageURL("")} />
      }

      {
        openEdit &&
        <EditSubCategory data={EditData} close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      }

      {
        openDeleteCorfirmBox && (
          <ConfirmBox
            cancel={()=>setOpenDeleteCorfirmBox(false)}
            close={()=>setOpenDeleteCorfirmBox(false)}
            confirm={handleDeleteSubCategory}
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage


