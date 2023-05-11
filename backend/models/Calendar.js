const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({

 
    startdate:{
        type:Date,
    },
    enddate:{
        type:Date,
    }
    ,
    eventname:{
        type:String,
    },
    eventdescription:{
        type:String,}
    ,
    eventlocation:{
 
    },
    eventtype:{},
    
    access:{
        type:Array,
    },
    createdat:{
        type:Date,
        default:Date.now()
    },
    createdby:{
        type:String
    }

});
    
const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;