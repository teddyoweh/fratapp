const Posts = require('../models/Posts');

function likepostscontroller(req, res) {
    console.log(req.body)
        // Views.findOne({ ip: req.body.userdata['ip'] }).then(user => {

    // })
    // update the likesno and likesuserlist of post
    if (req.body.stat == 'like') {
        Posts.findByIdAndUpdate(req.body.postid, { $inc: { likesno: 1 }, $push: { likesuserlist: req.body.userid } }, { new: true }).then(post => {
            // Posts.findByIdAndUpdate({ _id: req.postid }, { $inc: { likesno: 1 }, $push: { likesuserlist: req.userid } }).then(post => {
            console.log('daae')
            res.json(post)
        }).catch(err => {
            console.log(err)
            res.json({ status: false, data: err })
        })
    } else {
        Posts.findByIdAndUpdate(req.body.postid, { $inc: { likesno: -1 }, $pull: { likesuserlist: req.body.userid } }, { new: true }).then(post => {
            // Posts.findByIdAndUpdate({ _id: req.postid }, { $inc: { likesno: 1 }, $push: { likesuserlist: req.userid } }).then(post => {
            console.log('daae')
            res.json(post)

        }).catch(err => {
            console.log(err)
            res.json({ status: false, data: err })
        })
    }
}

module.exports = likepostscontroller;