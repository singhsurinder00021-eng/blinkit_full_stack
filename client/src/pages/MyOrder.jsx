import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/noData'

const MyOrder = () => {
  const orders = useSelector(state => state.order?.orders || [])
  console.log(orders)
  return (
    <div>
      <div className="bg-white shadow-md p-2 font-semibold">
        <h1>Orders</h1>
      </div>
      {
    
    !orders[0] && (
      <NoData/>
    )
    }
    {
      orders.map((order,index)=>{
        return(
          <div key={order._id+index+"orders"} className="order rounded p-4">
            <p>Order No :{order.orderID}</p>
          </div>
        )
      })
    }
    </div>
  )
}

export default MyOrder
