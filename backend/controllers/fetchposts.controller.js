const Posts = require('../models/Posts');
 
  const Organizations = require('../models/Organizations');
  const User = require('../models/User'); 
const Links = require('../models/Links');
  async function fetchpostscontroller(req, res) {
    const { cursor, userid, userid_, orgid } = req.body;
    const limit = 40;

    let query = {};

    if (cursor) {
      query._id = { $lt: cursor };
    }
    if (userid) {
      query.userid = userid;
    }

    if (userid_ && orgid) {
      query.orgid = orgid;
    } else {
      query.isorgpriv = false;
    }

    try {
      // Fetch users you've blocked
      const blockedUsers = await Links.find({ userid: userid, stat: "block" }).distinct('partyid');
      
      // Fetch users who have blocked you
      const usersWhoBlockedYou = await Links.find({ partyid: userid, stat: "block" }).distinct('userid');

      // Combine both lists
      const allBlockedUsers = [...new Set([...blockedUsers, ...usersWhoBlockedYou])];

      // Exclude posts from all blocked users and from users who have blocked you
      query.userid = { $nin: allBlockedUsers };

      const posts = await Posts.find(query)
        .sort({ _id: "desc" })
        .limit(limit);

      const [users, allPinnedOrgs] = await Promise.all([
        User.find({ _id: { $in: posts.map((post) => post.userid) } }, {
          firstname: 1,
          lastname: 1,
          username: 1,
          uimg: 1,
          id: 1,
          isofficial: 1,
          bio: 1,
          pinnedorg: 1
        }),
        Organizations.find({ _id: { $in: posts.map((post) => post.userid) } })
      ]);

      const pinnedOrgsDict = allPinnedOrgs.reduce((acc, org) => {
        acc[org._id] = org;
        return acc;
      }, {});

      const usersDict = {};

      for (const user of users) {
        usersDict[user._id] = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          uimg: user.uimg,
          userid: user.id,
          isofficial: user.isofficial,
          bio: user.bio,
          pinnedorg: pinnedOrgsDict[user.pinnedorg],
        };
      }
      const res_data = { posts: posts, users: usersDict }  
      console.log(res_data, 'this is the response data from fetch posts');
      res.json(res_data);

    } catch (err) {
      console.error("Error fetching posts:", err); // Log the error for debugging
      res.json({ status: false, message: "An error occurred while fetching posts." });
    }
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
  
  
function getOnePost(req,res){
    Posts.findOne({ _id: req.body.id }).then(post => {
        res.json(post)
        }).catch(err => {
            console.log(err)
            res.json({ status: false, data: err })
            })
    

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
      console.log(req.body);

 
      const post = await Posts.findById(postID, 'likesuserlist');
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

    
      const usersInfo = await User.find({ _id: { $in: post.likesuserlist } });
      console.log(usersInfo);

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