import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from '../models/product.model.js'
// AddCategoryController
export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;


    if (!name || !image) {
      return res.status(400).json({
        message: "Name and Image are required",
        error: true,
        success: false,
      });
    }

    const addcategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addcategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Category not created",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Category added successfully",
      data: saveCategory,
      error: false,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
// getCategoryController
export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({createdAt : -1})

    return res.json({
      data: data,
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

// update cantroller
export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body

    const update = await CategoryModel.updateOne({
      _id: _id
    }, {
      name,
      image
    })
    return res.json({
      message: "update category",
      error: false,
      success: true,
      data: update
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete controller 
export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body

   const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id ]
      }
    }).countDocuments()

    const checkProduct = await ProductModel.find({
      category: {
        "$in": [_id ]

      }
    }).countDocuments()


    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Category is Already   use can`t delete",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await  CategoryModel.deleteOne({ _id : _id})

    return res.json({
      message:"delete category successfully",
      data: deleteCategory,
      error:false,
      success:true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}