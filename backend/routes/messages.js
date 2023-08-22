const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { messageListController, fetchmessagescontroller, sendmessagescontroller,updateMessageViewed, getUnreadCount } = require('../controllers/messages.controller');


 
router.post('/msglist',messageListController)
router.post('/fetch',fetchmessagescontroller)
router.post('/send',sendmessagescontroller)
router.post('/updateviewed',updateMessageViewed)
router.post('/getunreadcount',getUnreadCount)

module.exports = router