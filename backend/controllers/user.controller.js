const User = require('../models/User');
const UserActivity = require('../models/UserActivity');



function searchUser(req, res) {
    const { search,userid } = req.body;
    User.find({
      $and: [
        { _id: { $ne: userid } },
        {
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { firstname: { $regex: search, $options: 'i' } },
            { lastname: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    })
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while searching for users.' });
      });
    
  }
function getUserActivity(req,res){
  const {userid} = req.body
  UserActivity.find({user_id:userid}).then((activity)=>{
    res.json(activity)
  })
 
}


function updateUserActivity(req,res){
  
}
  module.exports = {
    searchUser
  }