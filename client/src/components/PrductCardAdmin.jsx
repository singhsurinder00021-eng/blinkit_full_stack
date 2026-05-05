import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import toast from 'react-hot-toast'

const PrductCardAdmin = ({data,fetchProductData}) => {
  const [editOpen,setEditOpen]= useState(false)
  const [openDelete,setOpenDelete]= useState(false)
  const handleDeleteCencal=()=>{
    setOpenDelete(false)
  } 
  const handleDelete= async()=>{
   try {
     const response = await Axios({
      ...SummaryApi.DeleteProductdetails,
      data:{
        _id : data._id
      }
     })

     const {data : responseData} = response

     if (responseData.success) {
      toast.success(responseData.message)
      if (fetchProductData) {
        fetchProductData()
      }
      setOpenDelete(false)
     }
   } catch (error) {
     AxiosToastError(error)
   }
  }
  return (
    <div className='w-36 p-4  bg-white  rounded'>
     <div className="">
        <img
         src={data?.image[0]}
         alt="hello"
         className='w-full h-full object-scale-dwon'
          />
     </div>
     <p className='text-ellipsis line-clamp-2 font-mediun'>{data?.name}</p>
     <p className='text-slate-400'>{data?.unit}</p>
     <div className=" grid grid-cols-2 gap-3 py-2">
      <button onClick={()=>setEditOpen(true)} className='border px-1 text-sm py-1  border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded' >Edit</button>
      <button onClick={()=>setOpenDelete(true)} className='border px-1 text-sm py-1  border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded' >Delete</button>
     </div>
{
  editOpen && (
    <EditProductAdmin fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)} />

  )
}


{
  openDelete && (
    <section className='fixed top-0 left-0  right-0 bottom-0 bg-neutral-600 z-50  bg-opacity-70 p-4 flex justify-center items-center'>
      <div className="bg-white p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-4">
          <h3>permanent delete</h3>
          <button  onClick={()=>setOpenDelete(false)}>
            <IoClose size={25}/>
          </button>
        </div>
        <p className='my-2'>Are You Sure want to delete Parmanent?</p>
           <div className="w-fit ml-auto flex items-center gap-3 ">
         <button onClick={handleDeleteCencal} className='px-3 py-1 border rounded text-red-500 hover:text-white hover:bg-red-500 border-red-500' >Cencel</button>
    <button onClick={handleDelete} className='px-3 py-1 border rounded text-green-500 hover:text-white hover:bg-green-500 border-green-500'>Confirm</button>
        </div>
      </div>
    </section>
  )
}
    </div>
  )
}

export default PrductCardAdmin
