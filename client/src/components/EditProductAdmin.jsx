import React, {  useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uplordImage from '../utils/uplordImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../comman/SummaryApi';
import AxiosToastError from '../utils/AxiosTosatErorr';
import successAlert from '../utils/SuccessAlert';

const EditProductAdmin = ({close  ,data: propsData,fetchProductData}) => {
    
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
    //  publish:true

  })

  const [loading, setLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleUplordImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setLoading(true)
    const response = await uplordImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setLoading(false)

  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit =async(e)=>{
   e.preventDefault()
   console.log(data)
   try {
     const response = await Axios({
      ...SummaryApi.updateProductdetails,
      data:data
     })

     const  {data : responseData} = response

     if (responseData.success) {
      successAlert(responseData.message)
      if (close) {
        close()
      }
      fetchProductData()
      setData({
          name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
      })

     }
   } catch (error) {
    AxiosToastError(error)
   }
  }
//   useEffect(()=>{
//     successAlert(false)
//   },[])
  return (
<section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 p-4 bg-opacity-70'>
<div className="bg-white w-full p-4 max-w-2xl mx-auto rounded p-4 overflow-y-auto h-full max-h-[98vh]">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className='font-semibold '>Uplord Product</h2>
        <button onClick={close}>
            <IoMdClose size={20}/>
        </button>
        </div>
      <div className="grid p-3">
        <form action="" className='grid  gap-2' onSubmit={handleSubmit}>
          <div className="grid gap-1 ">
            <label htmlFor="name" className='font-medium'>Name</label>
            <input type="text"
              id='name'
              name='name'
              required
              value={data.name}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
              placeholder='Enter product Name' />
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="description">Name</label>
            <textarea type="text"
              id='description'
              name='description'
              required
              multiple
              rows={3}
              value={data.description}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none '
              placeholder='Enter product description' />
          </div>

          <div className="">
            <p>Image</p>

            <div className="">
              <label htmlFor='productImage' className="bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer">
                <div className="rext-center flex justify-center items-center flex-col ">
                  {
                    loading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={37} />
                        <p>Uplord Image</p>
                      </>
                    )
                  }

                </div>
                <input type="file"
                  name="productImage"
                  className='hidden'
                  accept='image/*'
                  onChange={handleUplordImage}
                  id="productImage" />
              </label>
              {/* display uplord img */}
              <div className="my-2 flex flex-wrap gap-4">
                {
                  data.image.map((img, index) => {
                    return (
                      <div className="h-20 w-20  min-w-20 bg-blue-50 border relative group" key={img + index}>
                        <img src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageUrl(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className="absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer">
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>


          <div className="grid gap-1 ">
            <label htmlFor="">Category</label>
            <div className="">
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                name="" id=""
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  console.log(category)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    }
                  })
                  setSelectCategory('')
                }}
              >
                <option value="">select category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option key={c?._id || index} value={c._id}>
                        {c.name}
                      </option>
                    )
                  })

                }
              </select>
              <div className="flex  flex-wrap gap-3">
                {
                  data.category.map((c, index) => {
                    return (
                      <div className="text-sm flex itmes-center gap-2 bg-blue-50 mt-2" key={c._id + index + "productsection"}>
                        <p>{c.name}</p>
                        <div className="hover:text-red-500 cursor-pointer" onClick={() => handleRemoveCategory(index)}>
                          <IoMdClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="">Sub Category</label>
            <div className="">
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                name="" id=""
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory('')
                }}
              >
                <option value="" className='text-neutral-600'>select Sub category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option key={c?._id || index} value={c._id}>
                        {c.name}
                      </option>
                    )
                  })

                }
              </select>
              <div className="flex  flex-wrap gap-3">
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div className="text-sm flex itmes-center gap-2 bg-blue-50 mt-2" key={c._id + index + "subCategorySection"}>
                        <p>{c.name}</p>
                        <div className="hover:text-red-500 cursor-pointer" onClick={() => handleRemoveSubCategory(index)}>
                          <IoMdClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="unit">Unit</label>
            <input type="text"
              id='unit'
              name='unit'
              required
              value={data.unit}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
              placeholder='Enter product Unit' />
          </div>


          <div className="grid gap-1 ">
            <label htmlFor="stock">No.Of Stock</label>
            <input type="Number"
              id='stock'
              name='stock'
              required
              value={data.stock}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
              placeholder='Enter product Stock' />
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="price">price</label>
            <input type="Number"
              id='price'
              name='price'
              required
              value={data.price}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
              placeholder='Enter product price' />
          </div>


          <div className="grid gap-1 ">
            <label htmlFor="discount">discount</label>
            <input type="Number"
              id='discount'
              name='discount'
              required
              value={data.discount}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
              placeholder='Enter product discount' />
          </div>

          {/* add more filed */}
  {
    Object.keys(data?.more_details || {}).map((k, index) => {
      return (
        <div key={k + index} className="grid gap-1">
          <label htmlFor={k}>{k}</label>

          <input
            type="text"   // or "number" if needed
            id={k}
            name={k}
            required
            value={data.more_details[k]}
            onChange={(e) => {
              const value = e.target.value

              setData((prev) => ({
                ...prev,
                more_details: {
                  ...prev.more_details,
                  [k]: value
                }
              }))
            }}
            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            placeholder={`Enter ${k}`}
          />
        </div>
      )
    })
  }


          <div onClick={() => setOpenAddField(true)} className="inline-block hover:bg-primary-200 bg-white py-1 px-3 w-32 cursor-pointer text-center font-semibold border border-primary-200 hover:text-neutral-900 rounded">
            Add Field
          </div>


          <button
          className='bg-primary-200 hover:bg-primary-100 py-2 rounded font-semibold'
          >Update product</button>
        </form>
      </div>


      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
        )

      }

      {
        openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)} />
        )
      }

</div>
</section>

  )
}

export default  EditProductAdmin
