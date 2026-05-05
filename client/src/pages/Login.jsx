import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
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
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data:data
      })
      if (response.data.error) {
        toast.error(response.data.message)
        
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          email: "",
          password: "",
        })
      }
       navigate('/')

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-white w-full container mx-auto'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p>Login</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
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
              <div className="cursor-pointer ml-2 text-gray-600"
                onClick={() => setShowPassword(prev => !prev)}>
                {
                  showPassword ? <FaEye /> : <IoEyeOff />
                }
              </div>
            </div>
            <Link to={'/forgot-password'} className='block ml-auto hover:text-primary-200'>Forget Password ?</Link>
          </div>


          <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800" : "bg-green-800"} bg-gray-500 text-white py-2 rounded my-3 tracking-wide font-semibold `}>Login</button>
        </form>

        <p>Don't have account ? <Link to={'/register'} className='font-semibold text-green-700 hover:text-green-800' >register</Link> </p>
      </div>
    </section>
  )
}

export default Login
