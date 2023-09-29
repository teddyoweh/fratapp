const socketIO = require('socket.io');
const Message = require('../models/Message')

const http = require('http');
const Messages = require('../models/Message');
const Notifications = require('../models/Notifications');
const OrgMembership = require('../models/OrgMemberships');

function chatSocket(app){
    const server = http.createServer(app);

    const io = socketIO(server);
    
    io.on('connection', async (socket) => {
      console.log('Client connected');
    
      socket.on('userId', (userId) => {
 
        socket.userId = userId;
        console.log(userId,'this is the user id')
      });
    
      const changeStream = Message.watch();
      const orgsids = await OrgMembership.find({user_id:socket.userId}).distinct('org_id')
      const myids = [...orgsids,socket.userId]
      const messagesStream = Messages.watch([
        {
          $match: {
            receiver_id: {$in:myids},
         
          },
        },])
      const notifStream = Notifications.watch([
        {
            $match: {
                owner_id: socket.userId,
            },
        },
    ]);
    
      changeStream.on('change', (change) => {
        if(Object.keys(change).includes('fullDocument')){
 
 
          const { sender_id, receiver_id } = change.fullDocument;
          const { userId } = socket;
          
          if (userId === sender_id || userId === receiver_id) {
            console.log('emitting');
            console.log(change.fullDocument,'this is the chager')
            socket.emit('message', change.fullDocument);
          }
        }
    
      });
        

      socket.on('unreadcount', (userId) => {
 
        socket.userId = userId;
      });
      socket.on('unreadnotifs', (userId) => {
 
        socket.userId = userId;
      });
    
      messagesStream.on('change', async (change) => {
        console.log('this been a change in the messages fuck')
        const counts  = await getUnreadCount(socket.userId)
        console.log(counts)
        socket.emit('unreadcount',counts)
      });
    
      notifStream.on('change', async (change) => {
        if(Object.keys(change).includes('fullDocument')){
 
 
           const { userId } = socket;
           const counts = await countUnreadNotifs(userId)
           console.log(counts,'this is the count')
          socket.emit('unreadnotifs',counts)
          
       
        }
    
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
        changeStream.close();
      });
    });
    server.listen(8080)

  }
async function countUnreadNotifs(userid){
  try {
    
    const unviewedNotifsCount = await Notifications.countDocuments({
      owner_id: userid, 
      notification_read:false, 
    });

    return unviewedNotifsCount;
  } catch (error) {
    console.error('Error counting unviewed notifications:', error);
    throw error;
  }
}
async function countUnviewedMessages(userid) {
  try {
    
    const unviewedMessagesCount = await Messages.countDocuments({
      receiver_id: userid, 
      viewedby: { $nin: [userid] }, 
    });

    return unviewedMessagesCount;
  } catch (error) {
    console.error('Error counting unviewed messages:', error);
    throw error;
  }
}


async function getUnreadCount(userId) {
 
  const orgsids = await OrgMembership.find({user_id:userId}).distinct('org_id')
  const myids = [...orgsids,userId]
  try {
    const unreadCounts = await Messages.find(
      {
  
          receiver_id: userId,// {$in:myids},
          //viewedby: { $ne: userId },
 
      },
      // {
      //   // $group: {
      //   //   _id: { sender_id: "$sender_id", receiver_id: "$receiver_id" },
      //   //   //latestMessage: { $last: "$$ROOT" },
      //   // },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     unreadCount: { $sum: 1 },
      //   },
      // },
    );
    console.log(unreadCounts,'this is the unread count SHIIII')
    if (unreadCounts.length > 0) {
      // /return unreadCounts[0].unreadCount;
      return unreadCounts.length
    } else {
      return 0
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error while fetching unread messages');
  }
}
 

function unreadCountSocket(app){
 
}
module.exports = {
chatSocket,
unreadCountSocket
}