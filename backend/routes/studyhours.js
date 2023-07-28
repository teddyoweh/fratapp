const express = require('express');
const { createStudyHours } = require('../controllers/studyhours.controller');
const router = express.Router();

 
router.post('/create', (req, res) => { createStudyHours(req, res) })
 



 


module.exports = router