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
 sender_username:{


 },
 viewedby:{
type:Array
 },
 sender_uimg:{},
 receiver_type:{},
 title:{},
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;