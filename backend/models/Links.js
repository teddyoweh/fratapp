const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinksSchema = new Schema({

 
    userid:{
        type: String,
    },
    partyid:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    stat:{
 
    }

});
    
const Links = mongoose.model('Links', LinksSchema);

module.exports = Links;