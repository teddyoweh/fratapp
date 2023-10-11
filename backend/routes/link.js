const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {linkcontroller,getlinkcontroller, updateLinkStatus, blockLink} = require('../controllers/link.controller')
 
router.post('/link',linkcontroller)
router.post('/stat',getlinkcontroller)
router.post('/update',updateLinkStatus)
router.post('/block',blockLink)

module.exports = router