import { serverip } from "./ip"

const endpoints = {
    'me':`${serverip}/api/auth/me`,
    'login':`${serverip}/api/auth/login`,
    'register':`${serverip}/api/auth/register`,
    'finduser':`${serverip}/api/auth/finduser`,
    'checkusername':`${serverip}/api/auth/checkusername`,
    'verify':`${serverip}/api/auth/verify`,
    'editprofile':`${serverip}/api/auth/editprofile`,

    'getlinkstat':`${serverip}/api/link/stat`,
    'updatelink':`${serverip}/api/link/link`,
    'makepost':`${serverip}/api/posts/add`,
    'getposts':`${serverip}/api/posts/fetch`,
    'fetchmyposts':`${serverip}/api/posts/fetchmyposts`,
    'fetchhotposts':`${serverip}/api/posts/fetchhot`,
    'fetchannouncement':`${serverip}/api/posts/fetchannouncements`,
    'fetchpinned':`${serverip}/api/posts/fetchpinned`,
    'fetchevents':`${serverip}/api/posts/fetchevents`,
    'newsfeed':`${serverip}/api/posts/newsfeed`,
    'getpost':`${serverip}/api/posts/getonepost`,
    'likepost':`${serverip}/api/posts/like`,
    'addcomment':`${serverip}/api/posts/addcomment`,
    'findpost':`${serverip}/api/posts/find`,
    'upload':`${serverip}/api/posts/upload`,
    //

    'majorslist':`${serverip}/api/discover/fetchmajors`,
    'courselist':`${serverip}/api/discover/fetchcourses`,
    'joincourse':`${serverip}/api/discover/joincourse`,

    'fetchmsglist':`${serverip}/api/messages/fetchmsglist`,
    'fetchmsgs':`${serverip}/api/messages/fetchmsgs`,
    'sendmsg':`${serverip}/api/messages/sendmsg`,
    'viewedby':`${serverip}/api/messages/viewedby`,

    'addcalendar':`${serverip}/api/calendar/add`
}

export {endpoints}