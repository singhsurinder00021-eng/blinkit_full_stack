import React from 'react'
import { MdOutlineClose } from "react-icons/md";

const UserMenuMobile = () => {
  return (
    <>
    <section className='bg-white h-full w-full py-4'>
      <button onClick={()=> window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
        <MdOutlineClose size={25} />
      </button>
      <div className="container mx-auto px-3 pb-8">
        <UserMenu/>
      </div>
        </section>
    </>
  )
}

export default UserMenuMobile

