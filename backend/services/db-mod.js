const { universities } = require('../data/data');
const Schools = require('../models/Schools');




function ModDB(){
    const fs = require('fs');

    

 

 


    Schools.find().then(schools=>{
        if(schools.length==0){
            Schools.insertMany(universities)
        }
    })
   

}


module.exports = ModDB