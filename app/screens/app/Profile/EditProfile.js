import React,{useState,useContext, useRef, useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Button,StyleSheet, Pressable, Dimensions} from "react-native";
import { discoverstyles, homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, UserEdit, Camera, Bubble, SearchNormal, TickCircle} from 'iconsax-react-native';
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
import { color_scheme } from "../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
function arrayToHashMap(inputArray) {
    const hashMap = {};

    inputArray.forEach(item => {
        const id = item._id;
        hashMap[id] = item;
    });

    return hashMap;
}
function PinnedOrgsBottomsSheet({bottomSheet,setOrgid,orgs,orgid}){
    const [search,setSearch] = useState('')
    const {colorMode,user} = useContext(AppContext)
    // const [orgs,setOrgs] = useState(null)
    // async function getMyOrgs(){
    //     await axios.post(endpoints['get_my_orgs'],{userId:user.userid}).then(res=>{
    //         console.log(res.data)
    //         setOrgs(res.data)
    //     })
    // }
    // useEffect(()=>{
    //     getMyOrgs()
    // },[])
    return (
        <BottomSheet hasDraggableIcon={false} ref={bottomSheet} height={Dimensions.get('screen').height-100} >
        <View style={{backgroundColor:color_scheme(colorMode,'white'),flex:1,paddingHorizontal:10,paddingVertical:20}}>
        {/* <View></View>
        <TouchableOpacity onPress={()=>{
                       Haptics.impactAsync('medium')
                        navigation.goBack()}}
                    style={{
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'center',
                        height:33,
                        width:33,
                        backgroundColor:'#222',
                        borderRadius:100,
                        marginRight:10, marginBottom:10
                    }}
                    >
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity> */}
        
        <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search My Organizations"
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View>
       
       <ScrollView
       contentContainerStyle={{
        paddingVertical:10
       }}
       >
        {
            orgs&&
         
         orgs.map((org,index)=>{

            return (
                <TouchableOpacity key={index}

                onPress={()=>{
                    Haptics.impactAsync('medium')
                    setOrgid(org._id)
                    bottomSheet.current.close()
                }}
                style={{
                    flexDirection:"row",
                    alignItems:'center',
                    justifyContent:'space-between'
                }}
                >
                    <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingVertical:10,
                        
                    }}
                    >
                        <Image source={{uri:wrapUIMG(org.org_logo)}} style={{
                            height:40,
                            width:40,
                            borderRadius:100,
                            marginRight:10
                        }}/>
                        <Text
                        style={{
                            color:color_scheme(colorMode,'black'),
                        }}
                        >{org.org_name}</Text>
                    </View>
                    {
                        org._id==orgid&&
          
                    <View>
                        <TickCircle
                        color="white"
                        variant="Bold"
                        />
                    </View>
                              }
                </TouchableOpacity>
            )
         })
        }
       </ScrollView>
        </View>
</BottomSheet>

    )
}
export default function EditProfile({navigation}){
    async function saveProfile(){


    }
    const {user,setUser,colorMode} = useContext(AppContext)
    const dataBottomSheet= useRef()
    const pinnedOrgsBottomSheet= useRef()
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
        await axios.post(endpoints['editprofile'],{uid:user.userid,firstname:firstname,lastname:lastname,username:username,bio:bio,dob:dob,primg,uimg1:profileimg,pinnedorg:pinnedorgid}).then(async (res)=>{
            if(initialImg==false){
                await uploadImages(random);
            }
            setUser(res.data)
            navigation.goBack()
           
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
    const [orgs,setOrgs] = useState(null)
    async function getMyOrgs(){
        await axios.post(endpoints['get_my_orgs'],{userId:user.userid}).then(res=>{
            console.log(res.data)
            setOrgs(res.data)
        })
    }
    useEffect(()=>{
        getMyOrgs()
  
    },[])
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
    const [pinnedorgid,setPinnedOrgId] = useState(medata.pinnedorg)

    console.log(medata,'medata')
    return (
        <View style={{backgroundColor:color_scheme(colorMode,'white'),flex:1}}>
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
                            
                            <Camera color={color_scheme(colorMode,'#333')} variant="Bold" size={24} style={{
                            position:'absolute',
                            bottom:5
                            }}/>
                             </TouchableOpacity>

                        </View>
                        <View style={editprofilestyles.frm}>
                            <View style={editprofilestyles.frm1}>

                            <View style={editprofilestyles.formheadbx}>
                                    <Text style={[editprofilestyles.formhead,{
                                        color:color_scheme(colorMode,'black')
                                    }]}>Personal Information</Text>
                                </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>First Name</Text>
                                <TextInput style={[editprofilestyles.frminput,{color:color_scheme(colorMode,'black') }]} value={firstname} onChangeText={(text)=>setFirstname(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Last Name</Text>
                                <TextInput style={[editprofilestyles.frminput,{color:color_scheme(colorMode,'black') }]} value={lastname} onChangeText={(text)=>setLastname(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>UserName</Text>
                                <TextInput style={[editprofilestyles.frminput,{color:color_scheme(colorMode,'black') }]} value={username} onChangeText={(text)=>setUsername(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>DOB</Text>
                                <View  style={[editprofilestyles.frminput,{flexDirection:'row',color:color_scheme(colorMode,'black') }]}>
                                <TextInput value={selectedDate}style={{width:'90%'}}
                                                                placeholderTextColor={color_scheme(colorMode,'grey')}
                                />
                                <Pressable onPress={()=>dataBottomSheet.current.show()}>
                                    <AntDesign name="calendar" size={24} color="#a330d0" />
                                </Pressable>
                               
                                </View>
                            
                            </View>
                            </View>
                            <View style={editprofilestyles.frm1}>
                                <View style={editprofilestyles.formheadbx}>
                                    <Text style={[editprofilestyles.formhead,{color:color_scheme(colorMode,'black')}]}>Profile Information</Text>
                                </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Bio</Text>
                                <TextInput style={[editprofilestyles.frminput,{height:100,color:color_scheme(colorMode,'black') }]} 
                                placeholderTextColor={color_scheme(colorMode,'grey')}
                                multiline={true} value={bio} onChangeText={(text)=>setBio(text)}/>
                            </View>
                            <View style={editprofilestyles.formgrp}>
                                <Text style={editprofilestyles.frmttxt}>Pinned Orgs</Text>
                                <View
                                style={[editprofilestyles.frminput,{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                }]}
                                >
                                <View
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'flex-start',
                                    alignItems:'center',
                                    width:'90%'
                                }}
                                >
                                    {
                                       orgs && pinnedorgid&&
                          <>
                                <Image source={{uri:wrapUIMG(arrayToHashMap(orgs)[pinnedorgid].org_logo)}} style={{
                                    width:30,
                                    height:30,
                                    borderRadius:5,
                                    marginRight:5
                                }}/>
                                <Text style={{color:color_scheme(colorMode,'black')}}>{arrayToHashMap(orgs)[pinnedorgid].org_name}</Text>
                                </>
                            }
                                </View>
                                <TouchableOpacity
                                onPress={()=>{
                                    Haptics.impactAsync("medium")
                                    pinnedOrgsBottomSheet.current.show()
                                }}
                                >
                                <Bubble size={24} color="#a330d0"/>
                                </TouchableOpacity>
                                </View>
                            </View>
                            </View>
                        </View>
     
                                 
                    </View>

                </ScrollView>
            </View>
            <PinnedOrgsBottomsSheet orgid={pinnedorgid} setOrgid={setPinnedOrgId} bottomSheet={pinnedOrgsBottomSheet} orgs={orgs}/>
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
        flexDirection:'column',
        width:'100%',
  
        justifyContent:'space-between',
        marginBottom:15
        
    },
    frmttxt:{
        marginBottom:10,
        color:"#aaa",
        fontWeight:'300',
        fontSize:15,
    },
    frminput:{
        borderWidth:1,
 
        borderRadius:5,
        padding:10,
        marginLeft:4,
        width:'100%',
        backgroundColor:'#222',
        borderColor:'#333'
    },
    
})