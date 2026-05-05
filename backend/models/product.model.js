import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ""
    },

    image: {
      type: [String],  
      default: []
    },

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category" 
      }
    ],

    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory" 
      }
    ],

    unit: {
      type: String,
      default: ""
    },

    stock: {
      type: Number,
      default: 0 
    },

    price: {
      type: Number,
      default: 0
    },

    discount: {
      type: Number,
      default: 0
    },

    description: {  
      type: String,
      default: ""
    },

    more_details: {
      type: Object,
      default: {}
    },

    publish: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


// create index text
productSchema.index({
  name:"text",
  description:"text"
},{
  name:10,
  description:5
})
// models/Product.model.js
// productSchema.index({
//     name: "text",
//     description: "text",
//     unit: "text"  // Optional
// }, {
//     weights: {      // ✅ Correct weights syntax
//         name: 10,
//         description: 5,
//         unit: 2
//     },
//     name: "product_text_index"
// });
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;