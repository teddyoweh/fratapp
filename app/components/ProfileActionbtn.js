
import React,{useEffect, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import { endpoints } from "../config/endpoints";
import axios from "axios";
export default function ProfileActionbtn({userid,partyid}){
    const [followState,setFollowState]=useState(null)

    function btnAction(){
        setFollowState(!followState)
    }

    async function getLinkStat(){
        await axios.post(endpoints['getlinkstat'],{userid:userid,partyid:partyid})
        .then(function(res){
 
            setFollowState(res.data.link)
            
        })
    }

    async function updateLink(){
        await axios.post(endpoints['updatelink'],{userid:userid,partyid:partyid,stat:followState})
        .then(function(res){
 
            setFollowState(!followState)
            
        })
    }
    useEffect(()=>{
            getLinkStat()
        }

    ,[])
    return (
        followState!=null&&
             <TouchableOpacity style={followState?profilestyles.profilebtnu:profilestyles.profilebtn} onPress={()=>updateLink()}>
                                <Text style={followState?profilestyles.profilebtntxtu:profilestyles.profilebtntxt}>{followState?"Linked":"Link"}</Text>
            </TouchableOpacity>
    )
}