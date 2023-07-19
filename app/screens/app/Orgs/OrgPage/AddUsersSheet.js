import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, UserAdd, CalendarAdd, ArchiveBook} from 'iconsax-react-native';
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
import * as Haptics from 'expo-haptics';
import { useHashMap } from "../../../../hooks/useHashMap";
export default function AddUserSheet({bottomSheet,selectedUsers,setSelectedUsers,users2, addToHashMap, removeFromHashMap,removeUser}){
    const {user} = useContext(AppContext)
    const [users,setUsers] = useState(null)

  const [input,setInput] = useState('')
    async function searchUsers(input){
        setInput(input)
        await axios.post(endpoints['searchuser'],{
            search:input.toLowerCase(),
            userid:user.userid
        }).then(res=>{
            console.log(res.data)
            setUsers(res.data)
        })
    }
    const addUser = (uid,us) => {
        if(!selectedUsers.includes(uid)){
            setSelectedUsers([...selectedUsers,uid])
            addToHashMap(uid,us)
            
            


        }else{
            removeUser(uid)
        }
        console.log(selectedUsers)
    }
   
        
        
    function closeSheet(){
        bottomSheet.current.close()
    }
    const {colorMode} = useContext(AppContext)
    useEffect(()=>{
        addToHashMap(user.userid, user)
    },[])
    return (
        <>

        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet} height={850} >
        <KeyboardAvoidingView style={{backgroundColor:color_scheme(colorMode,'white'),flex:1,
    paddingTop:20}}>

<View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eeee'),marginHorizontal:10}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'#aaa')}]}    autoCapitalize="none"  placeholderTextColor={color_scheme(colorMode,'#aaa')} placeholder="Search Username, Firstname, Lastname" value={input} onChangeText={(text)=>searchUsers(text)}/>
                </View>
                
        <View
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:color_scheme(colorMode,'white'),flex:1}}
              >

<View style={{flexDirection:'column', backgroundColor:color_scheme(colorMode,'white'), height:"100%",paddingVertical:10}}>
<ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:3}}>
            {
                Object.values(users2).map((userx,index)=>{
                    
                    return (
<View key={index} style={{flexDirection:'row',alignItems:'center',backgroundColor:color_scheme(colorMode,'#eee'),marginRight:10,paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
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

{
    users!=null?
    
    users.length==0?
    <View
    style={{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:'90%'
    }}
    >
        <Text
        style={{
            fontSize: 18,
            color:'#333',
            fontWeight:'700'
        }}
        >
           No Users Found
        </Text>
    </View>
    :
    <View
    style={{
        flexDirection:"column",
        justifyContent:'flex-start'

    }}
    >

        <View
        style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingHorizontal:20,
       
        }}
        >
            <Text
            style={{
                fontSize: 15,
                fontWeight:600,
                color:color_scheme(colorMode,'black')
            }}
            >
            Selected Users ({selectedUsers.length}) 
            </Text>
        <Button title="Done" onPress={()=>closeSheet()}/>
        </View>
<ScrollView
contentContainerStyle={{
    height:'90%',
}}
>


        {
            users.map((suser,index)=>{
                const bgcolor = selectedUsers.includes(suser._id)?color_scheme(colorMode,'#f5f5f5'):'transparent'
                const isSelected = selectedUsers.includes(suser._id)
                return (
                    suser._id != user.userid&&
                    <TouchableOpacity
                    key={index}
                    onPress={()=>{
                        addUser(suser._id,suser)}}
                    style={{

                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                     
                        borderStyle:'solid',
                        borderColor:color_scheme(colorMode,'#eee'),
                        borderBottomWidth:2.4,
                        paddingHorizontal:10,
                        paddingVertical:10,
                        backgroundColor:bgcolor
                        
                    }}
                    >
                    <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start'
                    }}
                    >
                        <Image source={{uri:wrapUIMG(suser.uimg)}} style={{
                            width:50,
                            height:50,
                            borderRadius:100,
                            marginRight:10
                        }}/>
                        <View
                        style={{
                            flexDirection:'column'
                        }}
                        >
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                color:color_scheme(colorMode,'#333')
                            
                            }}>
                                {suser.firstname+' '+suser.lastname}
                            </Text>
                            <Text
                            style={{
                                fontSize:14,
                                color:color_scheme(colorMode,'#aaa')
                            }}
                            >
                                @{suser.username}
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        {isSelected==true &&
                        <View>
                            <Feather name="check" size={24} color="#047aff" />
                        </View>
                        }
                    </View>
                        
                    </TouchableOpacity>
                )
            })
        }
        </ScrollView>

        </View>:

        <View
        style={{
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:'center',
            height:'90%'
        }}
        >
            <Text
            style={{
                fontSize: 18,
                color:'#333',
                fontWeight:'700'
            }}
            >
                Search for Users
            </Text>
        </View>
}


     
     
        </View>
        </View>
        
        </KeyboardAvoidingView>
  </BottomSheet>

  </>
    )
    
}