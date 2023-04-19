const Posts = require('../models/Posts');

function fetchcommentscontroller(req, res) {
    console.log(req.body)
        // Views.findOne({ ip: req.body.userdata['ip'] }).then(user => {

    // })
    Posts.findById(req.body.postid).then(posts => {

        res.json(posts.commentslist)
    }).catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    })
}

module.exports = fetchcommentscontroller