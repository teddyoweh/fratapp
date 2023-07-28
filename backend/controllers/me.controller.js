const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Link = require('../models/Links')
function mecontroller(req,res){
    const {token} =req.body
 
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
      
        User.findById(payload.user.id).then(user=>{
         
            if(user){
                 payload['user']={firstname:user.firstname,lastname:user.lastname,username:user.username,uimg:user.uimg,userid:user.id,bio:user.bio,pinnedorgs:user.pinnedorgs,isofficial:user.isofficial,email:user.email}
 
                res.status(200).json({payload:payload,status:true});
            }else{
      
                res.status(401).json({message:'LOL'})
            }
        })

    }
    catch(err){
        res.status(401).json({message:err.message})
    }


}
 

module.exports = mecontroller;