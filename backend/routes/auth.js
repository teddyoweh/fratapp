const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { logincontroller, registercontroller,checkUsername,findUser } = require('../controllers/auth.controller')
const mecontroller =require('../controllers/me.controller');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, hashfilename(file.originalname,req.body.email, req.body.randomNumberString1));
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
router.post('/checkusername', checkUsername);
router.post('/finduser',findUser)
router.post('/me', mecontroller);

module.exports = router