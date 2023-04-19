const jwt = require('jsonwebtoken');
const User = require('../models/User')
function mecontroller(req,res){
    const {token} =req.headers
 
    try{
        const payload = jwt.verify(token,'secret');
        
        User.findById(payload.data.id).then(user=>{
         
            if(user){
                 
                res.status(200).json(payload);
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