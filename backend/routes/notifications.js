const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getNotifications, getUnreadNotificationCount } = require('../controllers/notifications.controller');

 
router.post('/fetch',getNotifications)
router.post('/count_unread',getUnreadNotificationCount)
 

module.exports = router