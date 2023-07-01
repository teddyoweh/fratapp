const Posts = require('../models/Posts');
const User = require('../models/User');

function addcommentscontroller(req, res) {
    console.log(req.body,'comments lol')
 

 
    const mDate = new Date()
    Posts.findByIdAndUpdate(req.body.postid, { $push: { commentslist: {userid:req.body.userid, comment:req.body.comment,date:mDate,postid:req.body.postid} } }, { new: true }).then(post => {

        res.json(post)  
    }).catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    })
}
async function getUserData(userIds) {
    const userDataMap = {};
  
    try {
      const users = await User.find({ _id: { $in: userIds } })
        .select('user uimg firstname lastname _id username');
      users.forEach(user => {
        userDataMap[user._id] = {
        
          uimg: user.uimg,
          firstname: user.firstname,
          lastname: user.lastname,
          username:user.username,
          id: user.id
        };
      });
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  
    return userDataMap;
  }
async function getCommentUser(req,res){
    const {users} = req.body

    const resp = await getUserData(users)
    console.log(resp)

    res.json(resp)



}

module.exports = {addcommentscontroller,getCommentUser}