const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

 postid:{},
 userid:{},
    comment:{},
    likelist:{
        type:Array,
    
    },
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Comments = mongoose.model('Comments', CommentSchema);

module.exports =Comments