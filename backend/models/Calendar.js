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
        type:String,
    },
    eventtype:{},
    
    access:{
        type:Array,
    },
    createdat:{
        type:Date
    },
    createdby:{
        type:String
    }

});
    
const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;