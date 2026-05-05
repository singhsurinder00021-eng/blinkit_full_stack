import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router'
// import { useSelector } from 'react-redux'

const Dashboard = () => {
  // const user = useSelector(state=> state.user)

  // console.log("user dashbord",user)
  return (
    <section className='bg-white'>
      <div className="container max-auto p-3 grid lg:grid-cols-[250px,1fr]">
        {/* left for menu  */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-rounded">
          <UserMenu />
        </div>

        {/* right for content  */}
        <div className="bg-white p-4 mmin-h-[78vh]"  >
       <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
