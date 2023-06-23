
const User = require('../models/User')
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const Links = require('../models/Links')
function fetchmessagescontroller(req, res) {
  console.log(req.body)

  Message.find({receiver_id: req.body.receiver_id})
    .then(messages => {
      const responseArray = [
       messages.length > 0 ? messages[0].title : null ,
        messages
      ];
      res.json(responseArray);
    })
    .catch(err => {
      console.log(err)
      res.json({ status: false, data: err })
  })

}
 


function sendmessagescontroller(req,res){
    const receiver_id = req.body.receiver_id;
    const sender_id = req.body.sender_id;
    const message = req.body.message.trim();
    const receiver_type = req.body.receiver_type;
    const msg_type = req.body.msg_type;
    const title=req.body.title;
    const sender_username = req.body.sender_username;
    const sender_uimg = req.body.sender_uimg;

    const newMessage = new Message({
        receiver_id: receiver_id,
        sender_id: sender_id,
        content: message,
        receiver_type: receiver_type,
        msg_type: msg_type,
        title:title,
        sender_uimg:sender_uimg,
        sender_username:sender_username
    })
    newMessage.save().then(message=>{
        console.log(message)
        res.json(message)
        
    })
}

async function getSuggested(userid){
  const links = await Links.find({ userid })
      .sort({ date: -1 })  
      .limit(10); 

    return links;

}

async function messageListController(req,res){
  const {user_id} = req.body
  const suggested = await getSuggested(user_id)
  const suggestedUsers = await Promise.all(suggested.map(async (sug) => {
    const user = await User.findById(sug.partyid).select('firstname lastname uimg username isofficial _id');
    return user;
  }));
  
  
 
  res.json(
    {suggested:suggestedUsers})
  
}
function messagesViewedByController(req, res) {
    const { message_id, user_id } = req.body;
  
    Message.findByIdAndUpdate(
      message_id,
      { $addToSet: { viewedby: user_id } },
      { new: true }
    )
      .then(() => {
        res.status(200).json({ message: 'Message viewed by user successfully.' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Unable to update viewedby array.' });
      });
  }
  
// function getSuggested(req,res){
//   const {userid} = req.body;
//   Links.find(
//     { $or: [{ partyid: userid }, { userid: userid }] },
//   )
// }
module.exports ={fetchmessagescontroller,messageListController,sendmessagescontroller,messagesViewedByController}