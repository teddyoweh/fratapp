const Posts = require('../models/Posts');
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
function postscontroller(req, res) {
 
       console.log(req.body)
       
     
    const newPost = new Posts({
 
  

      
  
        content: req.body.content,
        // imgurls: req.body.imgurls,
 
        likesno: 0,
        commentsno: 0,
        clicksno: 0,
   
        likesuserlist: [],
        commentuserlist: [],
        isanouncement:req.body.isanouncement,
        isevent:req.body.isevent,
        isjob:req.body.isjob,
        eventgoinglist:[],
        links:req.body.links,
        userid: req.body.userid,
        isrepost: req.body.isrepost,
        repostid: req.body.repostid,
        repostlist: [],
        repostno:0,
        // imgurls:imagedata




    });
   
    newPost.save()
        .then(post => {
            if(req.body.isrepost){
                // Posts.findById(req.body.isrepostid)
                Posts.findByIdAndUpdate(req.body.repostid, { $inc: { repostno: 1 }, $push: { repostlist: [req.body.userid, post._id] } }, { new: true }).then(post1 => {

                    
                })
            }
            console.log(post)
    res.json(post)
            

  
 }
             )
        .catch(err => { res.json({ status: false, data: err }) });

}

module.exports = postscontroller