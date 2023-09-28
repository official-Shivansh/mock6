const jwt = require("jsonwebtoken");
const blacklist  = require("../blacklist")
require("dotenv").config();


const auth = (req,res,next)=>{
const token = req.headers.authorization?.split(" ")[1];
if(token){
    if(blacklist.includes(token)){
        res.json({msg:"Login again"})
    }
    try{
        jwt.verify(token,process.env.secretCode,(err,decoded)=>{
            if(decoded){
                req.userId = decoded.userID;
                req.username = decoded.username;
                next();
            }
            else{
                res.status({msg:"Token is not valid"})
            }
        })
    }
    catch(err){
        res.status(200).json({error:err.message})
    }
}
else{
    res.json({msg:'Token require for login'})
}
}
module.exports= auth