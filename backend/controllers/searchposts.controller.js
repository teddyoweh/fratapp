const Posts = require('../models/Posts');
function searchData(data, word) {
    const results = [];
    for (const entry of data) {
      if (entry.content.toLowerCase().includes(word.toLowerCase())) {
        results.push(entry);
      }
    }
    return results;
  }
  //||entry.commentslist[1].includes(word)
function searchpostscontroller(req, res) {
    console.log(req.body)
        // Views.findOne({ ip: req.body.userdata['ip'] }).then(user => {

    // })
    Posts.find({ ispublic: true, }).then(posts => {

        res.json([searchData(posts,req.body.search),posts])
    }).catch(err => {
        console.log(err)
        res.json({ status: false, data: err })
    })
}

module.exports = searchpostscontroller