import CartProduct from "../models/cartProduct.model.js";
import Order from "../models/order.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";



export const cashOnDeliveryOrderController = async (req, res) => {
    try {
        const userId = req.userId
        const { list_items, totalAmt, addressId, sub_totalAmt } = req.body

        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image
                },
                paymentId: "",
                payment_status: "Cash On Delivery",
                delivery_address: addressId,
                sub_totalAmt: sub_totalAmt,
                totalAmt: totalAmt,
            })
        })

        const generatedOrder = await Order.insertMany(payload)

        ////////////remove from cart////

        const removeCartItems = await CartProduct.deleteMany({ userId: userId })

        const upadteInUser = await userModel.updateOne({ _id: userId }, { Shopping_cart: [] })

        return res.json({
            message: "Order Successfully",
            error: false,
            success: true,
            data: generatedOrder
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}
// export const PriceWithDiscount = (price,dis = 1)=>{
//     const discountAmount = Math.ceil((Number(price)* Number(dis)) / 100)
//     const actualPrice = Number (price) - Number(discountAmount)
//     return actualPrice 
// }

// export const paymentController = async (req, res) => {
//     try {
//         const userId = req.userId
//         const { list_items, totalAmt, addressId, sub_totalAmt } = req.body

//         const user = await userModel.findById(userId)

//         const line_items = list_items.map(item =>{
//        return{  
//         price_data:{
//             currency:'inr',
//             product_data:{
//                 name:item.productId.name,
//                 images:item.productId.image,
//                 metadata :{
//                     productId : item.productId._id
//                 }
//             },
//             unit_amount : PriceWithDiscount(item.productId.price,item.productId.discount) * 100
//         },
//         adjustable_quantity :{
//             enabled : true,
//             minimum :1
//         },
//         quantity:item.quantity
//     }
//         })
     
//         const params = {
//             submit_type :'pay',
//             mode:'payment',
//             payment_method_types: ['card'],
//             customer_email : user.email,
//             metadata:{
//                 userId: userId,
//                 addressId:addressId
//             },
//             line_items: line_items,
//             success_url:`${process.env.FRONTEND_URL}/success`,
//             cancel_url :`${process.env.FRONTEND_URL}/cancel`,
//         }

//         const session = await Stripe.checkout.sessions.create(params)

//         return res.status(200).json(session)
//         //  return res.json({ id: session.id }) // ✅ FIXED
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || error,
//             success: false,
//             error: true
//         })
//     }
// }
// export const paymentController = async (req, res) => {
//     try {
//         const userId = req.userId
//         const { list_items, totalAmt, addressId, sub_totalAmt } = req.body

//         const user = await userModel.findById(userId)

//         const line_items = list_items.map(item => ({
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: item.productId.name,
//                     images: item.productId.image,
//                     metadata: {
//                         productId: item.productId._id
//                     }
//                 },
//                 unit_amount: PriceWithDiscount(
//                     item.productId.price,
//                     item.productId.discount
//                 ) * 100
//             },
//             quantity: item.quantity
//         }))

//         const session = await stripe.checkout.sessions.create({
//             submit_type: 'pay',
//             mode: 'payment',
//             payment_method_types: ['card'],
//             customer_email: user.email,
//             metadata: {
//                 userId,
//                 addressId
//             },
//             line_items,
//             success_url: `${process.env.FRONTEND_URL}/success`,
//             cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//         })

//         return res.json({ id: session.id })

//     } catch (error) {
//         console.log("STRIPE ERROR 👉", error)
//         return res.status(500).json({
//             message: error.message || error,
//             success: false,
//             error: true
//         })
//     }
// }

// export const webhookStripe = async (req,res) =>{
//     try {
//         const event = req.body
//       const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY
//         console.log("event",event)

//       switch (event.type) {
//     case 'payment_intent.succeeded':
//       const session = event.data.object;
//       const lineItmes = await Stripe.checkout.sessions.listLineItems(session.id)


//       console.log(lineItmes)
//       break;
//   }
//    response.json({received: true});

//     } catch (error) {
        
//     }
// }