const Notifications = require("../models/Notifications");
const Organization = require("../models/Organizations");
const User = require("../models/User");
function makeNotification(owner_id,notification_type,party_id,notification_text,party_type){
    const notification = new Notifications({
        owner_id,
        notification_type,
        party_id,
       
        notification_text,
        party_type,
        notification_read:false
    })
    notification.save()
}
 
async function getNotifications(req, res) {
  try {
    const notifications = await Notifications.find({ owner_id: req.body.userid }).exec();

    const orgIds = [];
    const userIds = [];

    notifications.forEach((notification) => {
      if (notification.party_type === 'org') {
        orgIds.push(notification.party_id);
      } else if (notification.party_type === 'user') {
        userIds.push(notification.party_id);
      }
    });

    const [orgDetails, userDetails] = await Promise.all([
      Organization.find({ _id: { $in: orgIds } }).exec(),
      User.find({ _id: { $in: userIds } }).exec(),
    ]);

    const orgDetailsMap = orgDetails.reduce((map, org) => {
      map[org._id.toString()] = org;
      return map;
    }, {});

    const userDetailsMap = userDetails.reduce((map, user) => {
      map[user._id.toString()] = user;
      return map;
    }, {});

    const notificationsWithDetails = notifications.map((notification) => {
      if (notification.party_type === 'org') {
        return {
          ...notification.toObject(),
          org_details: orgDetailsMap[notification.party_id.toString()],
        };
      } else if (notification.party_type === 'user') {
        return {
          ...notification.toObject(),
          user_details: userDetailsMap[notification.party_id.toString()],
        };
      }
    });

    res.json({
      notifications: notificationsWithDetails.reverse(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUnreadNotificationCount(req,res){
    const count = await Notifications.countDocuments({owner_id:req.body.userid,notification_read:false})
    res.json(count)
}
module.exports = {
    getNotifications,
    makeNotification,
    getUnreadNotificationCount
}