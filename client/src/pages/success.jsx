import React from 'react'
import { Link, useLocation } from 'react-router'

const Success = () => {
    const location = useLocation()
  return (
    <div className="m-2 w-full max-w-md bg-green-200 p-4 py-6 rounded mx-auto flex flex-col justify-center item-center gap-4">
        <p className='text-green-800 font-bold text-lg text-center' > {location?.state?.text || "Payment"} Successfully</p>

        <Link to="/" className='border border-green-900 text-green-900 hover:bg-green-900 rounded mx-auto w-fit hover:text-white transition-all px-4 py-1'>Go to Home</Link>
    </div>
  )
}

export default Success
