import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true
    },
    image: {
      type: String,
      required: true 
    },
    category: [  
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategoryModel;