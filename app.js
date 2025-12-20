const express =require("express");
const app= express();
app.use(express.json());
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");

app.use("/users",userRouter);
app.use("/order",orderRouter);
app.use("/product",productRouter);
module.exports=app