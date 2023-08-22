
const User = require('../models/User')
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const Links = require('../models/Links')
const crypto = require('crypto');

var fs = require('fs');
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
 

  Message.find({
    $or: [
      { sender_id: req.body.receiver_id },
      { receiver_id: req.body.receiver_id }
    ]
  })
    .then(messages => {
   
      res.json(messages);
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
      msg_images:images


    })
     const mes =  await newMessage.save()
 
     res.json(mes)
}




async function getLatestMessagesAndPartyInfo(userId) {
  try {
      
      const user = await User.findById(userId);

      if (!user) {
          return { error: 'User not found' };
      }

      
      const latestMessages = await Message.aggregate([
          {
              $match: {
                  $or: [
                      { sender_id: userId },
                      { receiver_id: userId }
                  ],
                  $and: [
                      { sender_id: { $ne: null } },
                      { receiver_id: { $ne: null } }
                  ]
              }
          },
          {
              $sort: { date: -1 }
          },
          {
              $group: {
                  _id: {
                      $cond: [
                          { $eq: ['$sender_id', userId] },
                          '$receiver_id',
                          '$sender_id'
                      ]
                  },
                  latestMessage: { $first: '$$ROOT' }
              }
          },
          {
              $replaceRoot: { newRoot: '$latestMessage' }
          }
      ]);

      
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

      
      latestMessages.forEach(message => {
          const partyId = message.sender_id !== userId ? message.sender_id : message.receiver_id;
          message.user_info = partyUsersLookup[partyId.toString()];
      });

      return {
          user,
          latestMessages
      };
  } catch (error) {
      return { error: 'An error occurred' };
  }
}



async function getContactList(userId) {
  try {
    const messages = await Message.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }]
    })
    .sort({ date: -1 })
    .limit(10) 
    
    const processedUserIds = new Set();
    const latestMessages = [];

    const userIdsToFetch = [];

    for (const message of messages) {
      const counterpartId = message.sender_id === userId ? message.receiver_id : message.sender_id;
      
      if (counterpartId && !processedUserIds.has(counterpartId)) {
        userIdsToFetch.push(counterpartId);
        processedUserIds.add(counterpartId);
      }

      latestMessages.push({
        ...message.toObject()
      });

      if (userIdsToFetch.length >= 10) { 
        const usersInfo = await User.find({ _id: { $in: userIdsToFetch } }, '_id firstname lastname isofficial uimg username');

        for (const userInfo of usersInfo) {
          const messageIndex = latestMessages.findIndex(msg => (msg.sender_id === userInfo._id.toString() || msg.receiver_id === userInfo._id.toString()));
          if (messageIndex !== -1) {
            latestMessages[messageIndex].user_info = userInfo;
          }
        }

        userIdsToFetch.length = 0; 
      }
    }

    if (userIdsToFetch.length > 0) {
      const usersInfo = await User.find({ _id: { $in: userIdsToFetch } }, '_id firstname lastname isofficial uimg username');

      for (const userInfo of usersInfo) {
        const messageIndex = latestMessages.findIndex(msg => (msg.sender_id === userInfo._id.toString() || msg.receiver_id === userInfo._id.toString()));
        if (messageIndex !== -1) {
          latestMessages[messageIndex].user_info = userInfo;
        }
      }
    }

    return latestMessages;
  } catch (error) {
    throw error;
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
    const { user_id } = req.body;

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
    try {
      const unreadCounts = await Message.aggregate([
        {
          $match: {
            receiver_id: userId,
            viewedby: { $ne: userId },
          },
        },
        {
          $group: {
            _id: { sender_id: "$sender_id", receiver_id: "$receiver_id" },
            latestMessage: { $last: "$$ROOT" },
          },
        },
        {
          $group: {
            _id: null,
            unreadCount: { $sum: 1 },
          },
        },
      ]);
  
      if (unreadCounts.length > 0) {
        res.json(unreadCounts[0].unreadCount);
      } else {
        res.json(0);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error while fetching unread messages');
    }
  }
  
module.exports ={fetchmessagescontroller,messageListController,sendmessagescontroller,messagesViewedByController,updateMessageViewed,getContactList,getSuggestedUsers,getUnreadCount}