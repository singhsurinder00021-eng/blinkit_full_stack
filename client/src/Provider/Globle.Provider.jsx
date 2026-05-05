import { createContext, useContext, useEffect, useState } from "react";
import { handleAddItemCart } from "../store/Cart.product";
import SummaryApi from "../comman/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosTosatErorr";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/address.Slice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
   const [totalPrice,setTotalPrice]= useState(0)
   const [totalQty,setTotalQty]= useState(0)
   const cartItem = useSelector(state =>state.cartItem.cart)
   const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
   const user = useSelector(state => state?.user)
  

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItems,
      });

      console.log("Cart API Response:", response);

      if (response?.data?.success && Array.isArray(response.data.data)) {
        dispatch(handleAddItemCart(response.data.data));
      } else {
        console.warn("Cart data invalid:", response?.data);
      }
    } catch (error) {
      console.error("Cart Error:", error);
      AxiosToastError(error);
    }
  };

  const updateCartItem = async(id,qty)=>{
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data:{
          _id : id,
          qty:qty
        }
      })
      const {data : responseData} = response
      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem()
        return responseData
      }
    } catch (error) {
      AxiosToastError(error)
      return error
    }
  }

const deleteCartItem = async (cartId) => {
  try {
    const response = await Axios({
      ...SummaryApi.deleteCartItem,
      data: {
        _id: cartId
      }
    });

    const { data: responseData } = response;

    if (responseData.success) {
      toast.success(responseData.message);
      fetchCartItem();
    }
  } catch (error) {
    AxiosToastError(error);
  }
};

  // useEffect(() => {
  //   fetchCartItem();
  // }, []); // dispatch hata diya (stable hai)
useEffect(() => {
  // ✅ total qty safe
  const qty = (cartItem || []).reduce((prev, curr) => {
    return prev + (curr?.quantity || 0);
  }, 0);

  setTotalQty(qty);

  // ✅ discounted total price
  const tPrice = (cartItem || []).reduce((prev, curr) => {
    const price = curr?.productId?.price || 0;
    const discount = curr?.productId?.discount || 0;
    const qty = curr?.quantity || 0;

    const priceAfterDiscount = PriceWithDiscount(price, discount);

    return prev + priceAfterDiscount * qty;
  }, 0);

  setTotalPrice(tPrice);

  // ✅ non-discount total price (FIXED)
  const notDiscountPrice = (cartItem || []).reduce((prev, curr) => {
    const price = curr?.productId?.price || 0;
    const qty = curr?.quantity || 0;

    return prev + price * qty;
  }, 0);

  setNotDiscountTotalPrice(notDiscountPrice);

}, [cartItem]);



const handleLogoutOut =()=>{
  localStorage.clear()
  dispatch(handleAddItemCart([]))
}


const fetchAddress = async ()=>{
  try {
    const response  = await Axios({
      ...SummaryApi.getAddress
    })
    const {data : responseData} = response
    if (responseData.success) {
      dispatch(handleAddAddress(responseData.data))
    }
  } catch (error) {
     AxiosToastError(error)
  }
}
useEffect(()=>{
fetchCartItem()
handleLogoutOut()
fetchAddress()
},[user])
  return (
    <GlobalContext.Provider value={{ fetchCartItem,updateCartItem,deleteCartItem,
      fetchAddress,
      totalPrice,
      totalQty,
      notDiscountTotalPrice
    }}>
      {children}
    </GlobalContext.Provider>
  );
};