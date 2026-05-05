import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/SubCategory.Controller.js'

const SubCategoryRouter = Router()
SubCategoryRouter.post('/create', auth, AddSubCategoryController)
SubCategoryRouter.post('/get', getSubCategoryController)
SubCategoryRouter.put('/update', auth, updateSubCategoryController)
SubCategoryRouter.delete('/delete', auth,deleteSubCategoryController)

export default SubCategoryRouter