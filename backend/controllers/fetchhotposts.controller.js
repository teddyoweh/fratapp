const Posts = require('../models/Posts');
function sortByLikes(data) {
    return data.sort((a, b) => {
      return b.likesno - a.likesno;
    });
  }
function fetchhotposts(req, res) {
 
  // const limit = 40;

  let query = { ispublic: true ,date: { $gte: new Date(new Date().getTime() - 48 * 60 * 60 * 1000) }};

 
 
  Posts.find(query)

 
  .sort({ likesno: -1 })
  .then(posts => {
  console.log(posts[0])

     
    res.status(200).json(posts)})
 .catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    }) 
}

module.exports =fetchhotposts