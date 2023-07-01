const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { messageListController, fetchmessagescontroller, sendmessagescontroller } = require('../controllers/messages.controller');


 
router.post('/msglist',messageListController)
router.post('/fetch',fetchmessagescontroller)
router.post('/send',sendmessagescontroller)

module.exports = router