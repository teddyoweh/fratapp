
import React,{useEffect, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,StyleSheet} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, Add, Bezier, Box2, Bubble, Clock} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import { endpoints } from "../config/endpoints";
import axios from "axios";
import * as Animatable from 'react-native-animatable';

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
function RenderFollowInfo({state,followState}){
  
    const textstyle = followState?profilestyles.profilebtntxtu:profilestyles.profilebtntxt
    if(state==null|| state==false){
        return (

      
        <>
        
                                <Text style={[textstyle,{color:followState?"#555":'white'}]}>Join</Text>
            </>
              )
    }
    else if(state=="active"){
        return (
            <>
             
                                <Text style={[textstyle,{color:followState?"#555":'white',fontWeight:'500'}]}>Already a member</Text>
            </>
        )
    }
    else if(state=="pending"){
        return (
            <>
            <Clock variant="Bold" color={followState?"#555":'white'} size={18} style={{
                marginRight:5
            }}/>
             
                                <Text style={[textstyle,{color:followState?"#555":'white',fontWeight:'500'}]}>Pending</Text>
            </>
        )
    }
  

}
export default function JoinActionbtn({userid,orgid,state,action}){
   // alert(JSON.stringify(state))
    const [followState,setFollowState]=useState(state.orgstat)

    async function btnAction(){
        setFollowState(!followState)
        await action()
    }

    async function getLinkStat(){
        await axios.post(endpoints['getlinkstat'],{userid:userid,partyid:partyid})
        .then(function(res){
 
            setFollowState(res.data.link)
            
        })
    }

    async function updateLink(){
        await axios.post(endpoints['manage_org_member'],{userid:userid,orgid:orgid,stat:followState})
        .then(function(res){
 
            setFollowState(!followState)
            
        })
    }
    // useEffect(()=>{
    //         getLinkStat()
    //     }

    // ,[])
    const btnstyle = followState?profilestyles.profilebtnu:profilestyles.profilebtn
    const textstyle = followState?profilestyles.profilebtntxtu:profilestyles.profilebtntxt
    return (
 
             <TouchableOpacity style={[btnstyle,{flexDirection:'row',alignItems:'center',justifyContent:'center'}]} onPress={()=>updateLink()}>
              <RenderFollowInfo state={state.orgstat} followState={followState}/>
            </TouchableOpacity>
         
    )
}



  