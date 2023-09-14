const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const UserActivitySchema = new Schema({

 
status:{},
user_id:{},
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const UserActivity = mongoose.model('UserActivity', UserActivitySchema);

module.exports = UserActivity;