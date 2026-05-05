import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  orderId: {
    type: String,
    required: [true, "Provide orderId"],
    unique: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  product_details: {
    name: String,
    image: Array
  },

  paymentId: {
    type: String,
    default: ""
  },

  payment_status: {
    type: String,
    default: ""
  },

  delivery_address: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },

  sub_totalAmt: {
    type: Number,
    default: 0
  },

  totalAmt: {
    type: Number,
    default: 0
  },

  invoice_receipt: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;