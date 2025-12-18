const express =require("express");
const app= express();
app.use(express.json());
const userRouter = require("./routes/user");

app.use("/users",userRouter);

module.exports=app