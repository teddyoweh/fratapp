const express = require('express');
const { DiscoverPeople, DiscoverOrgs } = require('../controllers/discover.controller');
const router = express.Router();

router.post('/people',DiscoverPeople)
router.post('/orgs',DiscoverOrgs)


module.exports = router