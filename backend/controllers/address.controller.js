import Address from "../models/address.model.js";
import userModel from "../models/user.model.js";


export const addAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const { address_line, city, state, pincode, country, mobile } = req.body

        const createAddress = new Address({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId:userId
        })

        const saveAddress = await createAddress.save()

        const addUserAddressId = await userModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }

        })

        return res.json({
            message: "Address Created successFully",
            error: false,
            success: true,
            data: saveAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId
       const data = await Address.find({userId: userId}).sort({createdAt: -1})


           return res.json({
            message: "list of Address ",
            error: false,
            success: true,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId
     const {_id,address_line,city,state,county,pincode,mobile} = req.body

     const updateAdress = await Address.updateOne({ _id : _id,userId:userId},{
        address_line,
        city,
        state,
        county,
        mobile,
        pincode
     })
       return res.json({
            message: "list of Address ",
            error: false,
            success: true,
            data: updateAdress
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;

    const disableAddress = await Address.updateOne(
      { _id: _id, userId: userId },
      {
        status: false 
      }
    );

    return res.json({
      message: "Address deleted successfully",
      error: false,
      success: true,
      data: disableAddress
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};