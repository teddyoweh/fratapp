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
  console.log(req.body)
  try {
    const events = await Calendar.find({
      createdby: userid,
      access: userid,
      $or: [
        { startdate: { $gte: date } },
        { enddate: { $gte: date } }
      ]
    }).sort({ startdate: 1 }); // Sort by startdate in ascending order
    console.log(events)
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching calendar events' });
  }
}
  async function getCalendar(req, res) {
    const { userid } = req.body;
  
    try {
      const events = await Calendar.find({
        createdby: userid,
        access: userid,
      });
  
      const calendardata = {};
  
      events.forEach(event => {
        const startDate = new Date(event.startdate);
        const endDate = new Date(event.enddate);
        const startMonth = startDate.toLocaleString('default', { month: 'long' });
        const startDay = startDate.getDate().toString();
        const endMonth = endDate.toLocaleString('default', { month: 'long' });
        const endDay = endDate.getDate().toString();
      
        if (!calendardata[startMonth]) {
          calendardata[startMonth] = {};
        }
      
        if (!calendardata[startMonth][startDay]) {
          calendardata[startMonth][startDay] = { no_events: 0, no_starts: 0, no_ends: 0 };
        }
      
        calendardata[startMonth][startDay].no_events++;
        calendardata[startMonth][startDay].no_starts += event.startdate ? 1 : 0;
 
      
        if (startMonth !== endMonth || startDay !== endDay) {
          if (!calendardata[endMonth]) {
            calendardata[endMonth] = {};
          }
      
          if (!calendardata[endMonth][endDay]) {
            calendardata[endMonth][endDay] = { no_events: 0, no_starts: 0, no_ends: 0 };
          }
      
          calendardata[endMonth][endDay].no_events++;
          calendardata[endMonth][endDay].no_ends += event.enddate ? 1 : 0;
        }
      });
      
  
 
      const allMonths = new Set(events.map(event => new Date(event.startdate).toLocaleString('default', { month: 'long' })));
      Array.from(allMonths).forEach(month => {
        if (!calendardata[month]) {
          calendardata[month] = {};
        }
      });
 
      res.status(200).json(calendardata);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching calendar events' });
    }
  }
  
  
module.exports = {
    newCalendarEvent,
    getCalendar,
    getCalendarEvent
}