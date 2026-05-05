import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
  import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPages,setIsSearchPages] = useState(false)
  const [isMobile]= useMobile()
    const params = useLocation()
  const searchText = params.search.slice(3)

  useEffect(() => {
    const isSearch = location.pathname === '/search'    
    setIsSearchPages(isSearch)
  }, [location])

  const redirectToSearchPages = () => {
    navigate("/search");
  };
  const handleOnChange = (e) =>{
  const value = e.target.value
  const url = `/search?q=${value}`
  navigate(url)

  }

  return (
  <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
    {
      (isMobile && isSearchPages) ?(
         <Link to={'/'} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full'>
<FaArrowLeft size={20} />  
  </Link>
    ):(
       <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
    <IoSearch size={22} />
  </button>
    )
    }
  



  <div className="w-full h-full">
    {
      !isSearchPages ? (
        <div onClick={redirectToSearchPages} className='w-full h-full flex items-center cursor-pointer'>
          
          <TypeAnimation
            sequence={[
              'search "milk"', 1000,
              'search "bread"', 1000,
              'search "sugar"', 1000,
              'search "paneer"', 1000,
              'search "curd"', 1000,
              'search "rice"', 1000,
              'search "egg"', 1000,
              'search "chips"', 1000,
              'search "grocery"', 1000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-black"
          />

        </div>
      ) : (
        <input
          type="text"
          placeholder='Search for Kitchen items'
          autoFocus
          defaultValue={searchText}
          className='bg-transparent w-full h-full outline-none px-2'
          onChange={handleOnChange}
        />
      )
    }
  </div>

</div>
  )
}

export default Search