import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config()


if(!process.env.MONGODB_URL){
    throw new Error("please provide MONGODB_URL in the .env file")
}
 
async function connectdb() {
  try {
     await mongoose.connect(process.env.MONGODB_URL)
     console.log("MONGODB_URL connected")
  } catch (error) {
     console.log("MONGODB_URL not connected",error)
     process.exit(1)
  }    
}

export default connectdb