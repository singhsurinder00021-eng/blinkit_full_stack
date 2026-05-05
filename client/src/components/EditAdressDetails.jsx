import React from 'react'
import { useForm } from "react-hook-form"
import AxiosToastError from '../utils/AxiosTosatErorr'
import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'
import toast from 'react-hot-toast'
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from '../Provider/Globle.Provider'

const EditAdressDetails = ({ close, data }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id : data._id,
            userId : data.userId,
            address_line: data.addressline,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            country: data.country,
            mobile: data.mobile
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: {
                    ...data,
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='bg-black fixed top-0 left-0 right-0 bottom-0  z-50 bg-opacity-70 h-[100vh] overflow-auto'>
            <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
                <div className=" flex items-center justify-between gap-4">
                    <h2 className="font-semibold">Edit Address</h2>
                    <button onClick={close} className='hover:text-red-500'>
                        <IoMdClose size={25} />
                    </button>
                </div>
                <form action="" className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <label htmlFor="addressline">Address Line:</label>
                        <input
                            type="text"
                            name=""
                            id="addressline"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("addressline", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            name=""
                            id="city"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city", { required: true })}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="pincode">pincode:</label>
                        <input
                            type="text"
                            name=""
                            id="pincode"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("pincode", { required: true })}
                        />
                    </div>


                    <div className="grid gap-1">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            name=""
                            id="state"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("state", { required: true })}
                        />
                    </div>



                    <div className="grid gap-1">
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            name=""
                            id="country"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="mobile">Mobil Number:</label>
                        <input
                            type="text"
                            name=""
                            id="mobile"
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobile", { required: true })}
                        />
                    </div>

                    <button type='submit' className='bg-primary-200 w-full py-2 mt-4  font-semibold  hover:bg-primary-100'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default EditAdressDetails

