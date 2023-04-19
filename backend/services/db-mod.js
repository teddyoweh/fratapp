


function ModDB(){
    const fs = require('fs');

    const course_data = JSON.parse(fs.readFileSync('data/courses_data.json'));

 

    const major_data =  JSON.parse(fs.readFileSync('data/majors.json'));


    Majors.find().then(majors=>{
        if(majors.length==0){
            Majors.insertMany(major_data)
        }
    })
    Course.find().then(courses=>{
        if(courses.length==0){
            Course.insertMany(course_data)
        }
    })

}


module.exports = ModDB