const Calendar = require('../models/Calendar')
const Memberships = require('../models/Memberships')

function newCalendarEvent(req,res){
    const {startdate,enddate,eventname,eventdescription,access}=req.body;

    newCalendarEvent = new Calendar({
        startdate:startdate,
        enddate:enddate,
        eventname:eventname,
        eventdescription:eventdescription,
        access:access,
    })
    newCalendarEvent.save().then(event=>{
        res.status(200).json({status:true})
    })

}

function searchforAccess(){
    const {userid,searchterm}=req.body;



    


}