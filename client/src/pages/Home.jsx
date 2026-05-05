import React from 'react'
import banner from "../assets/banner.jpg"
import bannerMob from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import { VaildeUrlConvert } from '../utils/VaildeUrlConvert'
import { Link, useNavigate } from 'react-router'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListPage = (id, cat) => {
    console.log(id, cat)
    const subCategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${VaildeUrlConvert(cat)}-${id}/${VaildeUrlConvert(subCategory.name)}-${subCategory._id}`

    navigate(url)
    console.log(url)
  }
  return (
    <>
      <section>
        <div className="container mx-auto">
          <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${loadingCategory && "animate-pulse"} my-2`}>
            <img src={banner} className='w-full h-full hidden lg:block' alt="banner" />
            <img src={bannerMob} className='w-full h-full lg:hidden' alt="banner" />
          </div>
        </div>

        <div className="container mx-auto px-3 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-2">
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c, index) => {
                return (
                  <div key={index + "lodingcategory"} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                )
              })
            ) : (
              categoryData?.length > 0 ? (
                categoryData.map((cat) => {
                  return (
                    <div
                      onClick={() => handleRedirectProductListPage(cat._id, cat.name)}
                      key={cat._id + "displayCategory"}
                      className="bg-white rounded-lg p-3 sm:p-4 shadow hover:shadow-md transition flex flex-col items-center"
                    >

                      <div className="w-full h-20 sm:h-24 md:h-28 flex items-center justify-center">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center mt-2 text-xs sm:text-sm md:text-base font-medium truncate w-full">
                        {cat.name}
                      </p>

                    </div>
                  )
                })
              ) : (
                <p>No categories found</p>
              )
            )
          }

        </div>


        {/* display category product */}
        {
          categoryData.map((c)=>{
            return(
              <CategoryWiseProductDisplay key={c?._id+"categorywiseProduct"} id={c?._id} name={c?.name} />

            )
          })
        }
      </section>

</>
  )
}

export default Home


