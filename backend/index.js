import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet"
import connectdb from "./config/connectdb.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.Routes.js";
import uplordRouter from "./routes/uplord.route.js"
import SubCategoryRouter from "./routes/subCategory.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/Cart.Routes.js";
import addressRouter from "./routes/address.route.js";
import OrderRouter from "./routes/order.Route.js";
 
const app = express()
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginEmbedderPolicy:false
}))

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running ");
}); 

app.use('/api/user',userRouter)
app.use("/api/category", categoryRouter)
app.use('/api/file',uplordRouter)
app.use('/api/subCategory',SubCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',OrderRouter)

connectdb().then(()=>{
  app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
})

