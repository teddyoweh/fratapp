const StudyHours = require("../models/StudyHours");
const StudyHoursEntry = require("../models/StudyHoursEntry");

async function createStudyHours(req,res){
    console.log(req)
    const {startdate,enddate,acceptedlocations,description,access,createdby} = req.body

    console.log(req.body)
    const newStudy = new StudyHours({
        startdate:startdate,
        enddate:enddate,
        acceptedlocations:acceptedlocations,
        description:description,
        access:access,
        createdby:createdby
    })   

    await newStudy.save().then(rs=>{
        res.json({rs})
    })


}

module.exports = {createStudyHours}