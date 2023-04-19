import { serverip } from "../config/ip";
import { endpoints } from "../config/endpoints";
import axios from "axios";

function RegisterAction(firstname,lastname,username,email,password,navigation){
axios.post(endpoints['register'],{firstname:firstname,lastname:lastname,username:username,email:email,password:password}).then((res)=>{

})


}
function LoginAction(email,password,navigation){

}

export {RegisterAction}