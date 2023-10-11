const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { logincontroller, registercontroller,checkUsername,findUser ,verifyEmailController, deleteAccount} = require('../controllers/auth.controller')
const mecontroller =require('../controllers/me.controller');
const {searchUser} = require('../controllers/user.controller')
const {editprofilecontroller} = require('../controllers/profile.controller')
var multer  = require('multer');
const { uploadPostImg } = require('../controllers/upload.controller');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body )
    cb(null, 'assets/profiles');
  },
  filename: function (req, file, cb) {
      console.log(file)
      console.log(req.body)
    cb(null, hashfilename(req.body.uri,req.body.email,req.body.random));
    // hashfilename(file.originalname,req.body.email)
  }
});

 function hashcode(data){
    
const hash = crypto.createHash('sha256');

hash.update(data);
const hashedData = hash.digest('hex');

return hashedData
 } 

 
 function hashfilename(filename,email,randomNumberString1){
 
    return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)))+'.jpeg';

 }
var upload = multer({ storage: storage });
router.post('/login', logincontroller);
router.post('/register', registercontroller);
router.post('/verify',verifyEmailController)
router.post('/editprofile',editprofilecontroller)
router.post('/checkusername', checkUsername);
router.post('/finduser',findUser)
router.post('/searchuser',searchUser)
router.post('/me', mecontroller);
router.post('/delete_account',deleteAccount);

router.post('/uploadprofile',upload.single('file'),uploadPostImg)

module.exports = router