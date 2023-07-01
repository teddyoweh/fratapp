const Organization = require("../models/Organizations");
const User = require("../models/User");


async function SearchDiscover(req,res){
    const {query,type} = req.body
}

function DiscoverPeople(req, res) {
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

  function DiscoverOrgs(req, res) {
    const { search} = req.body;
    Organization.find({
      $and: [
 
        {
          $or: [
            {org_name: { $regex: search, $options: 'i' } },
            { org_shortname: { $regex: search, $options: 'i' } },
            { org_school: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    })
      .then(orgs => {
        res.json(orgs);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while searching for users.' });
      });
    
  }


module.exports = {
    DiscoverOrgs,DiscoverPeople
  }