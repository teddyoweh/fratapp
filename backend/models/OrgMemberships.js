const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgMembershipSchema = new Schema({

 
 org_id:{

 },
org_type:{

},
user_id:{

},

role:{
    type:String,
},
teams:{
    type:Array,
},
positions:{
    type:Array,
},
date: {
    type: Date,
    default: Date.now
},
 

});
    
const OrgMembership = mongoose.model('OrgMembership', OrgMembershipSchema);

module.exports = OrgMembership;