const express = require('express');
const router = express.Router();

 
const {uploadcontroller, uploadPostImg} = require('../controllers/upload.controller')

var multer  = require('multer');
const crypto = require('crypto');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/posts');
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
 
 router.post('/uploadpost',upload.single('fileData'),uploadPostImg)



module.exports = router