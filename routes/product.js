const express =require("express");
const productController= require("../controllers/productController");
const router =express.Router();


router.post("/",productController.addProduct);
router.patch("/:id",productController.updateProduct);
router.get("/",productController.findAllProducts);
router.get("/:id",productController.findIdProducts);
router.delete("/:id",productController.deleteProduct);


module.exports=router;