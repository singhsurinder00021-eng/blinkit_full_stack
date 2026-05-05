import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import AxiosToastError from '../utils/AxiosTosatErorr';
import SummaryApi from '../comman/SummaryApi'
import Axios from '../utils/Axios';
import toast from 'react-hot-toast'


const Resetpassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const valideValue = Object.values(data).every(el => el)

    const handleChange = (e) => {
        setData ({
            ...data,
            [e.target.name]: e.target.value
        })
    }

   useEffect(() => {
        if (location?.state?.email) {
            setData ((prev) => ({
                ...prev,
                email: location?.state?.email
            }))
        }
    }, [location?.state?.email]) 


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.newPassword !== data.confirmPassword) {
            toast.error("new password and confirm password must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetpassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }

    }




    return (
        <section className='bg-white w-full container mx-auto'>
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
                <p className='font-bold text-lg mb-3'>Enter your new Password</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="newPassword">newPassword:</label>

                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">

                            <input
                                type={showPassword ? "text" : "password"}
                                id='newPassword'
                                className='w-full outline-none bg-transparent'
                                value={data.newPassword}
                                onChange={handleChange}
                                name='newPassword'

                                placeholder='Enter new password'
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
                        <label htmlFor="confirmPassword">confirmPassword:</label>

                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none bg-transparent'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                name='confirmPassword'

                                placeholder='Enter confirm password'
                            />
                            <div
                                className="cursor-pointer ml-2 text-gray-600"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {
                                    showConfirmPassword ? <FaEye /> : <IoEyeOff />
                                }
                            </div>
                        </div>

                    </div>
                    <button
                        disabled={!valideValue}
                        className={`text-white py-2 rounded my-3 tracking-wide font-semibold ${valideValue ? "bg-green-800" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Change Password
                    </button>
                </form>

                <p>Alredy have account ? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800' >login</Link> </p>
            </div>
        </section>
    )
}

export default Resetpassword
