import { Router } from "express";
import auth from "../middleware/auth.js";
import { addTOCartItemsController, deleteCartItemQtyController, getCartItemsController, updateCartItemQtyController } from "../controllers/Cart.Controller.js";

const  cartRouter = Router()


cartRouter.post('/create',auth,addTOCartItemsController)
cartRouter.get('/get',auth,getCartItemsController)
cartRouter.put('/update-qty',auth,updateCartItemQtyController)
cartRouter.delete('/delete-cart-item',auth,deleteCartItemQtyController)

export default cartRouter 