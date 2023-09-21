const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getNotifications } = require('../controllers/notifications.controller');

 
router.post('/fetch',getNotifications)
 

module.exports = router