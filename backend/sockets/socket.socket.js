const OrgPosts = require("../models/OrgPosts");
function socketStream(){


streamOrgPosts = OrgPosts.watch();

streamOrgPosts.on('change',next=>{
console.log(next,'its next')
})}


module.exports = {
    socketStream
}