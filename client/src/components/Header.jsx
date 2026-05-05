import React, {  useState } from 'react'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile"
import { TiShoppingCart } from "react-icons/ti";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu'; 
import { useSelector } from "react-redux";
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupess';
import { useGlobalContext } from '../Provider/Globle.Provider';
import DisplayCartItems from './DisplayCartItems';


const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const user = useSelector((state) => state?.user)
  const cartItem = useSelector(state =>state.cartItem.cart)
const {totalPrice,totalQty} = useGlobalContext()
const [openCartSection,setOpenCartSection] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

const handleMobileUser = () => {
  if (!user?._id) {
    navigate("/login")
    return
  }
  navigate("/user")
}
  return (
    <header className='h-28 lg:h-20  shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center  px-2 justify-between">

            {/* logo */}
            <div className="h-full">
              <Link to={"/"} className="h-full flex items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-primary-200">blink</span>
                  <span className="text-secondary-200">it</span>
                </h1>
              </Link>
            </div>

            {/* search */}
            <div className="w-full max-w-[500px] px-2 hidden lg:block">
              <Search />
            </div>

            {/* login */}
            <div>
              {/* mobil  */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser} >
                <FaRegUserCircle size={24} />
              </button>


              {/* desktop */}
              <div className="hidden lg:flex items-center gap-10">

                {
                  user?._id ? (
                    <div className="relative">
                      <div onClick={() => setOpenUserMenu(preve => !preve)} className="flex select-none items-center gap-1 cursor-pointer">
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={25} />

                          ) : (
                            <GoTriangleDown size={25} />
                          )
                        }

                      </div>
                      {
                        openUserMenu && (
                          <div className="absolute right-0 top-16">
                            <div className="bg-rounded p-4 min-w-52 lg:shodow-lg">
                              <UserMenu close={handleCloseUserMenu} />
                            </div>
                          </div>
                        )
                      }

                    </div>
                  ) : ( 
                    <button onClick={redirectToLoginPage} className='text-lg px-2' >login</button>

                  )
                }
                <button onClick={()=>setOpenCartSection(true)} className="flex item-center gap-2 bg-green-800 hover:bg-green-700 px-4 py-3 rounded text-white">
                  <div className='animate-bounce' >
                    <TiShoppingCart size={25} />
                  </div>
                  <div className=" text-sm">
                    {
                      cartItem[0] ?(
                        <div className="">
                           <p>{totalQty} Items</p>
                           <p>{DisplayPriceInRupess(totalPrice)}</p>
                        </div>
                      ) :(
                          <p>  my cart</p>
                      )
                    }
                  </div>
                </button>
              </div>
            </div>

          </div>
        )
      }
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

{
  openCartSection && (
    <DisplayCartItems close={()=>setOpenCartSection(false)} />
  )
}
    </header>
  )
}

export default Header