const Posts = require('../models/Posts');
function sortByLikes(data) {
    return data.sort((a, b) => {
      return b.likesno - a.likesno;
    });
  }
function fetcheventposts(req, res) {
  console.log(req.body)
  Posts.find({
   ispublic:true,
   isevent:true
   
  })
  .sort({ date: -1 })
  .then(posts => {


     
    res.status(200).json(posts)})
 .catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    }) 
}
function fetchannouncementposts(req, res) {
    console.log(req.body)
    Posts.find({
     ispublic:true,
     isanouncement:true
     
     
    })
    .sort({ date: -1 })
    .then(posts => {
  
  
       
      res.status(200).json(posts)})
   .catch(err => {
          console.log(err)
          res.json({ status: false, data: err })
      }) 
  }

  function fetchpinnedposts(req, res) {
    console.log(req.body)
    Posts.find({
     ispublic:true,
     ispinned:true
     
    })
    .sort({ date: -1 })
    .then(posts => {
  
  
       
      res.status(200).json(posts)})
   .catch(err => {
          console.log(err)
          res.json({ status: false, data: err })
      }) 
  }
 
  
  async function fetchPostsByType(postType, limit, excludeIds = []) {
    const posts = await Posts.find({
      ispublic: true,
      [postType]: true,
      _id: { $nin: excludeIds } 
    })
      .sort({ date: -1 })
      .limit(limit)
      .exec();
    return sortByLikes(posts);
  }
  
  async function newsfeed(req, res) {
    try {
      let excludeIds = []; 
      const eventPosts = await fetchPostsByType('isevent', 2, excludeIds);
      excludeIds = excludeIds.concat(eventPosts.map(post => post._id));
      const pinnedPosts = await fetchPostsByType('ispinned', 2, excludeIds);
      excludeIds = excludeIds.concat(pinnedPosts.map(post => post._id));
      const announcementPosts = await fetchPostsByType('isanouncement', 2, excludeIds);
      const posts = [
        ...eventPosts,
        ...pinnedPosts,
        ...announcementPosts
      ];
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.json({ status: false, data: err });
    }
  }
  
 
  
module.exports = { fetchannouncementposts,fetcheventposts,fetchpinnedposts,newsfeed}