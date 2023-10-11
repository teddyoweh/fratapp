const Links = require("../models/Links");
const Organization = require("../models/Organizations");
const User = require("../models/User");


async function SearchDiscover(req,res){
    const {query,type} = req.body
}

async function DiscoverPeople(req, res) {
  const { search, userid } = req.body;

  try {
    // Fetch users you've blocked
    const blockedUsers = await Links.find({ userid: userid, stat: "blocked" }).distinct('partyid');
    
    // Fetch users who have blocked you
    const usersWhoBlockedYou = await Links.find({ partyid: userid, stat: "blocked" }).distinct('userid');

    // Combine both lists
    const allBlockedUsers = [...new Set([...blockedUsers, ...usersWhoBlockedYou])];

    // Search for users excluding yourself and all blocked users
    const users = await User.find({
      $and: [
        { _id: { $ne: userid, $nin: allBlockedUsers } },
        {
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { firstname: { $regex: search, $options: 'i' } },
            { lastname: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
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