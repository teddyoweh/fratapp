const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Link = require('../models/Links');
const Organization = require('../models/Organizations');
function mecontroller(req,res){
    const {token} =req.body
 
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
      
        User.findById(payload.user.id).then(user=>{
         
            if(user){
                Organization.findById(user.pinnedorg).then(rex =>{
                    payload['user']={firstname:user.firstname,lastname:user.lastname,username:user.username,uimg:user.uimg,userid:user.id,bio:user.bio,pinnedorg:user.pinnedorg,pinnedorgdetail:rex, isofficial:user.isofficial,email:user.email}
 
                    res.status(200).json({payload:payload,status:true});
                })
                 
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