const express = require('express');
const { searchSchools } = require('../controllers/schools.controller');
const router = express.Router();

 
router.post('/search', (req, res) => { searchSchools(req, res) })
 






 


module.exports = router