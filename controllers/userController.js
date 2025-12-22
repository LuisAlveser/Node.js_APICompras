const db = require("../models/index");
const userModel = db.user;
const orderModel=db.order;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

async function singUp(req, res) {

  try {
  
    if (!req.body || !req.body.password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);

    const userToCreate = { 
      name: req.body.name,
      email: req.body.email,
      password: hash
    };

    const userCreated = await userModel.create(userToCreate);

    if (userCreated) {
   
      const token = jwt.sign(
        { id: userCreated.id, email: userCreated.email }, 
        "Olá",                       
      );

      return res.status(201).json({
        user: userCreated,
        token: token
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function login(req,res){
  try{
     if (!req.body || !req.body.password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }
    
     const user = await userModel.findOne({where:{email:req.body.email}});

    if (user===null) {
      res.status(401).json({
        message:"Esse email não existe"
      });
    }
     else{

      const resut=bcryptjs.compare(req.body.password,user.password);
        if(resut){
          const token = jwt.sign(
        { id: user.id, email: user.email }, 
        "Olá",                       
      );

      return res.status(201).json({
        message:"Login realizado com sucesso",
        token: token
      });
        }
      
    }


  }catch(error){
  return res.status(500).json({ error: error.message });
  }
}
async function updatedUser(req,res){
    
    const id=req.params.id;
  try{
    const Updateduser = { 
      name: req.body.name,
      email: req.body.email,
    };
    if(req.body.password){
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);
    Updateduser.password = hash;
    }
    const rowsUpdated = await userModel.update(Updateduser,{where:{id:id}});
    if (rowsUpdated ===null) {
      return res.status(404).json({ message: "Usuário não encontrado ou nenhum dado alterado" });
    }
       res.status(200).json({
        message:"Usuário atualizado com sucesso ",
      
       });
    
       
      }catch(error){
       res.status(500).json({
        post:error
       }); 
      }

}
async function deleteuser(req,res){
  const id = req.params.id; 
   try{
     const result = await userModel.destroy({where:{id:id}});
     if(result){
      res.status(200).json({
        message:"Usuário deletado com sucesso ",
      
       });
    
     }
   }catch(error){
     res.status(500).json({
        post:error
       }); 
   }
  

}
 async function findByIdUser(req,res){
    const id =req.params.id;
    try{
      const result = await userModel.findByPk(id,{include: [{model:orderModel}]});
      if(result){
        res.status(200).json(result);
        
      }else{
        res.status(400).json({
        message:" Nenhum usuário encontrado!!!" ,
      
       });
      }
    }catch(error){
       res.status(500).json({
        post:error
       }); 
    }

   }


module.exports = {
  singUp: singUp,
  login:login,
  updatedUser:updatedUser,
  deleteuser:deleteuser,
  findByIdUser:findByIdUser,
};