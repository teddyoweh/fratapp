const Posts = require('../models/Posts');
 

async function likepostscontroller(req, res) {
  
    const { postid, userid } = req.body;
  
    try {
      const post = await Posts.findById(postid);
  
      if (post.likesuserlist.includes(userid)) {
 
        await Posts.findOneAndUpdate(
          { _id: postid },
          { $pull: { likesuserlist: userid } },
          { new: true }
        ).then(post1=>{
            res.json(post1);
        });
      } else {
 
        await Posts.findOneAndUpdate(
          { _id: postid },
          { $push: { likesuserlist: userid } },
          { new: true }
        ).then(post1=>{
            res.json(post1);
        });
      }
  

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 

  }

module.exports = likepostscontroller;