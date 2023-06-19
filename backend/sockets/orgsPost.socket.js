const OrgPosts = require("../models/OrgPosts");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');




function orgStream(app){
const server = http.createServer(app);
const io = socketIO(server);
 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// streamOrgPosts = OrgPosts.watch();

// streamOrgPosts.on('change',next=>{
// console.log(next,'its next')
// })}




}
module.exports = {
  orgStream
}