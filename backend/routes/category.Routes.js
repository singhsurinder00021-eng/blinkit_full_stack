import { Router } from "express";
import auth  from "../middleware/auth.js";
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/Category.Controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", auth,AddCategoryController);
categoryRouter.post('/get',getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete('/delete',auth,deleteCategoryController)

export default categoryRouter;