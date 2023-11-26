const User = require('../models/User'); 

const Links = require("../models/Links");
const Posts = require("../models/Posts");
const Organization = require("../models/Organizations");
const { MongoClient, ObjectId } = require('mongodb');

const fetchpostsService = async (body) => {
    console.log(body,'this is the body')
    const { cursor, userid,postids_ } = body;
    const limit = 20;
  
    let query = {};
  
    if (cursor) {
      query._id = { $lt:cursor};
    }
    if(postids_){
        query._id.$in =  postids_;
    }
  query.imgurls = { $exists: true, $eq: [] }
    if (userid) {
      query.userid = userid;
    }
  
    try {
      
      const [blockedUsers, usersWhoBlockedYou] = await Promise.all([
        Links.find({ $or: [{ userid, stat: "block" }, { partyid: userid, stat: "block" }] }).distinct('partyid'),
      ]);
  
      const allBlockedUsers = [
        ...new Set([...(blockedUsers || []), ...(usersWhoBlockedYou || [])]),
      ];
      query.userid = { $nin: allBlockedUsers };
      console.log(query,'this is the query')
      const posts = await Posts.find(query)
      .sort({ _id: "desc" }) 
        .limit(limit)
        .lean();
  
      const userIds = posts.map((post) => post.userid);
  
      const [users, allPinnedOrgs] = await Promise.all([
        User.find({ _id: { $in: userIds } }, { firstname: 1, lastname: 1, username: 1, uimg: 1, id: 1, isofficial: 1, bio: 1, pinnedorg: 1 }).lean(),
        []
        // Organization.find({ _id: { $in: userIds } }).lean(),
      ]);
  
    //   const pinnedOrgsDict = allPinnedOrgs.reduce((acc, org) => {
    //     acc[org._id] = org;
    //     return acc;
    //   }, {});
  
      const usersDict = users.reduce((acc, user) => {
        acc[user._id] = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          uimg: user.uimg,
          userid: user.id,
          isofficial: user.isofficial,
          bio: user.bio,
        //   pinnedorg: pinnedOrgsDict[user.pinnedorg],
        };
        return acc;
      }, {});
       const res_data = { posts, users: usersDict,postids:posts.map((post)=>post._id.toString()) };
 
      return res_data;
    } catch (err) {
        console.log(err,'this is the error')
      return { status: false, message: "An error occurred while fetching posts." };
    }
  };
  
  

module.exports = {
    fetchpostsService
}