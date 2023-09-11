const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({

 
   event_title:{},
    event_description:{},
    event_location:{},
    event_date:{},
    event_time:{},
    event_logo:{},
    isgoinglist:{
        type:Array,
        default:[]
    },
 
    
 
 createdby:{

 },
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Events = mongoose.model('Events', EventSchema);

module.exports =Events