const express = require('express');
const {createOrg,getOrg,getOrgs,addToOrg,MakeOrgPost,getOrgPost, createCohort, getMyOrgs, manageFollowOrg, getOrgStat,getOrgProfile,manageOrgMember, fetchOrgs} = require('../controllers/orgs.controller')
const router = express.Router();

 
router.post('/create', (req, res) => { createOrg(req, res) })
router.post('/getorg', (req, res) => { getOrg(req, res) })
router.post('/getorgs', (req, res) => { getOrgs(req, res) })
router.post('/get_my_org', (req, res) => { getMyOrgs(req, res) })
router.post('/add_member',(req,res)=>{addToOrg(req,res)})
router.post('/make_post',(req,res)=>{MakeOrgPost(req,res)})
router.post('/get_posts',(req,res)=>{getOrgPost(req,res)})
router.post('/get_org_state',(req,res)=>{getOrgStat(req,res)})
router.post('/manage_follow_org',(req,res)=>{manageFollowOrg(req,res)})
router.post('/create_cohort',(req,res)=>{    createCohort(req,res)})
router.post('/get_org_profile',(req,res)=>{getOrgProfile(req,res)})
router.post('/manage_org_member',(req,res)=>{manageOrgMember(req,res)})
router.post('/fetchorgs',(req,res)=>{fetchOrgs(req,res)})






 


module.exports = router