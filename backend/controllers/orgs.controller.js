const Channels = require('../models/Channels');
const Organizations = require('../models/Organizations')
const OrgMembership = require('../models/OrgMemberships');
const OrgPosts = require('../models/OrgPosts');
const User = require('../models/User')
const crypto = require('crypto');

var fs = require('fs');
function hashcode(data){
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    const hashedData = hash.digest('hex');
    
    return hashedData
     } 
     function hashfilename(filename,email,randomNumberString1){
       
        return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)));
    
     }
function hashfilename(filename,email,randomNumberString1){
     
  return hashcode(hashcode(filename)+hashcode(hashcode(email)+hashcode(randomNumberString1)))+'.jpeg';

}
async function createOrg(req, res) {
    try {
      const { name, description, uid, type, org_school, logo, shortname, positions, teams,primg } = req.body;
      let uimg = '/profileimg/defaultorgimg.png'
      if(primg){
        uimg = '/profileimg/'+ hashfilename(primg.uri,primg.email,primg.random)
   }

      const newOrg = new Organizations({
        org_name: name,
        org_description: description,
        org_type: type,
        org_logo: uimg,
        org_school: org_school,
        org_shortname: shortname,
        org_positions: positions,
        org_teams: ['General',...teams],
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
      ['General',...teams].map(async (team,index)=>{
        const newChannel = new Channels({
          org_id:org.id,
          channel_members:[uid],
          channel_name:team
        })
        await newChannel.save()
      })
      res.status(200).json({
        status: true,
        org: org,
        membership: membership,
      });
    } catch (error) {
      console.log(error,'funkcing error')
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
      const memberUserRoles = memberships.slice(0, 6).map((membership) => membership.role);
      
      const members = await User.find({ _id: { $in: memberUserIds } }).exec();
      const channels = await Channels.find({org_id:org_id})
      const memberDetails = members.map((member, index) => ({
        name: `${member.firstname} ${member.lastname}`,
        userid: member._id,
        uimg: member.uimg,
        role: memberUserRoles[index]
      }));
      
      
      res.status(200).json({
        status: true,
        org: org,
        members: memberDetails,
        channels:channels
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
  
async function addToOrg(req,res){
  const { userids,orgid} = req.body
 
 console.log(req.body)
  const org = await Organizations.findById(orgid);
if (!org) {
  return res.status(404).json({ status: false, error: 'Organization not found.' });
}

const newMemberships = userids.map(userid => ({
  org_id: orgid,
  org_type: org.org_type,
  user_id: userid,
  role: 'member',
  teams: [],
  positions: [],
}));

 await OrgMembership.insertMany(newMemberships).then(memberships=>{



  res.status(200).json({
    status: true,
    memberships: memberships,
  })
}
);
}

async function MakeOrgPost(req,res){

  const newPost = new OrgPosts({
 
  

      
  
    content: req.body.content,
    // imgurls: req.body.imgurls,

    likesno: 0,
    commentsno: 0,
    clicksno: 0,
    orgid:req.body.orgid,
    likesuserlist: [],
    commentuserlist: [],
    isanouncement:req.body.isanouncement,
    isevent:req.body.isevent,
    isjob:req.body.isjob,
    eventgoinglist:[],
    links:req.body.links,
    userid: req.body.userid,
    isrepost: req.body.isrepost,
    repostid: req.body.repostid,
   
    //imgurls:images
    // imgurls:imagedata




});

newPost.save().then(post=>{
  res.status(200).json({
    status: true,
    post: post,
    })
})
}
async function getOrgPost(req, res) {
  const { cursor,userid} = req.body;
  const limit = 40;
  console.log(req.body)


  let query = {
    orgid:req.body.orgid
  };

  if (cursor) {
    query._id = { $lt: cursor };
  }
   
 
  try {
    const posts = await OrgPosts.find(query)

      .limit(limit);

    const userIds = posts.map((post) => post.userid);
    const users = await User.find({ _id: { $in: userIds } });
 
    const usersDict = users.reduce((acc, user) => {
      acc[user._id] = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        uimg: user.uimg,
        userid:user.id,
        isofficial:user.isofficial,
      bio:user.bio,
      pinnedorgs:user.pinnedorgs
      };
      return acc;
    }, {});


  
    res.json({ posts: posts, users: usersDict });

  } catch (err) {
    console.log(err);
    res.json({ status: false, data: err });
  }
}

async function getMyOrgs(req,res){
  const { userId } = req.body;
 
  const orgMemberships = await OrgMembership.find({ user_id: userId });

  const orgIds = orgMemberships.map(membership => membership.org_id);

  const orgDetails = await Organizations.find({ _id: { $in: orgIds } });
 
  res.json(orgDetails);
  
}
async function createCohort(req,res){
 
  const newChannel = new Channels({
  
    org_id:req.body.orgid,
    channel_name:req.body.channel_name,
    channel_members:req.body.channel_members,
    createdby:req.body.createdby,
    channel_logo:req.body.channel_logo,
  })

  await newChannel.save().then(
    resp=>{
      console.log(resp)
      res.json(resp)
    }
  )

}

module.exports =  {
    createOrg,
    getOrgs,
    getOrg,
    addToOrg,
    MakeOrgPost,
    getOrgPost,
    createCohort,
    getMyOrgs
}
