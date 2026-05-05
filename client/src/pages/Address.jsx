import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import EditAdressDetails from '../components/EditAdressDetails';
import AxiosToastError from '../utils/AxiosTosatErorr';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../Provider/Globle.Provider';



const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit,setOpenEdit]= useState(false)
  const [editData,setEditData]= useState({})
  const {fetchAddress} = useGlobalContext()

  const handleDisableAddress = async (id) =>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data:{
          _id : id
        }
      })
      if (response.data.success) {
        toast.success("address")
        if (fetchAddress) {
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div>
      <div className="bg-white shadow-lg px-2 py-2 flex items-center justify-between gap-4">
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-primary-200 text-primary-200  px-3 py-1 hover:bg-primary-200 hover:text-black rounded-full'>add Address</button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {
          addressList.map((address) => {
            return (
              <div className={`border rounded p-3 flex gap-2 bg-white ${!address.status ? 'hidden' : ''}`}>

                <div className="w-full">
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.mobile}</p>
                  <p>{address.country} - {address.pincode}</p>
                </div>
                <div className="grid gap-10">
                  <button onClick={()=>{
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'>
                    <IoPencil size={25}  />
                  </button>
                  <button onClick={()=>handleDisableAddress(address._id)} className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                    <MdDelete size={25} />
                  </button>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAdress(true)} className="h-16 bg-blue-50 cursor-pointer border-2 border-dashed flex justify-center items-center">
          Add Adress
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAdressDetails data={editData} close={()=>setOpenEdit(false)} />
        )
      }
    </div>
  )
}

export default Address
