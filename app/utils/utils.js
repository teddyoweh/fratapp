import { serverip } from "../config/ip";

function isLink(input) {
    const urlRegex = new RegExp(
      '^(https?:\\/\\/)' +  
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +  
      '((\\d{1,3}\\.){3}\\d{1,3}))' +  
      '(\\:\\d+)?' +  
      '(\\/[-a-z\\d%_.~+]*)*' + 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 'i');  
  
    return urlRegex.test(input);
  }

const wrapUIMG= (img)=>{
 
 
  return `${serverip}${img}`
}
function getTimeDifference(date) {
  let date1 =  new Date(date);
  let date2 =  new Date();
  let diff = date2 - date1;
 
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);

  if (years > 0) {
    const word = years==1?'year':'years'
    return years +word
  } else if (months > 0) {
    const word = months==1?'month':'months'
    return months +word
  } else if (weeks > 0) {
    const word = weeks==1?'week':'weeks'
    return weeks +word
  } else if (days > 0) {
    const word = days==1?'day':'days'
    return days + word;
  } else if (hours > 0) {
    const word = hours==1?'hour':'hours'
    return hours + word
  } else if (minutes > 0) {
    const word = minutes==1?'min':'mins'
    return minutes +word
  } else {
    const word = seconds<2?"sec":'secs'
    return seconds+ word
  }
}

const wrapPostImg =(image)=>{
  return `${serverip}/postimg/${image}`
  
}
  export {
    getTimeDifference,
    isLink,
    wrapUIMG,
    wrapPostImg

  }