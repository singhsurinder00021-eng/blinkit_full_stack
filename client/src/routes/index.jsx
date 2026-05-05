import { createBrowserRouter } from "react-router-dom";
import SearchPages from "../pages/SearchPages";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgot_password from "../pages/Forgot_password";
import Verification_otp from "../pages/Verification_otp";
import Resetpassword from "../pages/Resetpassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import Uplordproduct from "../pages/Uplordproduct";
import Product from "../pages/Product";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/success";
import Cencal from "../pages/Cencal";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
       {
        path: "Search",
        element: <SearchPages/>,
      },
       {
        path: "login",
        element: <Login/>,
      },
       {
        path: "register",
        element: <Register/>,
      },
      {
        path:"forgot-password",
        element:<Forgot_password/>
      },
      {
        path:"verification",
        element:<Verification_otp/>
      },
      {
        path:"reset-password",
        element:<Resetpassword/>
      },
      {
        path:"user",
        element:<UserMenuMobile/>
      },
      {
        path:"dashboard",
        element:<Dashboard/>,
        children:[
          {
            path:"profile",
            element:<Profile/>
          },
          {
            path:"myorders",
            element:<MyOrder/>
          },
          {
            path:"address",
            element:<Address/>
          },
          {
            path:"category",
            element:<AdminPermision><CategoryPage/></AdminPermision>
          },
          {
            path:"subcategory",
            element:<AdminPermision><SubCategoryPage/> </AdminPermision>
          },
          {
            path:"uplordproduct",
            element:<AdminPermision><Uplordproduct/></AdminPermision>
          },
          {
            path:"product",
            element:<AdminPermision><Product/></AdminPermision>
          }
        ]
      },
      {
        path :":category",
        children:[
          {
            path:":subCategory",
            element:<ProductListPage/>
          }
        ]
      },
      {
        path:"product/:product",
        element: <ProductDisplayPage/>
      },
       {
        path:"cart",
        element: <CartMobile/>
      },
      {
        path:"checkout",
        element:<CheckOutPage/>
      },
      {
        path:"success",
        element: <Success/>
      },
         {
        path:"cencal",
        element: <Cencal/> 
      }
    ]
  },

]);
export default router 