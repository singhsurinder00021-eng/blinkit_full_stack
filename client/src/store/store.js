import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReduer from './ProductSlice'
import cartReducer from "./Cart.product"
import addressReducer from './address.Slice'
const store = configureStore({
  reducer: {
    user: userReducer,
    product : productReduer,
    cartItem: cartReducer,
    addresses :addressReducer

  }
})

export default store