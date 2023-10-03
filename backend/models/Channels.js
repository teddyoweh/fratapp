const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({

 
    org_id:{
    },
    

    channel_type:{
    },
    channel_name:{},

    channel_logo:{
    },
    channel_members:{
        type:Array,
    
    },
 
    
 
 createdby:{

 },
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Channels = mongoose.model('Channels', ChannelSchema);

module.exports =Channels