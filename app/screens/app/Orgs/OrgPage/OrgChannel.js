import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration, StyleSheet} from "react-native";
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
import { color_scheme } from "../../../../config/color_scheme";
import * as Haptics from 'expo-haptics';


function RenderOrgChannelPost(){
    const {user,colorMode} = useContext(AppContext)
    const [isLiked,setIsLiked] = useState(false)
    function LikeBtn(){
        Haptics.impactAsync('medium')
        setIsLiked(!isLiked)
    }
    return (
        <View
        style={{
            flexDirection:'column',
            paddingHorizontal:18,
            paddingVertical:10,
            marginVertical:6,
            marginHorizontal:8,
            borderRadius:10,
            // borderBottomWidth:0.5,
            // borderStyle:'solid',
            // borderColor:color_scheme(colorMode,'eeee'),
            backgroundColor:color_scheme(colorMode,'eee'),
        }}
        >
        <View
        style={{
            flexDirection:'row',
            alignItems:'center'
        }}
        >
            <Image
            source={{uri:wrapUIMG(user.uimg)}}
            style={{
                height:50,
                width:50,
                borderRadius:100
            }}
            />
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:10
            }}
            >
                <Text
                style={{
                    fontSize:15,
                    color:color_scheme(colorMode,'black'),
                    fontWeight:'600'
                }}
                >
                    {user.firstname+' '+user.lastname}
                </Text>
                <Text
                style={{
                    marginLeft:5,
                    fontSize:14,
                    color:color_scheme(colorMode,'grayy'),
                    fontWeight:'600'
                }}
                >
                    @{user.username}
                </Text>
            </View>
        
        </View>
        <View
        style={{
            paddingVertical:10
        }}
        >
                <Text
                style={{
                    color:color_scheme(colorMode,'black'),
                    fontWeight:'600'
                }}
                >

This dataset consists of synthetically generated images of clocks with the clock hands placed on one of 100 different clock faces.
                </Text>
                <View
                style={{
                    paddingVertical:16,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
                    
                }}
                >
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center' 
                    }}
                    >
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                        >
                            <Text
                            style={{
                                color:color_scheme(colorMode,'black')
                            }}
                            >
                                1
                            </Text>
                            <Text
                            style={{
                                color:color_scheme(colorMode,'grayy'),
                                marginLeft:6
                            }}
                            >
                                Likes
                            </Text>
                        </View>
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginHorizontal:10
                        }}
                        >
                            <Text
                            style={{
                                color:color_scheme(colorMode,'grayy')
                            }}
                            >
                                •
                            </Text>
                          
                        </View>
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center' 
                        }}
                        >
                            <Text
                            style={{
                                color:color_scheme(colorMode,'black')
                            }}
                            >
                                1
                            </Text>
                            <Text
                            style={{
                                color:color_scheme(colorMode,'grayy'),
                                marginLeft:6
                            }}
                            >
                                Replies
                            </Text>
                        </View>
                    </View>
                    <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}
                    >
                        <TouchableOpacity>
                        <Like1 size="24" color={isLiked?'#FF7575':color_scheme(colorMode,'grayy')} variant={isLiked?'Bulk':'Linear'} onPress={()=>LikeBtn()}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            marginLeft:10
                        }}
                        >
                        <More size="24" color={color_scheme(colorMode,'grayy')}/>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <TouchableOpacity
                style={{
                    paddingHorizontal:10,
                    paddingVertical:10,
                    borderRadius:10,
                    backgroundColor:color_scheme(colorMode,'eeee'),
                  
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'

                }}
                >
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}
                >
                <Ionicons name="ios-return-down-forward" size={24} color={color_scheme(colorMode,'black')} />
                <Text
                style={{
                    marginLeft:10,
                    color:color_scheme(colorMode,'#333')
                }}
                >
                    Reply
                </Text>
                </View>
                <ArrowRight2 size="18" color={color_scheme(colorMode,'grayy')}/>

                </TouchableOpacity>
            </View>


        </View>
    )
}
export default function OrgChannel({route,navigation}){
    const {org,cohort} = route.params
    const {user,colorMode} = useContext(AppContext)
    console.log(org)
    const [message,setMessage] = useState('')
    
    return (

        <View
        style={{
            flex:1,
            backgroundColor:color_scheme(colorMode,'white')
        }}
        >
            <View
            style={{
              flexDirection:'column',
              alignItems:'center',   paddingVertical:10,      paddingHorizontal:8,
              borderStyle:'solid',
              borderBottomWidth:1,
              borderColor:color_scheme(colorMode,'#ddd')
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
            <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
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
                fontWeight:'600',
                color:color_scheme(colorMode,'black')
        
            }}
            >
                {org.org_name}
            </Text>
            </View>
            <TouchableOpacity>
                <More color={color_scheme(colorMode,'#333')} variant="Broken"/>
            </TouchableOpacity>

            </View>
            <View>
                <Text
                style={{
                    color:color_scheme(colorMode,'#aaa'),
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
                backgroundColor:color_scheme(colorMode,'white'),
                paddingTop:20
               

            }}
            >
                {
                    [...Array(10)].map((pst,index)=>{
                        return (
                        <RenderOrgChannelPost key={index}/>
                        )
                    })
                }
               

            </ScrollView>
            <View
            style={{
                paddingHorizontal:20,
                paddingVertical:15,
                backgroundColor:color_scheme(colorMode,'white'),
            }}
            >
                <View
                style={{
                    borderStyle:'solid',
                    borderWidth:0.5,
                    borderColor:color_scheme(colorMode,'eeee'),
                    borderRadius:30,
                    
                    backgroundColor:color_scheme(colorMode,'white'),
                   
                 
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingVertical:15,
                    paddingHorizontal:15,
                 
                    
                    
                }}
                >
                    <TextInput
                    placeholder="Write Something ..."
                    multiline={true}
                    value={message}
                    placeholderTextColor={color_scheme(colorMode,'eeee')}

                    onChangeText={(text)=>setMessage(text)}
                    style={{
                        width:'90%',
                        paddingVertical:5,
                        paddingHorizontal:10,
                        fontSize:17
                    }}
                    />
                    
                     
           
                    <Pressable
        onPress={()=>{
     
        }}
    


        style={{
 
            width:40,
            height:40,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:100,
            backgroundColor:color_scheme(colorMode,'eeee')

        }}
        >
            <ArrowUp color="white" size={23}/>

            </Pressable>
                
                    
                </View>
            </View>
            
        </View>
    )

}
const styles = StyleSheet.create({
    rightArrow: {
      position: "absolute",
      backgroundColor: "#333",
      //backgroundColor:"red",
      width: 20,
      height: 20,
      bottom: -1,
      borderBottomLeftRadius: 100,
      right: -10
    },
    
    rightArrowOverlap: {
      position: "absolute",
      backgroundColor: "white",
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomLeftRadius: 100,
      right: -20
    
    },
    
    /*Arrow head for recevied messages*/
    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        //backgroundColor:"red",
        width: 20,
        height: 20,
        bottom: -2,
        borderBottomRightRadius: 100,
        left: -10
    },
    
    leftArrowOverlap: {
        position: "absolute",
 
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 100,
        left: -20
    
    },
    })

//     <View style={{
//         backgroundColor: "#333",
//         padding:10,
//         marginLeft: '45%',
//         borderRadius: 5,
//         //marginBottom: 15,
//         marginTop: 5,
//         marginRight: "5%",
//         maxWidth: '50%',
//         alignSelf: 'flex-end',
//         //maxWidth: 500,
        
//         borderRadius: 20,
//       }} >

        
//         <Text style={{ fontSize: 16, color: "#fff", }} >Heyyy</Text>

//           <View style={styles.rightArrow}></View>
          
//           <View style={[styles.rightArrowOverlap,{backgroundColor:color_scheme(colorMode,'white')}]}></View>
        
        
        
// </View>



// <View style={{
//         backgroundColor: "#ddd",
//         padding:10,
//         borderRadius: 5,
//         marginTop: 5,
//         marginLeft: "5%",
//         maxWidth: '50%',
//         alignSelf: 'flex-start',
//         //maxWidth: 500,
//         //padding: 14,
        
//         //alignItems:"center",
//         borderRadius: 20,
//       }}  >

        
          
//           <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }}  > how are you doing</Text>
//           <View style={styles.leftArrow}>

//           </View>
//           <View style={[styles.leftArrowOverlap,{backgroundColor:color_scheme(colorMode,'white')}]}></View>
        
        
        
//         </View>