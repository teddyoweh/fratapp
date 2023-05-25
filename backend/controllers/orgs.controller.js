const Organizations = require('../models/Organizations')
const OrgMembership = require('../models/OrgMemberships')
const User = require('../models/User')
async function createOrg(req, res) {
    try {
      const { name, description, uid, type, org_school, logo, shortname, positions, teams } = req.body;
      console.log('create org', req.body);
  
      const newOrg = new Organizations({
        org_name: name,
        org_description: description,
        org_type: type,
        org_logo: logo,
        org_school: org_school,
        org_shortname: shortname,
        org_positions: positions,
        org_teams: teams,
        createdby: uid,
      });
  
      const org = await newOrg.save();
  
      const newOrgMembership = new OrgMembership({
        org_id: org.id,
        org_type: type,
        user_id: uid,
        role: 'admin',
        teams: [],
        positions: [],
      });
  
      const membership = await newOrgMembership.save();
  
      res.status(201).json({
        status: true,
        org: org,
        membership: membership,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
  


  async function getOrgs(req, res) {
    try {
      const { user_id } = req.body;
        
      const orgMemberships = await OrgMembership.find({ user_id }).sort({ date: -1 }).exec();
  
      const orgs = await Promise.all(
        orgMemberships.map(async (membership) => {
          const org = await Organizations.findById(membership.org_id);
          return {
            org: org,
            membership: membership,
          };
        })
      );
        console.log(user_id)
        
      res.status(200).json({
        status: true,
        orgs: orgs,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
  

  async function getOrg(req, res) {
    try {
      const { org_id } = req.body;
  
      const org = await Organizations.findById(org_id).exec();
      const memberships = await OrgMembership.find({ org_id }).exec();
  
      const memberUserIds = memberships.slice(0, 6).map((membership) => membership.user_id);
  
      const members = await User.find({ _id: { $in: memberUserIds } }).exec();
  
      const memberDetails = members.map((member) => ({
        name: `${member.firstname} ${member.lastname}`,
        userid: member._id,
        uimg: member.uimg,
      }));
  
      res.status(200).json({
        status: true,
        org: org,
        members: memberDetails,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
  
  
module.exports =  {
    createOrg,
    getOrgs,
    getOrg
}
