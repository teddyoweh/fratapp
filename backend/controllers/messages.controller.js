
const User = require('../models/User')
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const Links = require('../models/Links')
const crypto = require('crypto');

var fs = require('fs');
const Channels = require('../models/Channels');
const Organization = require('../models/Organizations');
const OrgMembership = require('../models/OrgMemberships');
const Messages = require('../models/Message');
function hashcode(data){
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    const hashedData = hash.digest('hex');
    
    return hashedData
     }
     function hashfilename(filename,email,randomNumberString1){
     
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)))+'.jpeg';
     }
function fetchmessagescontroller(req, res) {
 
  // if(req.body.receiver_type === 'user'){
  // const messagesPromise = Message.find({
  //   $or: [
  //     { sender_id: req.body.receiver_id },
  //     { receiver_id: req.body.receiver_id },

  //   ]
  // }).exec();}
  // else if(req.body.receiver_type === 'cohort'){
  //   const messagesPromise = Message.find({
  //     $or: [
  //       { sender_id: req.body.receiver_id },
  //       { org_id:req.body.org_id  },
  //       { channel_id:req.body.channel_id  },
  //     ]
  //   }).exec();}
  // else if(req.body.receiver_type === 'org'){
  //   const messagesPromise = Message.find({
  //     $or: [

  // { sender_id: req.body.receiver_id },
  //       { org_id:req.body.org_id  },
  //     ]
  //   }).exec();}

  
    let query = {
    //  $or: [
    //     { sender_id: req.body.receiver_id },
    //  ]
     
      
    };

    console.log(req.body,'fetch message shit')
  
    if (req.body.receiver_type === 'user') {
      query.receiver_type=req.body.receiver_type
      query.$or= [
            { sender_id: req.body.receiver_id },

       { receiver_id: req.body.receiver_id },]
    } else if (req.body.receiver_type === 'cohort') {
    //   query.$and = [ {org_id :req.body.org_id}, 
    //  {channel_id :req.body.channel_id}]

        query.channel_id =req.body.channel_id
     
    } else if (req.body.receiver_type === 'group') {
      query.org_id =req.body.org_id 
      query.channel_id =null
    }
    console.log(query,'queriess')
    const messagesPromise = Message.find(query).exec();

  const usersHashMapPromise = Message.distinct("sender_id").exec();
  
  Promise.all([messagesPromise, usersHashMapPromise])
    .then(([messages, senderIds]) => {
      const usersHashMap = {};
  
      User.find({ _id: { $in: senderIds } })
        .then(users => {
          users.forEach(user => {
            usersHashMap[user._id] = {
              username: user.username,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              uimg: user.uimg,
              isofficial: user.isofficial
            };
          });
 
  
          res.json({ messages, usersHashMap });
        })
        .catch(err => {
          console.log(err);
          res.json({ status: false, data: err });
        });
    })
    .catch(err => {
      console.log(err);
      res.json({ status: false, data: err });
    });
  

}
 


async function sendmessagescontroller(req,res){
  const images = []
     console.log(req.body)
 if(req.body.images){


  req.body.images.map((image,index)=>{
      images.push({uri:hashfilename(image.uri,req.body.email,req.body.random),width:image.width,height:image.height})

  })
}
   const newMessage = new Message({
      sender_id:req.body.user_id,
      receiver_id:req.body.receiver_id,
      content:req.body.text,
      msg_type:req.body.msg_type,
      receiver_type:req.body.receiver_type,
      msg_images:images,
      channel_id:req.body.channel_id,
      org_id:req.body.org_id,
      

    })
     const mes =  await newMessage.save()
 
     res.json(mes)
}




// async function getLatestMessagesAndPartyInfo(userId) {
//   try {
      
//       const user = await User.findById(userId);

//       if (!user) {
//           return { error: 'User not found' };
//       }

      
//       const latestMessages = await Message.aggregate([
//           {
//               $match: {
//                   $or: [
//                       { sender_id: userId },
//                       { receiver_id: userId }
//                   ],
//                   $and: [
//                       { sender_id: { $ne: null } },
//                       { receiver_id: { $ne: null } }
//                   ]
//               }
//           },
//           {
//               $sort: { date: -1 }
//           },
//           {
//               $group: {
//                   _id: {
//                       $cond: [
//                           { $eq: ['$sender_id', userId] },
//                           '$receiver_id',
//                           '$sender_id'
//                       ]
//                   },
//                   latestMessage: { $first: '$$ROOT' }
//               }
//           },
//           {
//               $replaceRoot: { newRoot: '$latestMessage' }
//           }
//       ]);

      
//       const partyIdsSet = new Set();
//       latestMessages.forEach(message => {
//           if (message.sender_id !== userId) {
//               partyIdsSet.add(message.sender_id.toString());
//           }
//           if (message.receiver_id !== userId) {
//               partyIdsSet.add(message.receiver_id.toString());
//           }
//       });
//       const partyIdsArray = Array.from(partyIdsSet);

      
//       const partyUsers = await User.find({ _id: { $in: partyIdsArray } });

      
//       const partyUsersLookup = {};
//       partyUsers.forEach(partyUser => {
//           partyUsersLookup[partyUser._id.toString()] = partyUser;
//       });

      
//       latestMessages.forEach(message => {
//           const partyId = message.sender_id !== userId ? message.sender_id : message.receiver_id;
//           message.user_info = partyUsersLookup[partyId.toString()];
//       });

//       return {
//           user,
//           latestMessages
//       };
//   } catch (error) {
//       return { error: 'An error occurred' };
//   }
// }

 

async function getLatestMessagesAndPartyInfo(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { error: 'User not found' };
    }

    // Find the organizations that the user is a member of
    const userOrgMemberships = await OrgMembership.find({ user_id: userId });
    const orgIds = userOrgMemberships.map((membership) => membership.org_id);

    const userChannels = await Channels.find({ org_id: { $in: orgIds } });
    // Find the latest messages where the user is either the sender or receiver
    const latestMessages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender_id: userId },
            { receiver_id: userId },
            { org_id: { $in: orgIds } }, // Filter by org_id
            { channel_id: { $in: userChannels.map((channel) => channel._id) } },
          ],
          // $and: [
          //   { sender_id: { $ne: null } },
          //   { receiver_id: { $ne: null } },
          //   // { org_id: { $in: orgIds } }, // Filter by org_id
          //   // { channel_id: { $in: userChannels.map((channel) => channel._id) } }, // Filter by channel_id
          // ],
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender_id', userId] },
              '$receiver_id',
              '$sender_id',
            ],
          },
          latestMessage: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestMessage' },
      },
    ]);
    console.log(latestMessages, 'latestMessagesxxxc')
    const partyIdsSet = new Set();
    latestMessages.forEach(message => {
      if (message.sender_id !== userId) {
        partyIdsSet.add(message.sender_id.toString());
      }
      if (message.receiver_id !== userId) {
        partyIdsSet.add(message.receiver_id.toString());
      }

   

    });

   

    const partyIdsArray = Array.from(partyIdsSet);

    const partyUsers = await User.find({ _id: { $in: partyIdsArray } });

    const partyUsersLookup = {};
    partyUsers.forEach(partyUser => {
      partyUsersLookup[partyUser._id.toString()] = partyUser;
    });

    for (const message of latestMessages) {
      const partyId = message.sender_id !== userId ? message.sender_id : message.receiver_id;
      message.user_info = partyUsersLookup[partyId.toString()];

      if (message.receiver_type !== 'user') {
        const orgInfo = await Organization.findOne({ _id: message.org_id });
        message.org_info = orgInfo;
        console.log(message.org_info, 'message.org_info');

        if (message.receiver_type === 'cohort') {
          const channelInfo = await Channels.findOne({ _id: message.channel_id });
          message.channel_info = channelInfo;

          if (channelInfo && orgInfo) {
            message.channel_name = `${orgInfo.org_name} - ${channelInfo.channel_name}`;
          }
        }
      }
    }

    console.log(latestMessages, 'latestMessages');
    return {
      user,
      latestMessages,
    };
  } catch (error) {
    return { error: 'An error occurred' };
  }
}



 


async function getSuggestedUsers(userId) {
  try {
    const suggested = await getSuggested(userId);

    const suggestedUsers = await User.find(
      { _id: { $in: suggested.map(sug => sug.partyid) } },
      'firstname lastname uimg username isofficial _id'
    );

    return suggestedUsers;
  } catch (error) {
    throw error;
  }
}


async function messageListController(req, res) {
  try {
    const { user_id} = req.body;

    const [ contactList] = await Promise.all([
   
      getLatestMessagesAndPartyInfo(user_id)
    ]);
    console.log('start contact',contactList,'contactList')
    res.json({
      
      contacts: contactList
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

 


function messagesViewedByController(req, res) {
    const { message_id, user_id } = req.body;
  
    Message.findByIdAndUpdate(
      message_id,
      { $addToSet: { viewedby: user_id } },
      { new: true }
    )
      .then(() => {
        res.status(200).json({ message: 'Message viewed by user successfully.' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Unable to update viewedby array.' });
      });
  }
   
 
  
  async function updateMessageViewed(req, res) {
 
    const {viewerId,messageId} = req.body
  
    try {
      const message = await Message.findById(messageId);
  
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      
      if (!message.viewedby.includes(viewerId)) {
        message.viewedby.push(viewerId);
        console.log(message,'lol new view')
        await message.save();
      }
  
      return res.json({ message: 'Message viewed status updated' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function getUnreadCount(req,res) {
    const {userId} = req.body
    const orgsids = await OrgMembership.find({user_id:userId}).distinct('org_id')
    const cohortids = await Channels.find({channel_members:userId}).distinct('cohort_id')
    const myids = [...orgsids, ...cohortids, userId]
    try {
      // const unreadCounts = await Messages.aggregate([
      //   {
      //     $match: {
      //       receiver_id: {$in:myids},
      //       viewedby: { $ne: userId },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: { sender_id: "$sender_id", receiver_id: "$receiver_id" },
      //       latestMessage: { $last: "$$ROOT" },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       unreadCount: { $sum: 1 },
      //     },
      //   },
      // ]);
      const unreadCounts = await Messages.aggregate([
        {
          $match: {
            receiver_id: { $in: myids }, // assuming myids is an array of ids
            viewedby: { $ne: userId },
          },
        },
        // {
        //   $group: {
        //     _id: "$sender_id", // Group by sender
        //     count: { $sum: 1 }, // Count unread messages
        //     latestMessageDate: { $max: "$created_at" }, // Assuming you have a created_at field
        //   },
        // },
        // {
        //   $sort: {
        //     latestMessageDate: -1, // Sort by latest message date in descending order
        //   },
        // },
      ]);
      console.log(myids)
      console.log(unreadCounts,'this is the unread count SHIIII')
  
      if (unreadCounts.length > 0) {
        // res.json(unreadCounts[0].unreadCount);
        res.json(unreadCounts.length)
      } else {
        res.json(0);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error while fetching unread messages');
    }
  }
  
module.exports ={fetchmessagescontroller,messageListController,sendmessagescontroller,messagesViewedByController,updateMessageViewed,getSuggestedUsers,getUnreadCount}