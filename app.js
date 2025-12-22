const express =require("express");
const app= express();
app.use(express.json());
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const order_itemRouter = require("./routes/order_item");

app.use("/users",userRouter);
app.use("/order",orderRouter);
app.use("/product",productRouter);
app.use("/order_item",order_itemRouter);
module.exports=app