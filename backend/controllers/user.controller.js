const User = require('../models/User')



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

  module.exports = {
    searchUser
  }