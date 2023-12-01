const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Link = require('../models/Links');
const Organization = require('../models/Organizations');
 
async function mecontroller(req, res) {
    const { token } = req.body;

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.user.userid);

        if (user) {
            const rex = await Organization.findById(user.pinnedorg);
            payload.user = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                uimg: user.uimg,
                userid: user._id,
                bio: user.bio,
                pinnedorg: user.pinnedorg,
                pinnedorgdetail: rex,
                isofficial: user.isofficial,
                email: user.email
            };

            res.status(200).json({ user: payload.user, token, status: true });
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

 

module.exports = mecontroller;