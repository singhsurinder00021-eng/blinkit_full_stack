import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi';
import AxiosToastError from '../utils/AxiosTosatErorr';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)



const [userData, setUserData] = useState({
  name: user?.name || "",
  email: user?.email || "",
  mobile: user?.mobile || "",
})

  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()

 useEffect(() => {
  setUserData({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  })
}, [user])

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  
const  handleSubmit= async(e)=>{
  e.preventDefault()
  
  try {
    setLoading(true)
    const response =await Axios({
     ...SummaryApi.updateUserDitails,
     data : userData 
    })

    const {data : responseData}= response

    if (responseData.success) {
      toast.success(responseData.message)
       const userData = await fetchUserDetails()
          dispatch(setUserDetails(userData.data))
    }
  } catch (error) {
     AxiosToastError(error)
  } finally{
    setLoading(false)
  }
}

  return (
    <div className='p-'>
      <div className="w-20 h-20 flex items-center justify-center rounded-fully overflow-hidden drop-shadow-sm">
        {
          user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )
        }
      </div>
      <button onClick={() => setProfileAvatarEdit(true)} className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3">
        Edit
      </button>

      {
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        )
      }

      {/* name mobile email change password */}
      <form action="" className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">name</label>
          <input type="text"
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-primary focus-within:border-primary-200 rounded'
            required
            value={userData.name || ""}
            name="name"
            onChange={handleOnchange}
            id=""
          />
        </div>

        <div className="grid">
          <label htmlFor="email">email</label>
          <input type="email"
            placeholder='Enter your email'
             required
            className='p-2 bg-blue-50 outline-primary focus-within:border-primary-200 rounded'
           value={userData.email || ""}
            name="email"
            onChange={handleOnchange}
            id="email"
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">mobile</label>
          <input type="text"
           required
            placeholder='Enter your mobile'
            classmobile='p-2 bg-blue-50 outline-primary focus-within:border-primary-200 rounded'
            value={userData.mobile || ""}
            name="mobile"
            onChange={handleOnchange}
            id=""
          />
        </div>

        <button className='border px-4 py-2 font-semibold hover:bg-primary-100  border-primary-100 text-primary-200 hover:text-neutral-800 rounded'>
          {
            loading ? "Loading..." : "submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile
