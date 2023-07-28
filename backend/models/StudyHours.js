const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudyHoursSchema = new Schema({

 
    startdate:{
        type:Date,
    },
    enddate:{
        type:Date,
    },
    totalhours:{

    },
   
    description:{
        type:String,}
    ,
    acceptedlocations:{
        type:Array
    },
    
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
    
const StudyHours = mongoose.model('StudyHours', StudyHoursSchema);

module.exports = StudyHours;