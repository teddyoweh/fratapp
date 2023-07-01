var multer  = require('multer');
const crypto = require('crypto');

var fs = require('fs');
function hashcode(data){
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    const hashedData = hash.digest('hex');
    
    return hashedData
     } 
     function hashfilename(filename,email,randomNumberString1){
       
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)));
    
     }

function uploadPostImg(req,res){
   

       
         
        fs.readFile(req.file.path,(err, contents)=> {
         
         if (err) {
         console.log('Error: ', err);
        }else{
         console.log('File contents ',contents);
         res.json({stat:'done'})
        }
       });
      
}


module.exports = {uploadPostImg}