const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstname: {
        type: String,
     
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    email: {
        type: String,
        required: true,
 
 
        minlength: 3
    },
    isverified: {
        type: Boolean,
        default: false
    },
    isofficial: {
        type: Boolean,
        default: false
    },
    password:{
        type: String,
    },
     

    uimg:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isfirsttime:{
        type:Boolean,
    }
    
    

});
    
const User = mongoose.model('User', userSchema);

module.exports = User;