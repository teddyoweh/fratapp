// ./models/User.js -t3:16 -e3:16 -d3:16

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Addition of  the Schema for the User model

const OrgPostSchema = new Schema({
    userdata: {},
    isrepost: {
        type: Boolean,
    },

    repostid: {},
    posttype:{},
    userid:{
        type: String,
    },
   

    content: {
        type: String,
    },
    
    imgurls: {
        type: Array,
    },
   viewaccess:{
    type: Array
   },

    isanouncement:{
        type: Boolean,
    },
    isevent:{
        type: Boolean,
    },
    isjob:{
        type: Boolean,
    },
    ip: {
        type: String,
    },
    links:{
        type: Array,
    },
    pollsoptions:{
        type: Array,
    },
    pollsvotes:{
 
    },
    likesno: {

        type: Number,
    },
    eventgoinglist:{
        type: Array,
    },
    likesuserlist: {
        type:Array
    },
    commentuserlist: {},
    commentsno: {
        type: Number,

    },
    commentslist: {

        type: Array,
    },

    clicksno: {
        type: Number,
    },
    repostno:{
type:Number
    },
    repostlist:{

        type: Array,
    },

    
    sharesno: {},
    eventname:{},
    eventlocation:{},
    eventdescription:{},
    eventype:{},
    eventstartdate:{},
    eventenddate:{},
    

    pollsoptions:{
        type: Array,
    },
    pollsvotes:{
    
    },
    pollsdeadline:{},
    postype:{},
    




 
networkinfo:{},
    date: {
        type: Date,
        default: Date.now
    },


});

const OrgPosts = mongoose.model('OrgPosts',OrgPostSchema);

module.exports = OrgPosts