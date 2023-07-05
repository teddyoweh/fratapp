import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, Back, Setting2} from 'iconsax-react-native';
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



export default function OrgChannel({route,navigation}){
    const {org,cohort} = route.params
    const {user} = useContext(AppContext)
    console.log(org)
    const [message,setMessage] = useState('')
    return (

        <View
        style={{
            flex:1,
            backgroundColor:'white'
        }}
        >
            <View
            style={{
              flexDirection:'column',
              alignItems:'center',   paddingVertical:10,      paddingHorizontal:8,
              borderStyle:'solid',
              borderBottomWidth:1,
              borderColor:'#ddd'
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                width:'100%',
                justifyContent:'space-between',
          
             
            }}
            >

       
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            >
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >
            <Image source={{uri:wrapUIMG(org.org_logo)}} style={{
                height:30,
                width:30,
                borderRadius:100,
                marginRight:10
            }}/>
            <Text
            style={{
                fontSize:17,
                fontWeight:'600'
        
            }}
            >
                {org.org_name}
            </Text>
            </View>
            <TouchableOpacity>
                <More color="#333" variant="Broken"/>
            </TouchableOpacity>

            </View>
            <View>
                <Text
                style={{
                    color:'#aaa',
                    fontWeight:'700',
                    fontSize:16,
                }}
                >
                    # {cohort.channel_name}
                </Text>
            </View>
            </View>
            <ScrollView
            style={{
                flex:1,
                backgroundColor:'white',
                //paddingTop:20
               

            }}
            >
            {[1,2,3,4].map((mes,index)=>{
                return (
                    <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginHorizontal:4,
                        
                        //borderRadius:30,
                        backgroundColor:'white',
                        paddingHorizontal:13,
                        paddingVertical:6,
                        //Meet our new UI for a corporate messenger. With its help, users can chat with their colleagues and schedule messages. Let’s take a closer look
                      
                    }}
                    >
                        <Image
                        source={{uri:wrapUIMG(user.uimg)}}
                        style={{
                        height:45,
                        width:45,
                        borderRadius:100
                        }}
                        />
                        <View
                        style={{
                            flexDirection:'column',
                   
                            paddingHorizontal:5
                        }}
                        >

             
                        <View
                        style={{
                            flexDirection:'column',
                            alignItems:'flex-start',
                        
                            justifyContent:'flex-end',
                            paddingVertical:6,
                         
                        
                        }}
                        >
                            <Text
                            style={{
                                fontSize:13,
                                color:'#aaa',
                                fontWeight:'600',
                                marginBottom:4
                            }}
                            >
                                Teddy Oweh
                            </Text>
                          
                
                        <View
                        style={{
                            backgroundColor:'#333',
                            paddingVertical:10,
                            paddingHorizontal:16,
                            borderRadius:20,
                            borderBottomLeftRadius:5,
                            flexDirection:'column',

                        }}
                        >
                            
                    
                        <Text
                        style={{
                            fontSize:16,
                            fontWeight:300,
                            color:'white'
                        }}
                        >
                        Hi everyone! 
                        </Text>
                     
                        </View>
                        </View>
                        {/* <Text
                            style={{
                                
                                fontSize:13,
                                color:'#aaa',
                                fontWeight:'300'
                            }}
                            >
                                13:00PM
                            </Text> */}
                            </View>
                    </View>
                )
            })}

            </ScrollView>
            <View
            style={{
                paddingHorizontal:20,
                paddingVertical:15
            }}
            >
                <View
                style={{
                    // borderStyle:'solid',
                    // borderWidth:1,
                    // borderColor:'#aaa',
                    borderRadius:20,
                    
                    backgroundColor:'white',
                   
                 
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingVertical:15,
                    paddingHorizontal:15,
                    borderRadius:30,
                      shadowOffset: {
                            width: 0,
                            height: 0,
                          },
                          shadowOpacity: 0.5,
                          shadowRadius: 3.84,
                          elevation: 9,
                          shadowColor: '#aaa'
                    
                    
                }}
                >
                    <TextInput
                    placeholder="Write Something ..."
                    multiline={true}
                    value={message}

                    onChangeText={(text)=>setMessage(text)}
                    style={{
                        width:'90%',
                        paddingVertical:5,
                        paddingHorizontal:15
                    }}
                    />
                    
                     
           
                    <Send2
                    size={26}
                    color="#333"
                    variant={   message.length>0?"Bold":'Linear'}
                    />
                
                    
                </View>
            </View>
            
        </View>
    )

}