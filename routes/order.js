const express =require("express");
const orderController= require("../controllers/orderController");
const router =express.Router();

router.post("/",orderController.createOrder);
router.get("/list",orderController.listOrders);
router.patch("/:id",orderController.updateOrders);
router.delete("/:id",orderController.deleteOrder);
module.exports=router;