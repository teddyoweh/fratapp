const User = require('../models/User')

const crypto = require('crypto');

var fs = require('fs');
function hashcode(data){
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    const hashedData = hash.digest('hex');
    
    return hashedData
     }
     function hashfilename(filename,email,randomNumberString1){
     
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)))+'.jpeg';
    
     }
function editprofilecontroller(req,res){
    const {firstname,lastname,username,dob,pinnedorgs,bio,uid,primg,uimg1} = req.body
  
    var uimg =uimg1
    if(primg){
         uimg = '/profileimg/'+ hashfilename(primg.uri,primg.email,primg.random)
    }
 
    User.findByIdAndUpdate(
        uid,
        {
            firstname:firstname,
            lastname:lastname,
            username:username,
            dob:dob,
            uimg:uimg,
            bio:bio
        },
        {new: true, useFindAndModify: false},
        (err, updatedUser) => {
            if(err){
                console.log('e no work')
                res.status(500).send({message: 'Error updating user profile.'});
            } else {
                res.status(200).json(updatedUser);
            }
        }
    );
}


module.exports = {
    editprofilecontroller}