const User = require('../models/User');
  
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const bodyParser = require('body-parser');
const generateCode = require('../utils/code');
const {sendEmail,emailHtml} = require('../utils/mailer');
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
  
 
async function logincontroller(req, res) {
    const { email, password } = req.body;
    const errors = [];
  
    const user = await User.findOne({ email: email });
    if (!user) {
      errors.push({ type: "email", message: "Email not found" });
    } else if (hashcode(password) !== user.password) {
      errors.push({ type: "password", message: "Incorrect password" });
    }
  
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        joinedAt: user.joinedAt,
        isfirsttime: user.isfirsttime,
        isverified: user.isverified,
        uimg:user.uimg
      };
      const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);
  
      res.status(200).json({ token: token, payload: payload, status: true });
    }
  }
  

async function registercontroller(req, res) {
    const { email, firstname, lastname, username, password } = req.body;
    const errors = [];
  
    const userWithUsername = await User.findOne({ username: username });
    if (userWithUsername) {
      errors.push({ type: "username", message: "Username already exists" });
    }
  
    const userWithEmail = await User.findOne({ email: email });
    if (userWithEmail) {
      errors.push({ type: "email", message: "Email already exists" });
    }
  
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const dateJoined = new Date();
      console.log(password)
      console.log(hashcode(password))
      const newUser = new User({
        email: email,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashcode(password),
        isfirsttime:true,
        isverified:false
      });
  
      const savedUser = await newUser.save();
      const payload = {
        id:savedUser.id,
        email: savedUser.email,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        username: savedUser.username,
        joinedAt: dateJoined,
        isfirstime:savedUser.isfirsttime,
        isverified:savedUser.isverified,
        uimg:savedUser.uimg
      };
      const code = generateCode();
      const newCode = new Codes({
        code:code,
        email:email
      })
      const savedCode = await newCode.save();
      const strcode = code.toLocaleString()
      sendEmail(email,emailHtml(firstname, strcode))
      console.log(`New User Saved [${dateJoined}]`);
      const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);

      res.status(200).json({ token:token,payload:payload, status: true });
    }
  }
  
function checkUsername(req, res) {

    const {username} = req.body;
    
 

}

function verifyEmailController(req, res) {
  const { code, email } = req.body;
  console.log(req.body)
  Codes.findOne({ code, email }).then(codeResult => {
    if (codeResult) {
      User.findOneAndUpdate(
        { email },
        { $set: { isVerified: true } },
        { new: true,}
      ).then(updatedUser => {
        const payload = {
          id: updatedUser.id,
          email: updatedUser.email,
          firstname: updatedUser.firstname,
          lastname: updatedUser.lastname,
          username: updatedUser.username,
          joinedAt: updatedUser.joinedAt,
          isFirstTime: updatedUser.isfirstTime,
          isVerified: updatedUser.isverified,
          uimg:updatedUser.uimg,
        };
        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);

        res.status(200).json({ token:token, payload:payload, status: true });
      });
    } else {
      console.log('eeef')
      res.status(400).json({ status: false, message: 'Invalid Code' });
    }
  });
}

function findUser(req, res) {
    console.log(req.body)
    User.findById(req.body.id).then(user=>{
      if(user){

    
        res.json({firstname:user.firstname,lastname:user.lastname,username:user.username,uimg:user.uimg,userid:user.id,bio:user.bio,pinnedorgs:user.pinnedorgs})

      }else{
        res.json(null)
      }
    })
}
module.exports = { logincontroller, registercontroller,checkUsername,findUser, verifyEmailController}