const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({

 
    org_name:{
    },
    org_description:{
    },

    org_type:{
    },
    org_logo:{
    },
    org_coverphoto:{
    },
    org_shortname:{

    },
    org_school:{},
    org_positions:{
        type:Array,
    },
    org_teams:{
        type:Array,
    },
    is_verified:{
        default:false,
        type:Boolean
    },
    
 
 createdby:{

 },
 date: {
    type: Date,
    default: Date.now
},
 

});
    
const Organization = mongoose.model('Organizations', OrganizationSchema);

module.exports =Organization;