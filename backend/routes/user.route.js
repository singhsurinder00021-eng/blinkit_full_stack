import {Router} from "express"
import {forgetPasswordController, loginController, logoutController, refreshToken, registerUserController,resetPassword,updateUserDitails,uploadAvatar,userDetails,verifyEmailController, verifyForgetPasswordOtp} from "../controllers/User.controller.js"
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js"; 

const userRouter =Router()

userRouter.post("/register", registerUserController)
userRouter.post("/verify-email", verifyEmailController)
userRouter.post("/login", loginController)
userRouter.get("/logout", auth, logoutController)
userRouter.put("/upload-avatar", auth, upload.single('avatar'), uploadAvatar)
userRouter.put("/update-user", auth, updateUserDitails)
userRouter.put("/forget-password", forgetPasswordController)
userRouter.put("/verifyForgetPasswordOtp", verifyForgetPasswordOtp)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/refresh-token", refreshToken)
userRouter.get("/userDetails", auth, userDetails)


export default userRouter