import UploadImageCloudinary from "../utils/uplordimagecloudinery.js"

const uplordimageController = async(req, res) => {
  try {
    const file = req.file


const uploadImage = await UploadImageCloudinary (file)
    // if (!file) {
    //   return res.status(400).json({
    //     message: "No file uploaded",
    //     error: true,
    //     success: false
    //   })
    // }
    return res.json({
      message: "Image uploaded",
      data:uploadImage,
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

export default uplordimageController