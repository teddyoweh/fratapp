const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {linkcontroller,getlinkcontroller} = require('../controllers/link.controller')
 
router.post('/link',linkcontroller)
router.post('/stat',getlinkcontroller)

module.exports = router