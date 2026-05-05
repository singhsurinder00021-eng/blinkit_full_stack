
export const baseURL = import.meta.env.VITE_API_URL
const SummaryApi  = {
 register:{
    url:'/api/user/register',
    method:'post'
 },
  login:{
    url:'/api/user/login',
    method:'post'
 },
  Forgot_password:{
    url:'/api/user/forget-password',
    method:'put'
 },
 Forgot_password_otp_Verification:{
   url:'/api/user/verifyForgetPasswordOtp',
   method:'put' 
 },
 resetpassword :{
     url:'/api/user/reset-password',
   method:'put'
 },
 refreshToken :{
     url:'/api/user/refresh-token',
   method:'post'
 },
userDetails:{
   url:'/api/user/userDetails',
   method:'get'
},
 logout:{
    url:'/api/user/logout',
   method:'get'
 },
  uploadAvatar :{
    url:'/api/user/upload_avatar',
   method:'put' 
 },
 updateUserDitails:{
  url:'/api/user/update-user',
  method:'put'
 },
addCategory:{
  url:'/api/category/create',   
  method:'post'
},
 uplordImage :{
  url:'/api/file/uplord',
    method:'post'
 },
getCategory :{
  url :'/api/category/get',
  method:'post'  
},
 updateCategory:{
  url :'/api/category/update',
  method:'put'
 },
  deleteCategory:{
  url :'/api/category/delete',
   method:'delete'
 },
  createSubCategory:{
  url :'/api/subCategory/create',
   method:'post'
 },
  getSubCategory:{
  url :'/api/subCategory/get',
  method:'post'
 },
  UpdateSubCategory:{
  url :'/api/subCategory/update',
  method:'put'
 },
  deleteSubCategory:{
  url :'/api/subCategory/delete',
  method:'delete'
 },
 createProduct :{
  url :'/api/product/create',
  method:'post'
 },
  getProduct :{
  url :'/api/product/get',
  method:'post'
 },
  getProductByCategory :{
  url :'/api/product/get-product-by-category',
  method:'post'
 },
 getProductByCategoryAndSubCategory :{
  url :'/api/product/get-product-by-category-subCategory',
  method:'post'
 },
 getProductdetails:{
  url :'/api/product/get-product-detials',
  method:'post'
 },
 updateProductdetails:{
  url :'/api/product/update-product-details',
  method:'put'
 },
  DeleteProductdetails:{
  url :'/api/product/delete-product',
  method:'delete'
 },
  searchProduct:{
  url :'/api/product/search-product',
  method:'post'
 },
  addTocart:{
  url :'/api/cart/create',
  method:'post'
 },
   getCartItems:{
  url :'/api/cart/get',
  method:'get'
 },
  updateCartItemQty:{
  url :'/api/cart/update-qty',
  method:'put'
 },
  deleteCartItem:{
  url :'/api/cart/delete-cart-item',
  method:'delete'
 },
 createAddress:{
  url:'/api/address/create',
  method:'post'
 },
getAddress:{
  url:'/api/address/get',
  method:'get'
 },
updateAddress:{
  url:'/api/address/update',
  method:'put'
 },
 disableAddress:{
  url:'/api/address/delete',
  method:'delete'
 },
cashOnDeliveryOrderController:{
url:"/api/order/cash-on-delivery",
method:"post"
},
// paymentController:{
// url:"/api/order/checkout",
// method:"post"
// }

 

 
}

export default SummaryApi