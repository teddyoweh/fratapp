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
     
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)))+'.jpeg';
    
     }
function postscontroller(req, res) {
    const images = []
    const {userid} = req.body
    console.log(req.body.images)
    req.body.images.map((image,index)=>{
        images.push({uri:hashfilename(image.uri,req.body.email,req.body.random),width:image.width,height:image.height})

    })
     
    const pollvotes = {}
    req.body.pollsoptions.map((option,index)=>{
        pollvotes[option]=[]
    })
    const newPost = new Posts({
 
  

      
  
        content: req.body.content,
        // imgurls: req.body.imgurls,
 
        likesno: 0,
        commentsno: 0,
        clicksno: 0,
        account_type: req.body.account_type,
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
        imgurls:images,
        posttype:req.body.posttype,
        eventname:req.body.eventname,
        eventlocation:req.body.eventlocation,
        eventstartdate:req.body.eventstartdate,
        eventenddate:req.body.eventenddate,
        isorgpriv:req.body.isorgpriv,
        orgid:req.body.orgid,
        eventdescription:req.body.eventdescription,
        
        pollsoptions:req.body.pollsoptions,
    
        pollsdeadline:req.body.pollsdeadline,
        postype:req.body.postype,
        pollsvotes:pollvotes,
        // imgurls:imagedata




    });
   
    newPost.save()
        .then(post => {
            if(req.body.isrepost){
                // Posts.findById(req.body.isrepostid)
                Posts.findByIdAndUpdate(req.body.repostid, { $inc: { repostno: 1 }, $push: { repostlist: [req.body.userid, post._id] } }, { new: true }).then(post1 => {

                    
                })
            }
 
    res.json(post)
            

  
 }
             )
        .catch(err => { res.json({ status: false, data: err }) });

}

module.exports = postscontroller