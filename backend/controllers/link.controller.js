
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Link = require('../models/Links')
function getlinkcontroller(req,res){
    const {userid,partyid}=req.body;
 
    Link.findOne({
        userid:userid,
        partyid:partyid
    }).then(link=>{
         
        if(link){
            res.status(200).json({link:link.stat,status:true})
        }else{
            newLink = new Link({
                userid:userid,
                partyid:partyid,
              
                stat:false
            })
            newLink.save().then(link=>{

            res.status(200).json({link:false,status:false})})
        }
    })

    
}
function linkcontroller(req,res){
    const {userid,partyid,stat}=req.body;
    console.log(req.body)
    Link.findOneAndUpdate({
        userid:userid,
        partyid:partyid
    },{
        $set:{
            stat:!stat
        }
    }).then(link=>{
        console.log(link)
        if(link){
            res.status(200).json({status:true})
        } 
    })

}
  

module.exports = {getlinkcontroller,linkcontroller}