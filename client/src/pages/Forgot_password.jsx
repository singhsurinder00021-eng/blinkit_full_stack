import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr';

const Forgot_password = () => {
  const [data, setData] = useState({
    email: ""
  })

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
      ...SummaryApi.Forgot_password,
      data: data
    })

    if (response.data.error) {
      toast.error(response.data.message)
    }

    if (response.data.success) {
      toast.success(response.data.message)
      navigate('/verification', {
        state: {
          email: data.email
        }
      })

      setData({
        email: "",
      })
    }

  } catch (error) {
    AxiosToastError(error)
  }
}

  return (
    <section className='bg-white w-full container mx-auto'>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className='font-bold text-lg mb-3'>Forgot Password</p>

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
          <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800" : "bg-green-800"} bg-gray-500 text-white py-2 rounded my-3 tracking-wide font-semibold `}>Send otp</button>
        </form>

        <p>Alredy have account ? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800' >login</Link> </p>
      </div>
    </section>
  )
}

export default  Forgot_password
