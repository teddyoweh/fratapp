const Comments = require('../models/Comments');
const Posts = require('../models/Posts');
const User = require('../models/User');

async function addcommentscontroller(req, res) {
    console.log(req.body,'comments lol')
 

 
    const  {postid,userid,comment} = req.body
    const newComment = new Comments({
        postid:postid,
        userid:userid,
        comment:comment,
        likelist:[],
    })
    await newComment.save().then(async (resp)=>{

    })

}


async function getComments(req,res) {
  const {postId} = req.body
  query = { postid: postId };
  try {

    const comment = await Comment.findOne({ postid: postId });

    if (!comment) {
      return { error: 'Comment not found' };
    }

    const userData = await User.findById(comment.userid);

    if (!userData) {
      return { error: 'User data not found' };
    }

    const commentWithUserData = {
      postid: comment.postid,
      userid: comment.userid,
      comment: comment.comment,
      likelist: comment.likelist,
      date: comment.date,
      userdata: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        schools: userData.schools,
        orgs: userData.orgs,
        pinnedorg: userData.pinnedorg,
        isverified: userData.isverified,
        isofficial: userData.isofficial,
        uimg: userData.uimg,
        date: userData.date,
        isfirsttime: userData.isfirsttime,
      },
    };

    res.json(commentWithUserData) ;
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong' };
  }
}
async function deleteComment(req,res) {
  Comments.deleteOne({_id:req.body.id}).then((resp)=>{
    res.json({status:true})
  })
}

module.exports = {addcommentscontroller,getComments,deleteComment}