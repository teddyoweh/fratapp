const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolsSchema = new Schema({

    
    name:{
        type:String
    },
    shortname:{

    },
    location:{

    },
    address:{},
   

    logo:{
        type:String,
      
    },
    date: {
        type: Date,
        default: Date.now
    },
    isfirsttime:{
        type:Boolean,
        default:true
    }
    
    

});
    
const Schools = mongoose.model('Schools', SchoolsSchema);

module.exports = Schools;