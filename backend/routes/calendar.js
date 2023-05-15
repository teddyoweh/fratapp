const express = require('express');
const router = express.Router();
const {newCalendarEvent,getCalendar,getCalendarEvent} = require('../controllers/calendar.controller')
 
router.post('/add', (req, res) => { newCalendarEvent(req, res) })
router.post('/getcalendar', (req, res) => { getCalendar(req, res) })
router.post('/getcalendarevents', (req, res) => { getCalendarEvent(req, res) })
//router.post('/fetchmajors', (req, res) => { fetchmajorcontroller(req, res) })
//router.post('/joincourse', (req, res) => { joincoursecontroller(req, res) })
 


module.exports = router