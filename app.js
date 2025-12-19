const express =require("express");
const app= express();
app.use(express.json());
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
app.use("/users",userRouter);
app.use("/order",orderRouter);
module.exports=app