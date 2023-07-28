
import { View,Text, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, UserAdd, CalendarAdd, ArchiveBook, InfoCircle, More2, NoteAdd} from 'iconsax-react-native';
import { FontAwesome5,Feather, Ionicons,AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import { useContext, useEffect,useRef, useState,useCallback, useLayoutEffect } from "react";
import { AppContext } from "../../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import Spinner from '../../../../components/Spinner'
import { makeeventstyles } from "../../Calendar/MakeEvent";
import { wrapUIMG } from "../../../../utils/utils";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { getTimeDifference } from "../../../../utils/utils";
import { color_scheme } from "../../../../config/color_scheme";
import CircleProgress from "../../../../components/CIrcleProgress";
import * as Haptics from 'expo-haptics';
import { useHashMap } from "../../../../hooks/useHashMap";


function RenderDate({setDate,date}){
    return (
        <>
        </>
    )
}
export default function CreateStudyHours({navigation,route}){
    
    const {user,colorMode} = useContext(AppContext)
    const {orgid,orgdt,orgdata} = route.params
    const [users2, addToHashMap, removeFromHashMap] = useHashMap();
    const [access,setAcceess] = useState([])
    const [startdate,setStartDate] = useState('')
    const [enddate,setEndDate] = useState('')
    const [description,setDescription] =useState('')
    const [acceptedlocations,setAcceptedLocations] = useState([])
    async function makeStudyHours(){
        Haptics.impactAsync('medium')
        await axios.post(endpoints['create_studyhours'],{
          startdate,
          enddate  ,
          acceptedlocations,
          description,
          access,
          createdby:user.userid

        }).then()
    }
    return (
        <View
        style={{
            backgroundColor:color_scheme(colorMode,'white'),
            flex:1
        }}
        >
             
             <View
            style={{
                paddingHorizontal:10,
                paddingVertical:6
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >

       
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
                </TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                alignItems:"center",
                paddingHorizontal:10
            }}
            >
                <Image
                source={{uri:wrapUIMG(orgdt.uimg)}}
                style={{
                height:40,
                width:40,
                borderRadius:100,
                marginRight:5
                }}
                />
                <Text
                style={{
                    color:color_scheme(colorMode,'black'),
                    fontSize:18,
                    fontWeight:'600'
                }}
                >
                    {orgdt.name}
                </Text>
            </View>
                </View>
            </View>
            <ScrollView
            contentContainerStyle={{
                paddingHorizontal:10,
                paddingVertical:20
            }}
            >

            <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Start Date</Text>
                            <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Start Datee"    />
                        </View>

                     
            <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>End Date</Text>
                            <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="End Date"  />
                        </View>
                        <View style={makeeventstyles.formgrp
                        }>

                            
                             
<Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Members</Text>
                            <TouchableOpacity
                            onPress={()=>opeAddMemberSheet()}
                                  keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),  justifyContent:'space-between',flexDirection:'row',alignItems:'center',      backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} >
                                <Text
                                style={{
                                    color:color_scheme(colorMode,"gray"),
                                    fontSize:16,
                                    fontWeight:'300',
                                }}
                                >
                                    Add Members 
                                </Text>
                                <View
                                style={{
                                  flexDirection:'row',
                                  alignItems:'center'
                                }}
                                >
                                <View
                                style={{
                                  backgroundColor:'#a330d0',
                                  height:25,
                                  width:25,
                                  borderRadius:100,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'center'
                                }}
                                >
                                  <Text
                                  style={{
                                    color:color_scheme(colorMode,'black'),
                                    fontWeight:'600'
                                  }}
                                  >
                                    {access.length}
                                  </Text>
                                </View>
                                
                                <ArrowRight2 size="20" color={color_scheme(colorMode,"gray")}/>
                                </View>
                            </TouchableOpacity>
                           
                            <ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center',paddingVertical:3}}>
            {
                Object.values(users2).map((userx,index)=>{
                    
                    return (
<View key={index} style={{flexDirection:'row',alignItems:'center', backgroundColor:color_scheme(colorMode,'#eee'),marginRight:10,paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
    <Image source={{uri:wrapUIMG(userx.uimg)}} style={makeeventstyles.accessuserimg}/>
    <Text style={[makeeventstyles.accessusername,{color:color_scheme(colorMode,'black')}]}>@{userx.username}</Text>
    {
        userx.userid != user.userid &&
   
    <TouchableOpacity
    onPress={()=>removeUser(userx._id)}
    >
        <Text style={makeeventstyles.accessremove}>x</Text>
    </TouchableOpacity>
     }
</View>
                    )
                })
            }

 
</ScrollView>
                        </View>
                        <View style={makeeventstyles.formgrp
                        }>

                            
                             
<Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Approved Locations</Text>
                            <TouchableOpacity
                            onPress={()=>opeAddMemberSheet()}
                                  keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{    color:color_scheme(colorMode,'black'),  justifyContent:'space-between',flexDirection:'row',alignItems:'center',      backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} >
                                <Text
                                style={{
                                    color:color_scheme(colorMode,"gray"),
                                    fontSize:16,
                                    fontWeight:'300',
                                }}
                                >
                                Approved Locations
                                </Text>
                                <View
                                style={{
                                  flexDirection:'row',
                                  alignItems:'center'
                                }}
                                >
                                <View
                                style={{
                                  backgroundColor:'#a330d0',
                                  height:25,
                                  width:25,
                                  borderRadius:100,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'center'
                                }}
                                >
                                  <Text
                                  style={{
                                    color:color_scheme(colorMode,'black'),
                                    fontWeight:'600'
                                  }}
                                  >
                                    {access.length}
                                  </Text>
                                </View>
                                
                                <ArrowRight2 size="20" color={color_scheme(colorMode,"gray")}/>
                                </View>
                            </TouchableOpacity>
                           
                            <ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center',paddingVertical:3}}>
            {
                Object.values(users2).map((userx,index)=>{
                    
                    return (
<View key={index} style={{flexDirection:'row',alignItems:'center', backgroundColor:color_scheme(colorMode,'#eee'),marginRight:10,paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
    <Image source={{uri:wrapUIMG(userx.uimg)}} style={makeeventstyles.accessuserimg}/>
    <Text style={[makeeventstyles.accessusername,{color:color_scheme(colorMode,'black')}]}>@{userx.username}</Text>
    {
        userx.userid != user.userid &&
   
    <TouchableOpacity
    onPress={()=>removeUser(userx._id)}
    >
        <Text style={makeeventstyles.accessremove}>x</Text>
    </TouchableOpacity>
     }
</View>
                    )
                })
            }

 
</ScrollView>
                        </View>
            </ScrollView>
            <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn} onPress={()=>makeStudyHours()}>
                <Text style={makeeventstyles.createeventbtntext}>Create StudyHours</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}