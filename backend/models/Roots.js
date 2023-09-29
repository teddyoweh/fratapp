const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RootSchema = new Schema({

 
    rootname:{
        type: String,
    },
    roottype:{
        type: String,
    },
    partyid:{
        type: String,
    },
    orgid:{
        type: String,
    
    },
    userid:{
        type: String,
    
    },
    
 
    date: {
        type: Date,
        default: Date.now
    },
  

});
    
const Roots = mongoose.model('Roots', RootSchema);

module.exports = Roots;