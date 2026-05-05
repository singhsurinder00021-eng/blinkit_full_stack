import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, DeleteProductDetails, getProductByCategoryAndSubCategory, getProductByController, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/Product.controller.js'
import { admin } from '../middleware/Admin.js'


const productRouter = Router()

productRouter.post('/create',auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByController)
productRouter.post("/get-product-by-category-subCategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-detials",getProductDetails)

// update
productRouter.put('/update-product-details',auth,admin,updateProductDetails)
productRouter.delete('/delete-product',auth,admin,DeleteProductDetails)
productRouter.post("/search-product",searchProduct)

export default productRouter