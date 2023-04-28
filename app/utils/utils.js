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

  export {
    isLink,
    wrapUIMG
  }