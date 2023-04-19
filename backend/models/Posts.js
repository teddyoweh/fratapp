// ./models/User.js -t3:16 -e3:16 -d3:16

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Addition of  the Schema for the User model

const PostSchema = new Schema({
    userdata: {},
    isrepost: {
        type: Boolean,
    },

    repostid: {},

    userid:{},
    isverified: {
        type: Boolean,
    },

    content: {
        type: String,
    },
    isanony:{},
    imgurls: {
        type: Array,
    },
    ispublic: {
        type: Boolean,
    },
    isanouncement:{
        type: Boolean,
    },
    isevent:{
        type: Boolean,
    },
    ispinned:{
        type: Boolean,
    },
    ip: {
        type: String,
    },
    likesno: {

        type: Number,
    },
    likesuserlist: {},
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



ispublic:{},
networkinfo:{},
    date: {
        type: Date,
        default: Date.now
    },


});

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts