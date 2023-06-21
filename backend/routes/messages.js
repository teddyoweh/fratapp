const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { messageListController } = require('../controllers/messages.controller');


 
router.post('/msglist',messageListController)

module.exports = router