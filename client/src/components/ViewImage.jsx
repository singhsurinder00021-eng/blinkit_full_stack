import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close }) => {
  return (
    <div className='fixed  top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-70 flex justify-center  items-center z-50 p-4'>
     <div className="w-full] p-4  bg-white ">
        <button onClick={close} className='w-fit ml-auto  block'>
            <IoClose size={25}/>
        </button>
        <img src={url}
        alt="full screen"
       className="max-w-full max-h-[80vh] object-contain "
        />
     </div>
    </div>
  )
}

export default ViewImage
