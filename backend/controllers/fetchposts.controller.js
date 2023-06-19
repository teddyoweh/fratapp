const Posts = require('../models/Posts');


  const User = require('../models/User'); 
  async function fetchpostscontroller(req, res) {
    const { cursor,userid} = req.body;
    const limit = 40;
  
  
    let query = {};
  
    if (cursor) {
      query._id = { $lt: cursor };
    }
    if(userid){
      query.userid = userid;
    }
  
    try {
      const posts = await Posts.find(query)
        .sort({ _id: "desc" })
        .limit(limit);
  
      const userIds = posts.map((post) => post.userid);
      const users = await User.find({ _id: { $in: userIds } });
  
      const usersDict = users.reduce((acc, user) => {
        acc[user._id] = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          uimg: user.uimg,
          userid:user.id,
          isofficial:user.isofficial,
        bio:user.bio,
        pinnedorgs:user.pinnedorgs
        };
        return acc;
      }, {});
 
  
    
      res.json({ posts: posts, users: usersDict });
  
    } catch (err) {
 
      res.json({ status: false, data: err });
    }
  }
  
  

  function fetchmypostscontroller(req, res) {
    const { cursor,userid} = req.body;
    const limit = 40;
    
    let query = { };
    if(userid){
      query.userid = userid;
    }
    if (cursor) {
      query._id = { $lt: cursor };
    }
    console.log(cursor)
    Posts.find(query)
      .sort({ _id: "desc" })
      .limit(limit)
      .then((posts) => {
  
        res.json(posts);
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: false, data: err });
      });
  }

function getOnePost(req,res){
    Posts.findOne({ _id: req.body.id }).then(post => {
        res.json(post)
        }).catch(err => {
            console.log(err)
            res.json({ status: false, data: err })
            })
    

}

module.exports = {fetchpostscontroller,getOnePost,fetchmypostscontroller}