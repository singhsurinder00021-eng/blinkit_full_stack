import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({cancel,confirm, close}) => {
  return (
    <>
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center">
<div className="bg-white w-full max-w-md p-4 rounded">
  <div className="flex justify-between items-center gap-3">
    <h1 className='font-semibold'>Parmanent Delete</h1>
    <button onClick={close}>
        <IoClose size={25} />
    </button>
  </div>
   <p className='my-4'>Are you sure permanent delete ?</p> 
   <div className="w-fit ml-auto flex items-center gap-3 ">
    <button className='px-3 py-1 border rounded text-red-500 hover:text-white hover:bg-red-500 border-red-500' onClick={cancel}>Cencel</button>
    <button className='px-3 py-1 border rounded text-green-500 hover:text-white hover:bg-green-500 border-green-500' onClick={confirm}>Confirm</button>
   </div>
</div>
    </div>
       
    </>
  )
}

export default ConfirmBox
