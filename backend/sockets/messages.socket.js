const socketIO = require('socket.io');
const Message = require('../models/Message')

const http = require('http');
const Messages = require('../models/Message');
const Notifications = require('../models/Notifications');
const OrgMembership = require('../models/OrgMemberships');
const User = require('../models/User');
const Posts = require('../models/Posts');
const Organization = require('../models/Organizations');
const Links = require('../models/Links');
const { fetchpostsService } = require('../services/post.services');
 
function chatSocket(app){
    const server = http.createServer(app);

    const io = socketIO(server);
    
    io.on('connection', async (socket) => {
      socket.on("newpost",async ( {userid,cursor} )=>{
        console.log("new postttt socket")
    
 
         await fetchpostsService({cursor,userid}).then(results=>{
   
           
          socket.emit('newpostsupdate',{
           posts: results
          })
        })
       
      })
      socket.on('userId', (userId) => {
 
        socket.userId = userId;
        console.log("Clinet connected ",userId)
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
        let data;
        const {user_data} = await findUnreadPartyData(change.fullDocument) ;
        
        console.log(counts)
        socket.emit('unreadcount',{
          counts,
          data:{
            user_data,
            data:change.fullDocument
          }
        })
      });
      messagesStream.on('update', async (change) => {
        console.log('this been a change in the messages fuck')
        const counts  = await getUnreadCount(socket.userId)
        let data;
        const {user_data} = await findUnreadPartyData(change.fullDocument) ;
        
        console.log(counts)
        socket.emit('unreadcount',{
          counts,
          data:{
            user_data,
            data:change.fullDocument
          }
        })
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

async function findUnreadPartyData(data){
  let user_data;
  let org_data
  if(data){


  if(Object.keys(data).includes('receiver_type')){


  if(data.receiver_type=='user'){
    user_data =  await User.findById(data.sender_id)
  }
}  }
  return {
    user_data,
    org_data
  }
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
 


async function getUnreadCount(userId) {
 
  const orgsids = await OrgMembership.find({user_id:userId}).distinct('org_id')
  const myids = [...orgsids,userId]
  try {
      // ]);
    const unreadCounts = await Messages.aggregate([
      {
        $match: {
          receiver_id:{ $in: myids }, //{ $in: myids }, // assuming myids is an array of ids
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