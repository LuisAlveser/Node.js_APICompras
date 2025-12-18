const db = require("../models/index");
const userModel = db.user;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  singUp: singUp,
  login:login,
};