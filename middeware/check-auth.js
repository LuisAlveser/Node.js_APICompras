const jwt = require("jsonwebtoken");

function check_auth(req,res,next){
    try{
        const token  = req.headers.authorization.split(" ")[1];
        const decodedToken =jwt.verify(token,"Olá");
       req.userData=decodedToken;
       next();
    }catch(error){
       return res.status(500).json({ error: error.message }); 
    }
}
module.exports={
  check_auth:check_auth,
}