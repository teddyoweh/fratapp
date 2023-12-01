const User = require('../models/User'); 

const Links = require("../models/Links");
const Posts = require("../models/Posts");
const Organization = require("../models/Organizations");
const { MongoClient, ObjectId } = require('mongodb');

const fetchpostsService = async (body) => {
 
    const { cursor, userid,postids_ ,user_location,cursor_stat} = body;
     const limit = 5;
  
    let query = {};

  //   if (cursor) {
  //     query._id = { $lt:cursor};
     
  //  }
  if (cursor_stat=='next') {
    query._id = { $lt:cursor};
  }else if(cursor_stat=='prev'){
    query._id = { $gt:cursor};
    console.log('prev',cursor)
  
  }
     if (userid) {
      query.userid = userid;
    }
    if (user_location && user_location.latitude && user_location.longitude) {
 
        const distanceInMiles = 5;
        query.location = {
            $geoWithin: {
                $centerSphere: [
                    [user_location.longitude, user_location.latitude],
                    distanceInMiles / 3963.2, // Earth's radius in miles
                ],
            },
        };
    }

    try {
      
      const [blockedUsers, usersWhoBlockedYou] = await Promise.all([
        Links.find({ $or: [{ userid, stat: "block" }, { partyid: userid, stat: "block" }] }).distinct('partyid'),
      ]);
  
      const allBlockedUsers = [
        ...new Set([...(blockedUsers || []), ...(usersWhoBlockedYou || [])]),
      ];
      query.userid = { $nin: allBlockedUsers };
 
      const posts = await Posts.find(query)
      .sort({ _id: "desc" }) 
        .limit(limit)
        .lean();
  
   
  
   
    const users = await  User.find({ _id: { $in: posts.map((post) => post.userid) } }, { firstname: 1, lastname: 1, username: 1, uimg: 1, id: 1, isofficial: 1, bio: 1, pinnedorg: 1 }).lean()
     
  
  
      const usersDict = users.reduce((acc, user) => {
        acc[user._id] = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          uimg: user.uimg,
          userid: user.id,
          isofficial: user.isofficial,
          bio: user.bio,

        };
        return acc;
      }, {});
      const hasFetchedAllPosts = posts.length < limit;
       const res_data = { posts, users: usersDict,postids:posts.map((post)=>post._id.toString()),cursor:posts[posts.length-1]?._id.toString() };
      if(cursor_stat=='prev'){
        console.log('prev',res_data.posts)
      
      }
       return res_data;
    } catch (err) {
        console.log(err,'this is the error')
      return { status: false, message: "An error occurred while fetching posts." };
    }
  };
  
  

module.exports = {
    fetchpostsService
}