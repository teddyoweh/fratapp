
const User = require('../models/User')
const Membership = require('../models/Memberships')
const Message = require('../models/Message')
const Links = require('../models/Links')
function fetchmessagescontroller(req, res) {
 

  Message.find({
    $or: [
      { sender_id: req.body.receiver_id },
      { receiver_id: req.body.receiver_id }
    ]
  })
    .then(messages => {
   
      res.json(messages);
    })
    .catch(err => {
      console.log(err);
      res.json({ status: false, data: err });
    });
  

}
 


async function sendmessagescontroller(req,res){
   const newMessage = new Message({
      sender_id:req.body.user_id,
      receiver_id:req.body.receiver_id,
      content:req.body.text,
      msg_type:req.body.msg_type,
      receiver_type:req.body.receiver_type

    })
     const mes =  await newMessage.save()
 
     res.json(mes)
}

async function getSuggested(userid){
  const links = await Links.find({userid})
      .sort({ date: -1 })  
      .limit(10); 

    return links;

}
 
async function getContactList(userId) {
  const messages = await Message.find({
  $or: [{ sender_id: userId }, { receiver_id: userId }]
  }).sort({ date: -1 });
  
  const latestMessages = [];
  const processedUsers = [];
  
  for (let i = 0; i < messages.length; i++) {
  const message = messages[i];
  const counterpartId = message.sender_id === userId ? message.receiver_id : message.sender_id;
  if (!processedUsers.includes(counterpartId)) {
    const userInfo = await User.findById(counterpartId);
    const { firstname, lastname, isofficial, uimg, username } = userInfo;
  
    latestMessages.push({
      ...message.toObject(),
      user_info: {
        _id: userInfo._id,
        firstname,
        lastname,
        isofficial,
        uimg,
        username
      }
    });
  
    processedUsers.push(counterpartId);
  }
  }
  return latestMessages;

}  
async function messageListController(req,res){
  const {user_id} = req.body
    const contactLict = await getContactList(user_id)
  const suggested = await getSuggested(user_id)

  const suggestedUsers = await Promise.all(suggested.map(async (sug) => {
    const user = await User.findById(sug.partyid).select('firstname lastname uimg username isofficial _id');
    return user;
  }));
  
 
  res.json(
    {suggested:suggestedUsers,contacts:contactLict})
  
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
   
 
  
 
  
module.exports ={fetchmessagescontroller,messageListController,sendmessagescontroller,messagesViewedByController}