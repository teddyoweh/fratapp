const jwt = require('jsonwebtoken');
const User = require('../models/User')
function mecontroller(req,res){
    const {token} =req.body
 console.log(req.body)
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload.user)
        User.findById(payload.user.id).then(user=>{
         
            if(user){
                 
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