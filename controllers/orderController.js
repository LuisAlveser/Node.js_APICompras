const { where } = require("sequelize");
const db = require("../models/index");
const { updatedUser } = require("./userController");
const orderModel = db.order;
const userModel = db.user;

async function createOrder(req,res){
   try{
    const orderCreate={
      order_status:req.body.order_status.toUpperCase(),
      user_id:req.body.user_id,
      total: req.body.total, 
    }
  const result= await orderModel.create(orderCreate);
  if(result){
    res.status(200).json({
        message:"Pedido criado com sucesso!",
        post:orderCreate
    });
  }

}catch(error){
  return res.status(500).json({ error: error});
}
}

async function listOrders(req,res){
    try{
      const result= await orderModel.findAll({
            include: [{ model: userModel }] 
        });
       if(result){
       res.status(201).json(result);
       }
    }catch(error){
       return res.status(500).json({ error: error});
  
    }
}
 async function updateOrders(req,res){
        const id = req.params.id;
         try{
      const orderUpdate={
      order_status:req.body.order_status.toUpperCase(),
      total: req.body.total, 
    }
   
    if(req.body.user_id){
        orderUpdate.user_id=req.body.user_id;
    }
       const result= await orderModel.update(orderUpdate,{where:{id:id}});
       if(result){
           res.status(201).json({message:"Pedido atualizado com sucesso!!",post :orderUpdate});
       }
        
        
        }catch(error){
          return res.status(500).json({ error: error});
        }
    }
    async function deleteOrder(req,res){
         const id = req.params.id;
         try{
          const result= await orderModel.destroy({where:{id:id}});

          if(result){
            res.status(204).json({message:"Pedido deletado  com sucesso!!"});
          }
         }catch(error){
           return res.status(500).json({ error: error});
         }

    }

module.exports={
    createOrder:createOrder,
    listOrders:listOrders,
   updateOrders:updateOrders,
   deleteOrder:deleteOrder
}