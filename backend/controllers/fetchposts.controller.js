const Posts = require('../models/Posts');
 
  const Organizations = require('../models/Organizations');
  const User = require('../models/User'); 
const Links = require('../models/Links');
const { fetchpostsService } = require('../services/post.services');
const { getComments } = require('./comment.controller');
const Comments = require('../models/Comments');


async function fetchpostscontroller(req, res) {
  const ans  = await fetchpostsService(req.body)
  res.json(ans)
}




  
  

  async function fetchmypostscontroller(req, res) {
    const { cursor, userid } = req.body;
    const limit = 40;
  
    let query = {
      account_type: { $ne: "anonymous" }
    };
  
    if (userid) {
      query.userid= userid ;
    }
  
    if (cursor) {
      query._id = { $lt: cursor };
    }
  
    try {
 
      const user = await User.findById(userid);

      const posts = await Posts.find(query)
        .sort({ _id: "desc" })
        .limit(limit);
  

      const responseData = {
        user: user,
        posts: posts
      };
      console.log(responseData,'this is the response data from fetch my posts')
      res.json(responseData);
    } catch (err) {
      console.log(err);
      res.json({ status: false, data: err });
    }
  }
  
  
  async function getOnePost(req, res) {
 
    
    try {
      const postId = req.body.id;
  
      const post = await Posts.findOne({ _id: postId });
  
      if (!post) {
        return res.json({ error: 'Post not found' });
      }
  
      const comments = await Comments.find({ postid: postId });
  
      
  
      const commentPromises = comments.map(async (comment) => {
        const userData = await User.findById(comment.userid);
        return {
          postid: comment.postid,
          userid: comment.userid,
          comment: comment.comment,
          likelist: comment.likelist,
          date: comment.date,
          id: comment._id.toString(),
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
      });
  
      const commentsWithUserData = await Promise.all(commentPromises);
       const val = {...post._doc,comments:commentsWithUserData,id:post._id.toString()}
 
      res.json(val);
    } catch (error) {
      console.error(error);
      res.json({ error: 'Something went wrong' });
    }
  }
  
  
  
 
async function deletePost(req,res){
    Posts.findOneAndDelete({ _id: req.body.id }).then(post => {
        res.json(post)
        }).catch(err => {
            console.log(err)
            res.json({ status: false, data: err })
            })
    

}
async function fetchPostUserLikes(req, res) {
  try {
      const { postID } = req.body;
   

 
      const post = await Posts.findById(postID, 'likesuserlist');
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

    
      const usersInfo = await User.find({ _id: { $in: post.likesuserlist } });
   

      res.json(usersInfo);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
}

async function updatePoll(req, res) {
  const { votedoption, postid, userid } = req.body;

  try {
    const poll = await Posts.findById(postid);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (!poll.pollsvotes) {
      poll.pollsvotes = {}; // Initialize it as an empty object
    }

    let oldVotedOption = null;
    for (const option in poll.pollsvotes) {
      if (poll.pollsvotes[option].includes(userid)) {
        oldVotedOption = option;
        break;
      }
    }

    if (oldVotedOption === votedoption) {
      res.json(poll);
      return; // Exit the function early
    }

    if (oldVotedOption) {
      const oldVotes = poll.pollsvotes[oldVotedOption];
      const userIndex = oldVotes.indexOf(userid);
      if (userIndex !== -1) {
        oldVotes.splice(userIndex, 1);
      }
    }

    if (!poll.pollsvotes[votedoption]) {
      poll.pollsvotes[votedoption] = []; // Initialize it as an empty array
    }
    poll.pollsvotes[votedoption].push(userid);

    const updatedPoll = await Posts.findByIdAndUpdate(
      postid,
      poll,
      { new: true }
    );

    res.json(updatedPoll);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the poll' });
  }
}




module.exports = {fetchpostscontroller,updatePoll,getOnePost,fetchmypostscontroller,fetchPostUserLikes,deletePost}