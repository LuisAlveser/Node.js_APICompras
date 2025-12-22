const { where } = require("sequelize");
const db = require("../models/index");
const { updateOrders } = require("./orderController");
const order_itensModel = db.orders_itens;
const orderModel = db.order;
const productModel = db.products;
async function addOrder_itens(req,res){
   
    try{
     
    const order_item={
       product_id:req.body.product_id,
       order_id :req.body.order_id,
       quantity:req.body.quantity, 
       unit_price:req.body.unit_price
    }
  const result =await order_itensModel.create(order_item);
  if(result){
      res.status(200).json({
        message:"Pedidos Itens criado com sucesso!",
        post:order_item
    });
  }

}catch(error){
  return res.status(500).json({ error: error});   
}
}

async function findAllOrder_items(req,res){
       try{
      const result= await order_itensModel.findAll({
            include: [{ model:productModel},{model:orderModel}] 
        });
       if(result){
       res.status(201).json(result);
       }
    }catch(error){
       return res.status(500).json({ error: error});
  
    }
}
async function findIdOrder_items(req,res){
    const id =req.params.id;
       try{
      const result= await order_itensModel.findByPk(id,{
            include: [{ model:productModel},{model:orderModel}] 
        });
       if(result){
       res.status(201).json(result);
       }
    }catch(error){
       return res.status(500).json({ error: error});
  
    }
}
async function deleteOrderItem(req,res){
    const id= req.params.id;
    try{
    const result  = await order_itensModel.destroy({where:{id:id}});
         res.status(201).json({message:"Order Item deletado com sucesso!!"});
    if(result){
      
    }
    }catch(error){
       return res.status(500).json({ error: error});  
    }
}
async function uptadeOrder_Item(req,res){
     const id= req.params.id;
     try{
     const updateOrderItem={
        product_id:req.body.product_id,
       order_id :req.body.order_id,
       quantity:req.body.quantity, 
       unit_price:req.body.unit_price
     }
      const result= await order_itensModel.update(updateOrderItem,{where:{id:id}});

      if(result){
         res.status(201).json({message:"Order item  atualizado com sucesso!!",post :updateOrderItem});
      }

     }catch(error){
           return res.status(500).json({ error: error}); 
     }
}
module.exports={
    addOrder_itens:addOrder_itens,
   findAllOrder_items:findAllOrder_items,
   findIdOrder_items:findAllOrder_items,
   deleteOrderItem:deleteOrderItem,
   uptadeOrder_Item:uptadeOrder_Item
}