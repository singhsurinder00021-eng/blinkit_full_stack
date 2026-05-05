import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi'
import AxiosToastError from '../utils/AxiosTosatErorr';

const Verification_otp = () => {
    const [data, setData] = useState(["", "", "", "", "", ""])
    const inputRef = useRef([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    })

    const valideValue = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await Axios({
                ...SummaryApi.Forgot_password_otp_Verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData(["", "", "", "", "", ""])
                navigate('/reset-password', {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                })
            }

        } catch (error) {
            console.log("erorr", error)
            AxiosToastError(error)
        }



    }

    return (
        <section className='bg-white w-full container mx-auto'>
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
                <p className='font-bold text-lg mb-3'>Enter OTP</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="otp">otp:</label>

                        <div className="flex items-center gap-2 justify-between mt-3">
                            {
                                data.map((element, index) => {
                                    return (
                                        <input
                                            key={index}
                                            type="text"
                                            ref={(ref) => {
                                                inputRef.current[index] = ref
                                                return ref
                                            }}
                                            maxLength={1}
                                            value={data[index]}
                                            onChange={(e) => {
                                                const newData = [...data]
                                                newData[index] = e.target.value
                                                setData(newData)

                                                if (e.target.value && inputRef.current[index + 1]) {
                                                    inputRef.current[index + 1].focus()
                                                }
                                            }}
                                            className='bg-blue-50 text-center w-full max-w-16 p-2 border rounded outline-none focus-within:border-primary-200'
                                        />
                                    )
                                })
                            }
                        </div>


                    </div>
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800" : "bg-green-800"} bg-gray-500 text-white py-2 rounded my-3 tracking-wide font-semibold `}>verify otp</button>
                </form>

                <p>Alredy have account ? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800' >login</Link> </p>
            </div>
        </section>
    )
}

export default Verification_otp

