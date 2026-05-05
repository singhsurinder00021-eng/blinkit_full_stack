import { Router } from "express";
import auth  from "../middleware/auth.js";
import { cashOnDeliveryOrderController} from "../controllers/order.controller.js";

const  OrderRouter = Router()

OrderRouter.post('/cash-on-delivery',auth,cashOnDeliveryOrderController)
// OrderRouter.post('/checkout',auth,paymentController)
// OrderRouter.post('/webhook',webhookStripe)

export default OrderRouter