import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, SetShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

  if (data.password !== data.confirmPassword) {
  toast.error("Password and Confirm Password must be same")
  return
}

    try {
     const response = await Axios({
  ...SummaryApi.register,
  data: data  
})
      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate('/login')
      }

    } catch (error) {
      AxiosToastError(error)
    }



  }

  return (
    <section className='bg-white w-full container mx-auto'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p>Welcome To Register</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
              value={data.name}
              name='name'
              onChange={handleChange}
              placeholder='enter your name'
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">email:</label>
            <input
              type="email"
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
              value={data.email}
              name='email'
              onChange={handleChange}
              placeholder='enter your email'
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">password:</label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">

              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none bg-transparent'
                value={data.password}
                name='password'
                onChange={handleChange}
                placeholder='enter your password'
              />
              <div
                className="cursor-pointer ml-2 text-gray-600"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {
                  showPassword ? <FaEye /> : <IoEyeOff />
                }
              </div>

            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">confirm Password:</label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">

              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className='w-full outline-none bg-transparent'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
                placeholder='enter your confirmPassword'
              />
              <div
                className="cursor-pointer ml-2 text-gray-600"
                onClick={() => SetShowConfirmPassword(prev => !prev)}
              >
                {
                  showConfirmPassword ? <FaEye /> : <IoEyeOff />
                }
              </div>

            </div>
          </div>

          <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800" : "bg-green-800"} bg-gray-500 text-white py-2 rounded my-3 tracking-wide font-semibold `}>Register</button>
        </form>

        <p>ALready have account ? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800' >Login</Link> </p>
      </div>
    </section>
  )
}

export default Register