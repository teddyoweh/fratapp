import React,{useState,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, MessageText, DirectInbox} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "./PostsList";
import ProfileActionbtn from "./ProfileActionbtn";
import { AppContext } from "../context/appContext";
import ProfilePosts from "./ProfilePosts";
import { wrapUIMG } from "../utils/utils";
import { color_scheme } from "../config/color_scheme";
import * as Haptics from 'expo-haptics'
import JoinActionbtn from "./JoinActionbtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
export default function FollowingOrgBtn({navigation,route,orgid,state,action}){
    const {user,colorMode} = useContext(AppContext)
    
    const [isFollowing,setIsFollowing]=useState(state.orglink)
    async function mangageFollowOrg(){
        await axios.post(endpoints['manage_follow_org'],{
            userid:user.userid,
            orgid:orgid
        }) 
    }

 
async function followAction(){
    setIsFollowing(!isFollowing)
    mangageFollowOrg()
    await action()
}
return (


    <TouchableOpacity style={profilestyles.profilemsgbtn}
                            
    onPress={()=>{
        Haptics.impactAsync('medium')
        followAction()
    }}
    >
        {
            isFollowing?
            <AntDesign name="check" size={24} color="#777" />
            :
            <Text
            style={{
                fontSize:25
            }}
            >
            👀
            </Text>
        }
    
    </TouchableOpacity>

)
}