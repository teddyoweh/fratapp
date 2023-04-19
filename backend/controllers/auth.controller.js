const User = require('../models/User');
  
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const bodyParser = require('body-parser');
const generateCode = require('../utils/code');
const {sendEmail} = require('../utils/mailer');
const jwt = require('jsonwebtoken');
const {validateEmail, isEmpty } = require('../utils/validate');
const Codes = require('../models/Code');
var multer  = require('multer');
const crypto = require('crypto');

var fs = require('fs');
const { response } = require('express');
function hashcode(data){
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    const hashedData = hash.digest('hex');
    
    return hashedData
     } 
     function hashfilename(filename,email,randomNumberString1){
       
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)));
    
     }
var upload = multer({ dest: 'uploads/' });
 function logincontroller(req, res,) {
    const { email,code,step } = req.body;
    const code1 = generateCode();
    
    let errors = 0
    if(isEmpty(email)){
        res.status(404).json({message:'Email is required'});
        errors+=1
    }
    if(!validateEmail(email)){
        res.status(401).json({message:'Email is not valid'});
        errors+=1
    }
    if(errors==0){
        if(step=='1'){

        sendEmail(email,code1)
        const NewCode = new Codes({
            email: email,
            code:code1
        })
        NewCode.save()
        .then(
            res.status(200).json({ state: true, message: "Message sent successfully" })
        )
    }


    if(step=='2'){
        Codes.findOne({ email: email, code:code}).then(usercode=>{
            if(usercode){
              
                    User.findOne({ email:email}).then(userm=>{
                    if(userm){
                        const data =   {
                            email:userm.email,
                            firstname:userm.firstname,
                            lastname:userm.lastname,
                            username:userm.username,
                            isverified:userm.isverified,
                            major:userm.major,
                            id:userm.id,
                            uimg:userm.uimg
                        }
                        const token = jwt.sign({
                             data
                          }, 'secret');
                          Codes.deleteOne({email:email,code:code}).then(()=>{
                            res.status(200).json({token:token, isreg:true, message: "Verified successfully",user:data })

                          })
                   
                    }
                    else{
                     
                        res.status(200).json({ isreg:false, message: "Verified successfully" })
          
                }
            })
   
           
                
            }
            else{
                res.status(400).json({message:'Invalid Code, Try Again'})
            }
        })

    }

   

 
}
 
 

}

function registercontroller(req,res){
    const {email,firstname,lastname,username,password}= req.body;
    console.log(req.body)
    User.findOne({username: username}).then(user => {
        if(user){
            res.status(400).json({'message':'Username already Exists','type':'username'})
        } 

    })
    User.findOne({email: email}).then(user => {
        if(user){
            res.status(400).json({'message':'Email already Exists','type':'email'})
            } 

    })

    const dateJoined = new Date()
    newUser = new User({
        email: email,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password:password
   
    
    })
    
   
   
    newUser.save().then(user=>{
        const payload = {
            email:user.email,
            firstname:user.firstname,
            lastname:user.lastname,
            username:user.username,
         
        }
        const payload1=payload
        payload1['joinedat']= dateJoined
        res.status(200).json({payload:payload,status:true})
         

        
    })
}
function checkUsername(req, res) {

    const {username} = req.body;
    
 

}


function findUser(req, res) {

    User.findById(req.body.id).then(user=>{
        res.json({firstname:user.firstname,lastname:user.lastname,uimg:user.uimg,username:user.username})
    })
}
module.exports = { logincontroller, registercontroller,checkUsername,findUser }