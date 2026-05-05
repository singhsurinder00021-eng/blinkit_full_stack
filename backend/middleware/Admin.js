import userModel from "../models/user.model.js"

export const admin = async (req, res, next) => { 
    try {
        const userId = req.userId  

        const user = await userModel.findById(userId)

        if (!user || user.role !== 'ADMIN') {  
            return res.status(403).json({      
                message: "permission denial",
                error: true,
                success: false
            })
        }

        next()
    } catch (error) {
        console.error("Admin middleware error:", error); 
        return res.status(500).json({
            message: "Server error",
            error: true,
            success: false
        })
    }
}