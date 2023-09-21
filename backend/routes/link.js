const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {linkcontroller,getlinkcontroller, updateLinkStatus} = require('../controllers/link.controller')
 
router.post('/link',linkcontroller)
router.post('/stat',getlinkcontroller)
router.post('/update',updateLinkStatus)

module.exports = router