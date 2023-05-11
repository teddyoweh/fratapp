const User = require('../models/User')


function editprofilecontroller(req,res){
    const {firstname,lastname,username,dob,pinnedorgs,bio,uid} = req.body
    console.log('edit/profile',req.body)
    User.findByIdAndUpdate(
        uid,
        {
            firstname:firstname,
            lastname:firstname,
            username:username,
            dob:dob,
           
            bio:bio
        },
        {new: true, useFindAndModify: false},
        (err, updatedUser) => {
            if(err){
                console.log('e no work')
                res.status(500).send({message: 'Error updating user profile.'});
            } else {
                res.status(200).send(updatedUser);
            }
        }
    );
}


module.exports = {
    editprofilecontroller}