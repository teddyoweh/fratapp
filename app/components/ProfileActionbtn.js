
import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
export default function ProfileActionbtn(){
    const [followState,setFollowState]=useState(false)

    function btnAction(){
        setFollowState(!followState)
    }
    return (
             <TouchableOpacity style={followState?profilestyles.profilebtnu:profilestyles.profilebtn} onPress={()=>btnAction()}>
                                <Text style={followState?profilestyles.profilebtntxtu:profilestyles.profilebtntxt}>{followState?"Linked":"Link"}</Text>
            </TouchableOpacity>
    )
}