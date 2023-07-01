import React,{useContext, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1, Heart} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { AppContext } from "../context/appContext";


export default function LikeBtn({likesno,postid,isLike,setIsLike,setPost}){
    const {user} = useContext(AppContext);
   
    const [likeno,setLikeNo] = useState(likesno)
    async function LikeFunction(){
     await   axios.post(endpoints['likepost'],{
            postid:postid,
            userid:user.userid
        }).then(res=>{
          setPost(res.data)
        })
    }
 
   async function onClick(){
        setIsLike(!isLike);
await LikeFunction()
    }
    return(
        <TouchableOpacity  style={homestyles.insightbtn} onPress={()=>onClick()}>
            <Heart color={isLike?"#FF0000":"#333"} size={24} variant={isLike?"Bulk":"Linear"}
          
            />
         
        </TouchableOpacity> 
    )
}