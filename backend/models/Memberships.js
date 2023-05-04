const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({

 
 group_id:{

 },
 group_type:{

 },
 user_id:{

 },
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Membership = mongoose.model('Membership', MembershipSchema);

module.exports = Membership;