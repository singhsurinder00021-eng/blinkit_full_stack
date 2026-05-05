import { response } from "express";
import sendEmail from "../config/SendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generatedAccessToken from "../utils/GernateAccessToken.js"
import generatedRefreshToken from "../utils/generatedRefreshToken.js"
import UploadImageCloudinary from "../utils/uplordimagecloudinery.js";
import generatedOtp from "../utils/genratedOtp.js";
import forgotPasswordTemplate from "../utils/forgetpasswordtemplete.js";
import jwt from "jsonwebtoken";



// REGISTER
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, password",
        error: true,
        success: false
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already registered",
        error: true,
        success: false
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword
    });

    const saveUser = await newUser.save();

    return res.json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: saveUser
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
// verifyEmailController
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body

    const user = await userModel.findOne({ _id: code })


    if (!user) {
      return response.status(400).json({
        message: "Invailed code",
        erorr: true,
        success: false

      })
    }

    const updateUser = await userModel.updateOne({ _id: code }, {
      verify_email: true
    })

    return res.json({
      message: "verify email",
      error: false,
      success: true,
    })

  }catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}

// login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid input",
        error: true,
        success: false
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Provide valid email & password",
        error: true,
        success: false
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact Admin",
        error: true,
        success: false
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password",
        error: true,
        success: false
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date()
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// logout controller
export async function logoutController(req, res) {
  try {

    const userid =req.userId // middleware



    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    // const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
    //   refreshToken
    // })
    await userModel.findByIdAndUpdate(userid,{
  refresh_token: ""
})

    return res.json({
      message: "logout successfully",
      erorr: false,
      success: true
    })
  } catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}

// uplord user Avatar
// export async function uploadAvatar(req, res) {
//   try {
//     const userId = req.userId;
//     const image = req.file;
//     const uploaded = await UploadImageCloudinary(image);

//     const UpdateUser = await userModel.updateOne(userId,{
//         avatar: uploaded.url,
//       },
//       { new: true }
//     );

//   return res.json({
//             message: "upload profile",
//             data: uploaded,
//             data:{
//               _id: userId,
//               avatar:  uploaded.url
//             }
            
//         });


//   } catch (error) {
//   return res.status(500).json({
//     message: error.message || error,
//     error: true,
//     success: false
//   })
// }
// }



export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "No file uploaded",
        error: true,
        success: false
      });
    }

    const uploaded = await UploadImageCloudinary(image);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { avatar: uploaded.secure_url },
      { new: true }
    );

     return res.json({
            message: "upload profile",
            data:{
              _id: userId,
              avatar:  uploaded.url
            }
            
        });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
}






// update user ditails
export async function updateUserDitails(req, res) {
   try {
    const userId =req.userId //auth middleware
  const {name , email ,mobile, password}=req.body

  // let hashPassword=""

  // if (password) {
  //       const salt = await bcryptjs.genSalt()
  //   const hashPassword = await bcryptjs.hash(password, salt)
  // }
  let hashPassword;

if (password) {
  const salt = await bcryptjs.genSalt(10);
  hashPassword = await bcryptjs.hash(password, salt);
}

  const updateUser = await userModel.findByIdAndUpdate({_id:userId},{
    ...(name && {name:name}),
    ...(email && {email:email}),
    ...(mobile && {mobile:mobile}),
    ...(password && {password:hashPassword}),
  })

  return res.json({
    message:"update user successfully",
    erorr:false,
    success:true,
    data:updateUser
  })

   } catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}


// forget password not login 
export async function forgetPasswordController(req, res) {
  try {
      const {email} =req.body

      const user = await userModel.findOne({email})

      if (!user) {
        return res.status(400).json({
          message:"email not available",
          error:true,
          success:false
        })
      }

      const otp = generatedOtp()
      const expireTime = new Date(Date.now() + 60 * 60 * 1000);  

      const update = await userModel.findByIdAndUpdate(user._id,{
         Forget_password_otp : otp,
         Forget_password_expiry : new Date(expireTime).toISOString()
      })

      await sendEmail({
        sendTo:email,
        subject:"forget password from blinkit",
        html:forgotPasswordTemplate({
          name:user.name,
          otp:otp
        })
      })

       return res.json({
          message:"chek you email",
          erorr:false,
          success:true
        })
  }catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}

// verify forget password otp
export async function verifyForgetPasswordOtp(req, res){
try {
   const {email,otp} =req.body

   if (!email || !otp) {
    return response.status(400).json({
          message:"provide required field email,otp.",
          erorr:true,
          success:false
        })
   }

     const user = await userModel.findOne({email})

       if (!user) {
        return res.status(400).json({
          message:"email not available",
          erorr:true,
          success:false
        })
      }

      const currentTime=new Date()

      if (user.Forget_password_expiry <currentTime) {
          return res.status(400).json({
          message:"otp is expired",
          erorr:true,
          success:false
        })
      }

      if (otp !== user.Forget_password_otp) {
         return res.status(400).json({
          message:"invailid otp ",
          erorr:true,
          success:false
        }) 
      }

// if otp is not expired
// otp === user.forgot_password_otp
// const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
//     forgot_password_otp: "",
//     forgot_password_expiry: ""
// });
await userModel.findByIdAndUpdate(user._id, {
  Forget_password_otp: "",
  Forget_password_expiry: ""
});


return res.json({
    message: "Verify otp successfully",
              erorr:false,
          success:true
})


} catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
} 
}

// reset the password
export async function resetPassword(req, res){
try {
   
  const {email,newPassword,confirmPassword}=req.body

  if (!email || !newPassword || !confirmPassword) {
    message:"provide required  fields email,newPassword,confirmPassword "
  }

  const user = await userModel.findOne({email})


  if (!user) {
    return res.status(400).json({
      message:"email is not available",
      error: true,
      success: false,
    })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
        message: "newPassword and confirmPassword must be same.",
        error: true,
        success: false,
    });
}

const salt = await bcryptjs.genSalt(10)
const hashPassword = await bcryptjs.hash(newPassword,salt)


// const update = await userModel.findOneAndUpdate(user._id,{
//   password:hashPassword
// })
await userModel.findByIdAndUpdate(user._id,{
  password: hashPassword
})

 return res.json({
        message: "password update successfully",
        error:false ,
        success:true,
    });


}  catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}

// refresh token controller
export async function refreshToken(req, res){
   try {
      const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]
  
      if (!refreshToken) {
        return res.status(401).json({
          message:"invailed token ",
          erorr:true,
          success:false
        })
      }

    const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
    if (!verifyToken) {
        return res.status(401).json({
          message:"token  is expired",
          erorr:true,
          success:false
        })
      }

      console.log("verifyToken",verifyToken)
      const userId = verifyToken?.Id

      const newAccessToken = await generatedAccessToken(userId);


       const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }

      res.cookie('accessToken',newAccessToken,cookiesOption)
  

      return res.json({
    message: "New Access token generated",
    error: false,
    success: true,
    data: {
        accessToken: newAccessToken
    }
});

  
  }catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  })
}
}

// get login user details
export async function userDetails(req, res) {
  try {
    const userId = req.userId

    console.log("UserId 👉", userId)

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false
      })
    }

    const user = await userModel
      .findById(userId)
      .select('-password -refrech_token')

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      })
    }

    return res.json({
      message: "user details",
      data: user,
      error: false,  
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
