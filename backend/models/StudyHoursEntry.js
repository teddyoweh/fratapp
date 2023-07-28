const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudyHoursEntrySchema = new Schema({

    user_id:{},
   note:{},
   location:{},
    date:{
        type:Date,
        default:Date.now()
    },
    

});
    
const StudyHoursEntry = mongoose.model('StudyHoursEntry', StudyHoursEntrySchema);

module.exports = StudyHoursEntry;