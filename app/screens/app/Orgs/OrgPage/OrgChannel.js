import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration, StyleSheet, ActionSheetIOS} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, Back, Setting2, Notification1, Clock, Key, ArrowCircleUp, ArrowCircleDown, DirectInbox, Save2, Js} from 'iconsax-react-native';
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


function RenderOrgChannelPost({post,userdets}){
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
            marginHorizontal:10,
            borderRadius:10,
     
            backgroundColor:'#2224',
            // borderBottomWidth:0.5,
            // borderStyle:'solid',
            // borderColor:color_scheme(colorMode,'eeee'),
          
        }}
        >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
            }}
            >
   
        <View
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:"flex-start",

        }}
        >
        
            <Image
            source={{uri:wrapUIMG(userdets.uimg)}}
            style={{
                height:35,
                width:35,
                borderRadius:100
            }}
            />
                <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginLeft:10
             
            }}
            >
                <Text
                style={{
                    fontSize:17,
                    color:color_scheme(colorMode,'black'),
                    fontWeight:'600'
                }}
                >
                    {userdets.firstname+' '+userdets.lastname}
                </Text>
                <Text
                style={{
                    marginLeft:5,
                    fontSize:14,
                    color:"#555",
                    fontWeight:'400'
                }}
                >
                    @{userdets.username}
                </Text>
                <Text>
                    
                </Text>
            </View>
                 </View>
                 <Text
                 style={{
                    color:'#555',
                    fontSize:13
                 }}
                 >
                        {getTimeDifference(post.date)} ago                                                                                                                                                                                                                                                                                                                                                                                                               vvv 
                 </Text>
                 </View>
            <View
            style={{
                flexDirection:'column',
                width:'100%',
            }}
            >
            
        
            <View
        style={{
            paddingVertical:10
        }}
        >
                <Text
                style={{
                    color:color_scheme(colorMode,'black'),
                    fontWeight:'300',
                    fontSize:15
                }}
                >
{post.content}
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
                        alignItems:'center',
                        justifyContent:'space-between',width:'100%'
                    }}
                    >
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                marginRight:10
                            }}
                            >

                        
                            <ArrowCircleUp size="30" color="#fff"/>
                            </TouchableOpacity>

                            <Text
                            style={{
                                color:'#fff',
                                fontWeight:'800',
                                fontSize:17
                            }}
                            >
                                1
                            </Text>
                            <TouchableOpacity
                            style={{
                                marginLeft:10
                            }}
                            >

                        
                            <ArrowCircleDown size="30" color="#555"/>
                            </TouchableOpacity>
                      
                        </View>

                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                  
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                marginRight:10,
                                height:35,
                                width:35,
                                borderRadius:100,
                                backgroundColor:'#222',
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >

                        
                            <Messages1 size="20" color="#444"/>
                            </TouchableOpacity>
                            <Text
                            style={{
                                color:color_scheme(colorMode,'grayy')
                                
                            }}
                            >
                              1
                            </Text>
                          
                        </View>

                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
             
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                marginRight:10,
                                height:35,
                                width:35,
                                borderRadius:100,
                                backgroundColor:'#222',
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >

                        
                            <DirectInbox size="20" color="#444"/>
                            </TouchableOpacity>
                          
                          
                        </View>
                   
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                    
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                marginRight:10,
                                height:35,
                                width:35,
                                borderRadius:100,
                                backgroundColor:'#222',
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >

                        
                            <Save2 size="20" color="#444"/>
                            </TouchableOpacity>
                        
                          
                        </View>
                    </View>
               
                </View>
             
            </View>
            </View>
        
 
      


        </View>
    )
}
export default function OrgChannel({route,navigation}){
    const {org,cohort} = route.params
    const {user,colorMode} = useContext(AppContext)
    const [postData,setPostData] = useState(null)
    const [message,setMessage] = useState('')
    const filters = ['Recents','Pinned','Announments','Events','Polls','Opportunities']
    const [activeFilter,setActiveFilter]=useState(filters[0])
    async function getPosts(){
 
        await axios.post(endpoints['getposts'],{userid_:user.userid,orgid:org._id}).then(res=>{
            setPostData(res.data)
 
 
        })
    }
    function gotoChat(){
        const name_ = cohort.channel_name=='General'?org.org_name:`${org.org_name} - ${cohort.channel_name}`
        const data_org = {
            org_id:org._id,
            name_:name_,
            uimg_:org.org_logo,
            receiver_type:cohort.channel_name=='General'?'group':'cohort',
            _id:org._id,
            cohort:cohort,
            channel_id:cohort.channel_name!='General'?cohort._id:null,
            ...org,
        }
 
        navigation.navigate("MessagesScreen",{
  
            screen:'ChatStacks',
            params:{
                party_data:data_org,
            }
        })
    }
    const [orgData,setOrgData] = useState(null)

    const orgoptionshashmap ={
        'Messages':gotoChat,
        'Settings':gotoChat
       
    }
    const orgoptions = [...Object.keys(orgoptionshashmap)]
    const onSettingsPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...orgoptions,'Settings'],
        title:`${org.org_name} Menu`,
        cancelButtonIndex: [...orgoptions,'Settings'].length-1,
        userInterfaceStyle: "dark",
        tintColor:'#eee'
      },
      buttonIndex => {
         orgoptionshashmap[[...orgoptions,'Settings'][buttonIndex]]()
      },
    );
    useEffect(()=>{
        getPosts()
    },[])
    function filtericons(name,color){
        const filtericonhash ={
            'Recents':<Clock color={color} size={17} style={{
                marginRight:5,
                
            }}/>,
            'Announments':<Notification1 color={color} size={17} style={{
                marginRight:5,
                
            }}/>,
            'Events':<Calendar color={color} size={17} style={{
                marginRight:5,
                
            }}/>,
            'Polls':<Chart color={color} size={17} style={{
                marginRight:5,
                
            }}/>,
            'Opportunities':<Key color={color} size={17} style={{
                marginRight:5,
                
            }}/>,
        }
        return filtericonhash[name]
    }

    function swapFeed(item) {
        setActiveFilter(item);
        //navigateToFeed(item);
      }
      
    return (

        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}

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
                        marginRight:10
                    }}
                    >
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
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
                fontSize:17,
                fontWeight:'600',
                color:color_scheme(colorMode,'black')
        
            }}
            >
                {org.org_name}
            </Text>
            </View>
            <TouchableOpacity
            onPress={()=>onSettingsPress()}
            >
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
            <View
            style={{


                paddingVertical:14,
                paddingHorizontal:10,
            }}
            >

            <ScrollView contentContainerStyle={{
               flex:0,
             
                           

            }}  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        filters.map((filter,i)=>{
                            const color = activeFilter==filter?"white":'#555'
                            const genstyle = {flexDirection:'row',marginRight:2,paddingVertical:10,paddingHorizontal:10,
                            borderRadius:30,}
                            const gentextstyle = {fontSize:18,fontWeight:'300',color:'#444',marginHorizontal:10}
                            return(
                                <TouchableOpacity key={i} style={activeFilter==filter?[genstyle,{ backgroundColor:'#222'}]:[genstyle]} onPress={()=>swapFeed(filter)}>
                                    {/* {
                                        filtericons(filter,color)
                                    } */}
                                    <Text style={activeFilter==filter?[gentextstyle,{color:color_scheme(colorMode,'black')}]:gentextstyle}>{filter}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                



                </ScrollView>
            </View>
            <ScrollView
            style={{
                flex:1,
                backgroundColor:color_scheme(colorMode,'#f5f5f5,'),
                paddingTop:20
               

            }}
            >
                {postData &&
                    postData.posts.map((pst,index)=>{
                        return (
                        <RenderOrgChannelPost key={index} post={pst} userdets={postData.users[pst.userid]}/>
                        )
                    })
                }
               

            </ScrollView>
            <View style={homestyles.postbtndiv}>
                <TouchableOpacity style={homestyles.postbtn} onPress={()=>{
                    Haptics.impactAsync('light')
                    navigation.navigate("MakePost",{
                        setPost:setPostData,
                        postd:postData,
                        org:org,
                        cohort:cohort
                    })
                   }}> 
                <Add color="white" variant="Broken" size={42} />
                {/* <Text style={homestyles.postbtntext}>New Post</Text> */}
                </TouchableOpacity>

            </View>
            
        </KeyboardAvoidingView>
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