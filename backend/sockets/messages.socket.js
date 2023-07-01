const socketIO = require('socket.io');
const Message = require('../models/Message')

const http = require('http');

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
        const { sender_id, receiver_id } = change.fullDocument;
        const { userId } = socket;
    
        if (userId === sender_id || userId === receiver_id) {
          socket.emit('message', change.fullDocument);
        }
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
        changeStream.close();
      });
    });
    server.listen(8080)

}

module.exports = {
chatSocket
}