import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration, ActionSheetIOS, Modal, StyleSheet} from "react-native";
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
import AddUserAccessSheet from "./AddMemberSheet";
import AddUserSheet from "./AddUsersSheet";
import { useHashMap } from "../../../../hooks/useHashMap";
import successgif from '../../../../assets/successorg.gif'
const LoadingModal = ({ isVisible, onClose,success }) => {
    const {colorMode} = useContext(AppContext)
  
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={{paddingHorizontal:10, borderStyle:'solid',borderWidth:1,bordercolor:color_scheme(colorMode,'#eee'),borderColor:color_scheme(colorMode,'#aaa'), width:250,backgroundcolor:'black',height:200,borderRadius:10,flexDirection:'column',alignContent:'space-around',alignItems:'center',justifyContent:'center'}}>
            {
                success==false?
           <>
    
            <Spinner/>
            <Text
            style={{
                marginTop:20,
                fontSize:16,
                color:color_scheme(colorMode,'#eee'),
                fontWeight:'700'
            }}
            >
                Creating New Organization
            </Text>
            </>
                 :
                <Image source={successgif} style={{
                    width:200,
                    height:200
                }}>

                </Image>
                }
          </View>
        </View>
      </Modal>
    );
  };
export default function NewCohort({navigation,route}){
    const {user,colorMode} = useContext(AppContext)
    const {org,orgdt,orgdata} = route.params
    const [channel_name,setChannelName] = useState('')
    const [channel_members,setChannelMembers] = useState([user.userid])
    const [channel_logo,setChannelLogo] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [success,setSuccess] = useState(false)
    const [users2, addToHashMap, removeFromHashMap] = useHashMap();
    const showModal = () => {
      setModalVisible(true);
    };
  
    const hideModal = () => {
      setModalVisible(false);
    };
    const AddUserAccessSheetref = useRef()
    function opeAddMemberSheet(){
        AddUserAccessSheetref.current.show()
    }
    async function createCohort(){
      Haptics.impactAsync("medium")
      showModal()
        await axios.post(endpoints['create_cohort'],{
            orgid:org._id,
            channel_name:channel_name,
            channel_members:channel_members,
            createdby:user.userid,
            channel_logo:channel_logo
            
        }).then(res=>{
          setSuccess(true)
          setTimeout(()=>{
              hideModal()
              navigation.goBack()
          }
          ,1880)
        }
          
        )
    }
    const removeUser = (uid) =>{
      setChannelMembers(channel_members.filter(u=>u!==uid))
      removeFromHashMap(uid)
  }
    return (
        <View
        style={{
            backgroundColor:    color_scheme(colorMode,'white'),
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
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Cohort Name</Text>
                            <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Cohort Name" value={channel_name} onChangeText={(text)=>setChannelName(text)}/>
                        </View>
                        <View style={makeeventstyles.formgrp
                        }>

                            
                             
                      
                            <TouchableOpacity
                            onPress={()=>opeAddMemberSheet()}
                                  keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{ marginBottom:10,  color:color_scheme(colorMode,'black'),  justifyContent:'space-between',flexDirection:'row',alignItems:'center',      backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} >
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
                                    {channel_members.length}
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
            <LoadingModal isVisible={modalVisible} onClose={hideModal} success={success} />
            <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn} onPress={()=>createCohort()}>
                <Text style={makeeventstyles.createeventbtntext}>Create Cohort</Text>
            </TouchableOpacity>
            </View>
            <AddUserSheet users2={users2} removeUser={removeUser} addToHashMap={addToHashMap} removeFromHashMap={removeFromHashMap} bottomSheet={AddUserAccessSheetref} org={orgdata} selectedUsers={channel_members} setSelectedUsers={setChannelMembers} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });