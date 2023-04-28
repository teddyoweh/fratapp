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
    bio:{
        type:String,
        
    },
    schools:{
        type:Array
    },
    orgs:{
        type:Array
    },
    pinnedorgs:{
        type:Array,
        default:[]
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
        default:'/profileimg/profile.png'
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
    
const User = mongoose.model('User', userSchema);

module.exports = User;