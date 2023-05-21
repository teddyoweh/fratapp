const express = require('express');
const router = express.Router();

const{ fetchannouncementposts,fetcheventposts,fetchpinnedposts,newsfeed} = require('../controllers/queryposts.controller')
const postscontoller = require('../controllers/posts.controller');
const findpostcontroller = require('../controllers/findpost.controller');
const  {fetchpostscontroller,getOnePost,fetchmypostscontroller} = require('../controllers/fetchposts.controller')
const fetchhotposts = require('../controllers/fetchhotposts.controller');
const searchpostscontroller = require('../controllers/searchposts.controller');
const likespostscontoller = require('../controllers/likesposts.controller')
const addcommentscontroller = require('../controllers/addcomment.controller')
const fetchcommentscontroller = require('../controllers/fetchcomments.controller')
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
// var upload = multer({ dest: 'uploads' , limits: { fieldSize: 2 * 1024 * 1024 }});
router.post('/add', (req, res) => { postscontoller(req, res) })
router.post('/like', (req, res) => { likespostscontoller(req, res) })
router.post('/find', (req, res) => { findpostcontroller(req, res) })
 
router.post('/getonepost', (req, res) => { getOnePost(req, res) })
router.post('/fetchmyposts', (req, res) => { fetchmypostscontroller(req, res) })
router.post('/fetch', (req, res) => { fetchpostscontroller(req, res) })
router.post('/fetchhot', (req, res) => { fetchhotposts(req,res) })
router.post('/fetchevents', (req, res) => { fetcheventposts(req, res) })
router.post('/fetchannouncements', (req, res) => { fetchannouncementposts(req, res) })
router.post('/newsfeed', (req, res) => { newsfeed(req, res) })
router.post('/fetchpinned', (req, res) => { fetchpinnedposts(req, res) })
router.post('/search', (req, res) => { searchpostscontroller(req,res)})
router.post('/addcomment', (req, res) => { addcommentscontroller(req, res) })
router.post('/fetchcomments', (req, res) => { fetchcommentscontroller(req, res) })
router.post('/uploadpost',upload.single('fileData'),uploadPostImg)


module.exports = router