import React,{useState,useContext, useRef}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Button,StyleSheet, Pressable} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, UserEdit, Camera} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import BottomSheet from "react-native-gesture-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { wrapUIMG } from "../../../utils/utils";

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
    const [profileimg,setProfileImg] = useState(wrapUIMG(user.uimg))
    const [initialImg,setInitialImg] = useState(true)
    const [image,setImage] = useState(null)
    function randomNumberString() {
        var min = 10000; // Minimum 5-digit number (10,000)
        var max = 99999; // Maximum 5-digit number (99,999)
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
      }

    function toggleDateBtm(){
        
    }
    async function getMeData(){
        axios.post(endpoints['finduser',{user:user.id}]).then(res=>{
            setMeData(res.data)
            
        })
    }
   
    async function saveMeData(){
        const random = `${randomNumberString()}`
        let primg
        if(initialImg==false){
            primg = {
                uri:profileimg,
                random:random,
            email:username
    
            }
        }
        await axios.post(endpoints['editprofile'],{uid:user.userid,firstname:firstname,lastname:lastname,username:username,bio:bio,dob:dob,primg,uimg1:profileimg}).then(async (res)=>{
            if(initialImg==false){
                await uploadImages(random);
            }
           
        })
    
    
    }
    function saveProfile(){
        saveMeData()
    }
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
          allowsMultipleSelection:true
        });
        console.log(JSON.stringify(_image));
        if (!_image.canceled) {
            console.log(_image)
            setProfileImg(_image.uri)
            setInitialImg(false)
            setImage(_image)
        }
      }; 
    async function uploadImages(random){
        const data = new FormData()
       
        data.append('name','avatar')
        data.append('email',username)
        data.append('random',`${random}`)
        data.append('uri',profileimg)
        data.append('file',{
            uri:profileimg,
       
            name:'profile.jpg'
        })
        console.log(data)
        await axios.post(endpoints['uploadprofile'],data).then(res=>{
            navigation.goBack()
        })
    }
    // React.useEffect(
    //     () =>
    //       navigation.addListener('beforeRemove', (e) => {
    //         if (!hasUnsavedChanges) {
    //           // If we don't have unsaved changes, then we don't need to do anything
    //           return;
    //         }
    
    //         // Prevent default behavior of leaving the screen
    //         e.preventDefault();
    
    //         // Prompt the user before leaving the screen
    //         Alert.alert(
    //           'Discard changes?',
    //           'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //           [
    //             { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //             {
    //               text: 'Discard',
    //               style: 'destructive',
    //               // If the user confirmed, then we dispatch the action we blocked earlier
    //               // This will continue the action that had triggered the removal of the screen
    //               onPress: () => navigation.dispatch(e.data.action),
    //             },
    //           ]
    //         );
    //       }),
    //     [navigation, hasUnsavedChanges]
    //   );
    
    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Button title="Cancel"onPress={()=>navigation.goBack()}/>
                <Button title="Save" onPress={()=>saveProfile()}/>

            </View>
            <View>
                <ScrollView>
                    <View style={{flexDirection:'column'}}>
                        <View
                        style={{
                      
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                flexDirection:'column',
                                alignItems:'flex-end'
                            }}
                            onPress={()=>addImage()}
                            >
                            <Image source={{uri:profileimg}}
                            
                            style={{
                                width:100,
                                height:100,
                                borderRadius:50,
                            }}/>
                            
                            <Camera color="#333" variant="Bulk" size={24} style={{
                            position:'absolute',
                            bottom:5
                            }}/>
                             </TouchableOpacity>

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