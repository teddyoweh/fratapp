const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodesSchema = new Schema({

 
    email: {
        type: String,
        required: true,
 
 
        minlength: 3
    },
    isverified: {
        type: Boolean,
        default: false
    },
 
    date: {
        type: Date,
        default: Date.now
    },
   code:{
        type: String,
    }

});
    
const Codes = mongoose.model('Codes', CodesSchema);

module.exports = Codes;