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
function formatMsgDate(dateParam) {
  const currentDate = new Date();
  const inputDate = new Date(dateParam);

  const differenceInMs = currentDate.getTime() - inputDate.getTime();
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    const timeOptions = {hour: "2-digit", minute: "2-digit"};
    return inputDate.toLocaleTimeString("en-US", timeOptions);
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else if (differenceInDays > 1 && differenceInDays < 365) {
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  } else if (differenceInDays >= 365) {
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    return `${month}/${year}`;
  }
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
function removeExcessWhitespace(text) {
 
  let trimmedText = text.trim();

 
  let formattedText = trimmedText.replace(/([^\s])\s{2,}([^\s])/g, "$1 $2");

  return formattedText;
}
function formatTime(date1) {
  const date = new Date(date1)
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  let meridiem = 'AM';
  if (hours >= 12) {
    meridiem = 'PM';
    if (hours > 12) {
      formattedHours = (hours - 12).toString().padStart(2, '0');
    }
  }

  return `${formattedHours}:${formattedMinutes} ${meridiem}`;
}
function calculatePostDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8;  

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;  

  return  Math.round(distance);
} 
  export {
    getTimeDifference,
    isLink,
    wrapUIMG,
    wrapPostImg,
    formatMsgDate,
    removeExcessWhitespace,
    formatTime,
    calculatePostDistance

  }