const Calendar = require('../models/Calendar')
const Memberships = require('../models/Memberships')

function newCalendarEvent(req,res){
    const {startdate,enddate,eventname,eventdescription,access,location,eventtype,createdby}=req.body;
    console.log(req.body,'calenderVote')
    newCalendarEvent = new Calendar({
        startdate:startdate,
        enddate:enddate,
        eventname:eventname,
        eventdescription:eventdescription,
        access:access,
        eventlocation:location,
        eventtype:eventtype,
        createdby:createdby
    })
    newCalendarEvent.save().then(event=>{
        res.status(200).json({status:true})
    })

}

function searchforAccess(){
    const {userid,searchterm}=req.body;



    


}

async function getCalendarEvent(req, res) {
    const { userid, date } = req.body;
  
    try {
      const events = await Calendar.find({
        createdby: userid,
        access: userid,  
        $or: [
          { startdate: { $gte: date } },  
          { enddate: { $gte: date } }  
        ]
      });
  
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching calendar events' });
    }
  }

module.exports = {
    newCalendarEvent
}