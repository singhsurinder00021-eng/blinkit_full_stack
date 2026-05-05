import CartProduct from "../models/cartProduct.model.js";
import userModel from "../models/user.model.js";


export const addTOCartItemsController = async (req, res) => {
    try {
        const userId = req.userId

        const { productId } = req.body

        if (!productId) {
            return res.status(402).json({
                message: "provide productId",
                error: true,
                success: false
            })
        }

        const checkItemCart = await CartProduct.findOne({
            userId: userId,
            productId: productId
        })

        if (checkItemCart) {
            return res.status(400).json({
                message: "item Already in Cart"
            })
        }

        const cartItem = new CartProduct({
           
            quantity: 1,
            userId: userId,
             productId: productId,
        })

        const save = await cartItem.save()
        const updateCartUser = await userModel.updateOne({ _id: userId }, {
            $push: {
                Shopping_cart: productId
            }
        })

        return res.json({
            data: save,
            message: "items add successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export const getCartItemsController = async (req, res) => {
    try {
        const userId = req.userId

        const cartItem = await CartProduct.find({
            userId: userId
        }).populate("productId")
        return res.json({
            data: cartItem,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
export const updateCartItemQtyController = async (req,res)=>{
    try {
        const userId = req.userId
        const { _id , qty } = req.body
        if (!_id || !qty) {
            return res.status(400).json({
            message:"provide _id, Qty"
            })
        }


        const updateCartitem = await CartProduct.updateOne({
            _id : _id,
            userId:userId

        },{
            quantity:qty
        })

        return res.json({
            message:"updated cart",
            success : true,
            error:false,
            data: updateCartitem
        })

    } catch (error) {
       return res.status(500).json({
        message:error.message || error,
        error:true,
        success:false
       }) 
    }
}



export const deleteCartItemQtyController = async (req,res)=>{
    try {
     const userId = req.userId
     const {_id } = req.body

     if (!_id) {
        return res.status(400).json({
            message:"provide _id",
            error:true,
            success:false
        })
     }

     const deleteCartItem = await CartProduct.deleteOne({_id : _id, userId : userId})

     return res.json({
        message:"Item Removed",
        error:false,
        success:true,
        data:deleteCartItem
     })
    } catch (error) {
       return res.status(500).json({
        message:error.message || error,
        error:true,
        success:false
       }) 
    }
}