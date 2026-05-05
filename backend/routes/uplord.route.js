import { Router } from 'express'
import auth from '../middleware/auth.js'
import uplordimageController from '../controllers/uplordimage.controller.js'
import upload from "../middleware/multer.js"

const uplordRouter = Router()
uplordRouter.post('/uplord',auth,upload.single("image"), uplordimageController)

export default uplordRouter