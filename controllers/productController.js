const { where } = require("sequelize");
const db = require("../models/index");
const { updateOrders } = require("./orderController");
const productsModel = db.products;

async function addProduct(req,res){
    try{
    
    const product={
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        is_active:req.body.is_active
    }
    const result =await productsModel.create(product);
     if(result){
    res.status(201).json({
        message:"Produto criado com sucesso!",
        post:product
    });
  }
}
catch(error){
 return res.status(500).json({ error: error});
}
}

async function updateProduct(req,res){
    const id =req.params.id;
     try{
     const productUpdate={
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        is_active:req.body.is_active
    }

   
        const result= await productsModel.update(productUpdate,{where:{id:id}});
        if(result){
            res.status(201).json({message:"Produto  atualizado com sucesso!!",post :productUpdate});
         } 
    }catch(error){
        return res.status(500).json({ error: error});
    }
}  
async function findAllProducts(req,res){
    try{
        const result = await productsModel.findAll();

        if(result){
             res.status(201).json(result);
        }
    }catch(error){
        return res.status(500).json({ error: error}); 
    }
}
async function findIdProducts(req,res){
    const id= req.params.id;
    try{
        const result = await productsModel.findByPk(id);

        if(result){
             res.status(201).json(result);
        }
    }catch(error){
        return res.status(500).json({ error: error}); 
    }
}
async function deleteProduct(req,res){
         const id = req.params.id;
         try{
          const result= await productsModel.destroy({where:{id:id}});

          if(result){
            res.status(204).json({message:"Produto deletado  com sucesso!!"});
          }
         }catch(error){
           return res.status(500).json({ error: error});
         }

    }
    async function addstockProduct(req,res){
      const transaction = await db.sequelize.transaction();
    const id =req.params.id;
     try{
     const result = await productsModel.findByPk(id);
   
        
        if(result){
           const e= await result.increment('quantity', { by: req.body.quantity, transaction });
           await transaction.commit();
            res.status(201).json({message:"Estoque  atualizado com sucesso!!"});
         } 
    }catch(error){
        return res.status(500).json({ error: error});
    }
      }
    



module.exports={
    addProduct:addProduct,
    updateProduct:updateProduct,
    findAllProducts:findAllProducts,
    findIdProducts:findIdProducts,
    deleteProduct:deleteProduct,
    addstockProduct:addstockProduct,
    
}