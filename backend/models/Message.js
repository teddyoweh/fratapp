const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const MessagesSchema = new Schema({

 
sender_id:{

 },
 receiver_id:{

 },
 content:{

 },
 msg_type:{

 },
 msg_urls:{
    type:Array
 },
 msg_images:{
   type:Array
 },
 channel_id:{},
 org_id:{},
 viewedby:{
type:Array,
default:[]
 },
 msg_type:{},
 
 receiver_type:{},
  
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;