const express = require('express');
const {createOrg,getOrg,getOrgs,addToOrg,MakeOrgPost,getOrgPost} = require('../controllers/orgs.controller')
const router = express.Router();

 
router.post('/create', (req, res) => { createOrg(req, res) })
router.post('/getorg', (req, res) => { getOrg(req, res) })
router.post('/getorgs', (req, res) => { getOrgs(req, res) })
router.post('/add_member',(req,res)=>{addToOrg(req,res)})
router.post('/make_post',(req,res)=>{MakeOrgPost(req,res)})
router.post('/get_posts',(req,res)=>{getOrgPost(req,res)})



 


module.exports = router