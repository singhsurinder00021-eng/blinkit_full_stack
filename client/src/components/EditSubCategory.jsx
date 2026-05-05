import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uplordImage from '../utils/uplordImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosTosatErorr';



const EditSubCategory = ({ close ,data,fetchData}) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id:data._id,
        name:data.name,
        image:data.image,
        category: data.category || []
    })
const [loading, setLoading] = useState(false)
    const allCategory = useSelector(state => state.product.allCategory)
    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUplordSubCategoryImage = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            const response = await uplordImage(file)

         

            const imageUrl =
                response?.data?.url ||
                response?.data?.data?.url ||
                ""

            setSubCategoryData((prev) => ({
                ...prev,
                image: imageUrl
            }))

        } catch (error) {
            console.log("Image upload error:", error)
        }
    }

    const handleRemoveCategorySelected = (categoryId) => {
        setSubCategoryData((prev) => ({
            ...prev,
            category: prev.category.filter((el) => el._id !== categoryId)
        }))
    }

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.UpdateSubCategory,
                // data: subCategoryData.category.map(cat => cat._id)
                data: {
  _id: subCategoryData._id,
  name: subCategoryData.name,
  image: subCategoryData.image,
  category: subCategoryData.category.map(cat => cat._id)
}
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                }
                if (fetchData) {
                    fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }finally {
    setLoading(false)
  }
    }
    return (
        <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 z-50 bg-opacity-60 flex items-center justify-center p-4'>
            <div className="w-full max-w-6xl bg-white p-4 rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className='font-semibold '>Edit Sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form action="" className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded' />
                    </div>
                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <div className="border h-36 lg:w-36 w-full  bg-blue-50 flex items-center justify-center">
                                {!subCategoryData.image ? (
                                    <p className='text-sm text-neutral-400'>No Image</p>
                                ) : (
                                    <img src={subCategoryData.image}
                                        className='w-full h-full object-scale-down'
                                        alt="subCategory" />
                                )
                                }
                            </div>

                            <label htmlFor="uplordSubCategoryImage">
                                <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded  hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
                                    uplord Image
                                </div>
                                <input type="file" name="" id="uplordSubCategoryImage" className='hidden' onChange={handleUplordSubCategoryImage} />
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="">Select Category</label>
                        <div className="border focus-within:border-primary-200 rounded">
                            {/* display value */}
                            <div className="flex flex-wrap gap-2">
                                {
                                    subCategoryData.category.map((cat) => {
                                        return (
                                            <div
                                                className='flex items-center gap-1 bg-white shadow px-2 py-1 rounded'
                                                key={cat._id}
                                            >
                                                <span>{cat.name}</span>

                                                <IoClose
                                                    size={18}
                                                    className='cursor-pointer hover:text-red-600'
                                                    onClick={() => handleRemoveCategorySelected(cat._id)}
                                                />
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            {/* select category */}
                            <select onChange={(e) => {
                                const value = e.target.value
                                const categoryDetails = allCategory.find(el => el._id === value)
                                setSubCategoryData((preve) => {
                                    return {
                                        ...preve,
                                        category: [...preve.category, categoryDetails]
                                    }
                                })
                            }} className='w-full  p-2 bg-transparent outline-none border' name="" id="">
                                <option value={""}>
                                    Select Category
                                </option>
                                {
                                    allCategory.map((category) => {
                                        return (
                                            <option value={category?._id} key={category._id + "subCategory"}>
                                                {category?.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button className={`px-4 py-2 border
                    ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-gray-200" : "bg-primary-200 hover:bg-primary-100 "}
                   font-semibold `}>
                        {/* Submit */}
                        {loading ? "Loading..." : "Submit"}
                    </button>

                </form>
            </div>
        </section>
    )
}

export default EditSubCategory


