
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Link = require('../models/Links');
const { makeNotification } = require('./notifications.controller');
const Links = require('../models/Links');
const Notifications = require('../models/Notifications');
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
              
                stat:false,
                type:'Link Pending'
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
            stat:!stat,
            type:!stat==false?'Link':'Link Pending'
        }
    }).then(link=>{
        console.log(link)
        if(!stat){
            makeNotification(partyid,'link',userid,'linked with you','user')
        }
         if(link){
            res.status(200).json({status:true})
        } 
    })

}
function updateLinkStatus(req,res){
    const {notif_id,stat}=req.body;
    Links.updateOne().then(resp=>{
        Notifications.findOneAndUpdate({ _id: notif_id }, { orginvite_stat: "Accepted",notification_read:true }).then()
        res.json(resp)
    })
}

module.exports = {getlinkcontroller,linkcontroller,updateLinkStatus}