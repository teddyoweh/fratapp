
import React,{useEffect, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,StyleSheet} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import { endpoints } from "../config/endpoints";
import axios from "axios";
 
import * as Animatable from 'react-native-animatable';
import { RefreshControl } from "react-native-gesture-handler";

const LoadingSkeleton = () => {
    return (
      <Animatable.View
        animation="fadeIn"
     
        duration={800}
        style={[styles.loadingBtn, styles.loadingBtnSkeleton]}
      >
        <Animatable.View animation="fadeIn" duration={800} style={styles.loadingBubble} />
        <Animatable.View animation="fadeIn" duration={800} style={styles.loadingText} />
      </Animatable.View>
    );
  };
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
        followState!=null?
             <TouchableOpacity style={followState?profilestyles.profilebtnu:profilestyles.profilebtn} onPress={()=>updateLink()}>
                                <Text style={followState?profilestyles.profilebtntxtu:profilestyles.profilebtntxt}>{followState?"Linked":"Link"}</Text>
            </TouchableOpacity>:
            <LoadingSkeleton/>
    )
}
const styles = StyleSheet.create({
    loadingBtn: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 30,
      width: '84%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingBtnSkeleton: {
      backgroundColor: '#222',
    },
    loadingBubble: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#333',
      marginRight: 5,
    },
    loadingText: {
      flex: 1,
      height: 19,
      borderRadius: 34,
      backgroundColor: '#333',
    },
  });
  