import React from 'react'

const Cencal = () => {
  return (
    <div className="m-2 w-full max-w-md bg-red-200 p-4 py-6 rounded mx-auto flex flex-col justify-center item-center gap-4">
        <p className='text-red-800 font-bold text-lg text-center' >Order Cancel</p>

        <Link to="/" className='border border-red-900 text-red-900 hover:bg-red-900 rounded mx-auto w-fit hover:text-white transition-all px-4 py-1'>Go to Home</Link>
    </div>
  ) 
}

export default Cencal
