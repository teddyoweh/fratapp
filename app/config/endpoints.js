import { serverip } from "./ip"

const endpoints = {
    'me':`${serverip}/api/auth/me`,
    'login':`${serverip}/api/auth/login`,
    'register':`${serverip}/api/auth/register`,
    'finduser':`${serverip}/api/auth/finduser`,
    'searchuser':`${serverip}/api/auth/searchuser`,
    'checkusername':`${serverip}/api/auth/checkusername`,
    'verify':`${serverip}/api/auth/verify`,
    'editprofile':`${serverip}/api/auth/editprofile`,
    'uploadprofile':`${serverip}/api/auth/uploadprofile`,

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
    'getcommentuser': `${serverip}/api/posts/getcommentuser`,
    'findpost':`${serverip}/api/posts/find`,
    'uploadpost':`${serverip}/api/posts/uploadpost`,
    'fetchlikeusers':`${serverip}/api/posts/fetchlikeusers`,

    //

    'majorslist':`${serverip}/api/discover/fetchmajors`,
    'courselist':`${serverip}/api/discover/fetchcourses`,
    'joincourse':`${serverip}/api/discover/joincourse`,
    'discoverpeople':`${serverip}/api/discover/people`,
    'discoverorgs':`${serverip}/api/discover/orgs`,
    

    'fetchmsglist':`${serverip}/api/messages/msglist`,
    'fetchmsgs':`${serverip}/api/messages/fetch`,
    'sendmsg':`${serverip}/api/messages/send`,
    'viewedby':`${serverip}/api/messages/viewedby`,
    'updateviewed':`${serverip}/api/messages/updateviewed`,
    'getunreadcount':`${serverip}/api/messages/getunreadcount`,

    'search_school':`${serverip}/api/school/search`,

    'addcalendar':`${serverip}/api/calendar/add`,
    'getcalendar':`${serverip}/api/calendar/getcalendar`,
    'getcalendarevents':`${serverip}/api/calendar/getcalendarevents`,

    'createorg':`${serverip}/api/orgs/create`,
    'getorg':`${serverip}/api/orgs/getorg`,
    'getorgs':`${serverip}/api/orgs/getorgs`,
    'add_member':`${serverip}/api/orgs/add_member`,
    'make_org_post':`${serverip}/api/orgs/make_post`,
    'get_org_posts':`${serverip}/api/orgs/get_posts`,
    'create_cohort':`${serverip}/api/orgs/create_cohort`,
    'get_my_orgs':`${serverip}/api/orgs/get_my_org`,
    'manage_follow_org':`${serverip}/api/orgs/manage_follow_org`,
    'get_org_state':`${serverip}/api/orgs/get_org_state`,
    'get_org_profile':`${serverip}/api/orgs/get_org_profile`,
    'manage_org_member':`${serverip}/api/orgs/manage_org_member`,
    'fetchorgs':`${serverip}/api/orgs/fetchorgs`,

    'create_studyhours':`${serverip}/api/studyhours/create`


}

export {endpoints}