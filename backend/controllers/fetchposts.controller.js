const Posts = require('../models/Posts');

function fetchpostscontroller(req, res) {
    const { cursor,user} = req.body;
    const limit = 40;
  
    let query = { ispublic: true };
  
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

module.exports = {fetchpostscontroller,getOnePost}