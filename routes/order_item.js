const express =require("express");
const order_itemController= require("../controllers/order_itensController");
const router =express.Router();

router.post("/",order_itemController.addOrder_itens);
router.get("/list",order_itemController.findAllOrder_items);
router.get("/:id",order_itemController.findIdOrder_items);
router.delete("/:id",order_itemController.deleteOrderItem);
router.patch("/:id",order_itemController.uptadeOrder_Item);
module.exports=router;