const socketIO = require('socket.io');
const Message = require('../models/Message')

const http = require('http');
const Messages = require('../models/Message');

function chatSocket(app){
    const server = http.createServer(app);

    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('Client connected');
    
      socket.on('userId', (userId) => {
 
        socket.userId = userId;
      });
    
      const changeStream = Message.watch();
    
      changeStream.on('change', (change) => {
        if(Object.keys(change).includes('fullDocument')){
 
 
          const { sender_id, receiver_id } = change.fullDocument;
          const { userId } = socket;
          
          if (userId === sender_id || userId === receiver_id) {
            console.log('emitting');
            socket.emit('message', change.fullDocument);
          }
        }
    
      });
      socket.on('unreadcount', (userId) => {
 
        socket.userId = userId;
      });
    
 
    
      changeStream.on('change', (change) => {
        if(Object.keys(change).includes('fullDocument')){
 
 
          const { sender_id, receiver_id } = change.fullDocument;
          const { userId } = socket;
          socket.emit('unreadcount',countUnviewedMessages(userId))
          
       
        }
    
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
        changeStream.close();
      });
    });
    server.listen(8888)

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


 
 

function unreadCountSocket(app){
 
}
module.exports = {
chatSocket,
unreadCountSocket
}