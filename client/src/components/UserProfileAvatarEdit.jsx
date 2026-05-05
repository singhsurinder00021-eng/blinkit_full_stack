import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi';
import { uploadAvatar } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosTosatErorr';
import { IoClose } from "react-icons/io5";



const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)


    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData
      })
      const { data: responseData } = response
      dispatch(uploadAvatar(responseData.data.avatar))

      console.log(response)
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }


  }
  return (
    <>
      <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
          <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
            <IoClose size={20} />
          </button>
          <div className="w-20 h-20 flex items-center justify-center rounded-fully overflow-hidden drop-shadow-sm">
            {
              user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full" />
              ) : (
                <FaRegUserCircle size={60} />
              )
            }
          </div>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="uploadProfile">
              <div className='border cursor-pointer  border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 ' >upload
                {
                  loading ? "Loading..." : "upload"
                }
              </div>
            </label>
            <input onChange={handleUploadAvatarImage} type="file" name="" id="uploadProfile" className='hidden' />
          </form>

        </div>
      </section>

    </>
  )
}

export default UserProfileAvatarEdit
