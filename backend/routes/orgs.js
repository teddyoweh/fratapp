const express = require('express');
const {createOrg,getOrg,getOrgs} = require('../controllers/orgs.controller')
const router = express.Router();

 
router.post('/create', (req, res) => { createOrg(req, res) })
router.post('/getorg', (req, res) => { getOrg(req, res) })
router.post('/getorgs', (req, res) => { getOrgs(req, res) })


 


module.exports = router