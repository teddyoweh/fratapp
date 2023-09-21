const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotifcationSchema = new Schema({

 
 owner_id:{

 },
notification_type:{

 },
party_id:{
},
notification_text:{},
notification_read:{
    type: Boolean,
},
orginvite_stat:{

},
party_type:{},
 date: {
    type: Date,
    default: Date.now
},
 

})
    
const Notifications = mongoose.model('Notifications', NotifcationSchema);

module.exports = Notifications;