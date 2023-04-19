const Posts = require('../models/Posts');

function addcommentscontroller(req, res) {
    console.log(req.body)
        // Views.findOne({ ip: req.body.userdata['ip'] }).then(user => {

    // })
    const mDate = new Date()
    Posts.findByIdAndUpdate(req.body.postid, { $inc: { commentsno: 1 }, $push: { commentslist: [req.body.userid, req.body.comment,mDate] } }, { new: true }).then(post => {

        res.json(post)
    }).catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    })
}

module.exports = addcommentscontroller