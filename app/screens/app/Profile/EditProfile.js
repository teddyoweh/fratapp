import React,{useState,useContext, useRef}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Button,StyleSheet, Pressable} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import BottomSheet from "react-native-gesture-bottom-sheet";


import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";

export default function EditProfile({navigation}){
    async function saveProfile(){


    }
    const {user} = useContext(AppContext)
    const dataBottomSheet= useRef()
    const [selectedDate, setSelectedDate] = useState('');
    const [medata,setMeData]  = useState(user)
    const [firstname,setFirstname] = useState(user.firstname)
    const [lastname,setLastname] = useState(user.lastname)
    const [username,setUsername] = useState(user.username)
    const [bio,setBio] = useState(user.bio)
    const [dob,setDob] = useState(user.DOB)


    function toggleDateBtm(){
        
    }
    async function getMeData(){
        axios.post(endpoints['finduser',{user:user.id}]).then(res=>{
            setMeData(res.data)
            
        })
    }
    async function saveMeData(){
        await axios.post(endpoints['editprofile'],{uid:user.id,firstname:firstname,lastname:lastname,username:username,bio:bio,dob:dob}).then(res=>{
            console.log(res.data)
        })
    
    
    }
    function saveProfile(){
        saveMeData()
    }
    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Button title="Cancel"onPress={()=>navigation.goBack()}/>
                <Button title="Save" onPress={()=>saveProfile()}/>

            </View>
            <View>
                <ScrollView>
                    <View style={{flexDirection:'column'}}>
                        <View>

                        </View>
                        <View style={editprofilestyles.frm}>
                            <View style={editprofilestyles.frm1}>

                            <View style={editprofilestyles.formheadbx}>
                                    <Text style={editprofilestyles.formhead}>Personal Information</Text>
                                </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>First Name</Text>
                                <TextInput style={editprofilestyles.frminput} value={firstname} onChangeText={(text)=>setFirstname(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Last Name</Text>
                                <TextInput style={editprofilestyles.frminput} value={lastname} onChangeText={(text)=>setLastname(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>UserName</Text>
                                <TextInput style={editprofilestyles.frminput} value={username} onChangeText={(text)=>setUsername(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>DOB</Text>
                                <View  style={[editprofilestyles.frminput,{flexDirection:'row'}]}>
                                <TextInput value={selectedDate}style={{width:'90%'}}/>
                                <Pressable onPress={()=>dataBottomSheet.current.show()}>
                                    <AntDesign name="calendar" size={24} color="#a330d0" />
                                </Pressable>
                               
                                </View>
                            
                            </View>
                            </View>
                            <View style={editprofilestyles.frm1}>
                                <View style={editprofilestyles.formheadbx}>
                                    <Text style={editprofilestyles.formhead}>Profile Information</Text>
                                </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Bio</Text>
                                <TextInput style={[editprofilestyles.frminput,{height:100}]} multiline={true} value={bio} onChangeText={(text)=>setBio(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Pinned Orgs</Text>
                                <View>
                                    
                                </View>
                            </View>
                            </View>
                        </View>
     
                                 
                    </View>

                </ScrollView>
            </View>
            <BottomSheet hasDraggableIcon={false} ref={dataBottomSheet} height={450} >
                <View style={{backgroundColor:'white',flex:1}}>

               
                <DatePicker
  onSelectedChange={date => setSelectedDate(date)}
  mode="calendar"
  maximumDate={Date()}
/>
     </View>
</BottomSheet>

        </View>
    )
}

const editprofilestyles = StyleSheet.create({
    frm:{
        padding:10,
        width:'100%'
    },
    formheadbx:{
        marginVertical:10
    },
    formhead:{
        fontSize:18,
        fontWeight:'700'
    },
    formgrp:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15
        
    },
    frmttxt:{
        color:"#aaa",
        fontWeight:'600'
    },
    frminput:{
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        padding:10,
        marginLeft:4,
        width:'80%'
    },
    
})