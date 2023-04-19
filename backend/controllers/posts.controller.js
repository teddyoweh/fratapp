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
 
        // Views.findOne({ ip: req.body.userdata['ip'] }).then(user => {

    // })
    let imagedata = []
    console.log(req.body.image)
    if(req.body.image!=null){
        imagedata = [hashfilename(req.body.filename,req.body.userdata.email,req.body.randomNumberString1)]
        

    }
     
    const newPost = new Posts({
        ip: req.body.ip,
        networkinfo:req.body.networkinfo,

        userdata: req.body.userdata,
        isverified: req.body.isverified,
        content: req.body.content,
        // imgurls: req.body.imgurls,
        ispublic: req.body.ispublic,
        likesno: 0,
        commentsno: 0,
        clicksno: 0,
        isanony:req.body.isanony,
        likesuserlist: [],
        commentuserlist: [],
        isanouncement:req.body.isanouncement,
        isevent:req.body.isevent,
        ispinned:req.body.ispinned,
        sharesno: 0,
        userid: req.body.userid,
        isrepost: req.body.isrepost,
        repostid: req.body.repostid,
        repostlist: [],
        repostno:0,
        imgurls:imagedata




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