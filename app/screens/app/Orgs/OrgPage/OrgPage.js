import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration, ActionSheetIOS, Dimensions} from "react-native";
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



function RenderMembers({members1,memberSheet,navigation,orgid,orgdt,orgdata}){
    const members = members1.slice(0,8)
    let margin;
    let finalindex;
  
    function isAdmin(uid, memberDetails) {
        const user = memberDetails.find((member) => member.userid === uid);
        return user && user.role === 'admin';
      }
    const {user,colorMode} = useContext(AppContext)
    return (
        <View
        style={{
            paddingHorizontal:20,
            flexDirection:'column'
        }}
        >
<Text
style={{
    marginBottom:4,
    color:color_scheme(colorMode,'#333'),
    fontSize:13,
    fontWeight:'bold'
}}
>

    Members ({members1.length})
</Text>

<View 
style={{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
}}
>


            <TouchableOpacity
            onPress={()=>navigation.navigate('MembersScreen',{
                orgid,orgdt,orgdata
            })}
            style={{
                width:"70%",
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'flex-start'
                
       
            }}
            >
                {members.map((member,index) => {
                    finalindex = index
                    return(
                        <View key={index}>
                 
                        <View>
                            <Image
                            source={{uri:wrapUIMG(member.uimg)}}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 25,
                                position:'relative',
                                left:index*-15,
                               

                            }}
                            >

                            </Image>
                        </View>

                       </View>
                    )
                }
                )}
                {
                    members.length!=members.length &&
                    <View 
                    
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: 25,
                        position:'relative',
                        left:finalindex+8*-15,
                        flexDirection:'row',
                        alignItems:"center",
                        justifyContent:'center',
                    
                        backgroundColor:'#eee',
              

                    }}
                    > 
                    <Text
                    style={{
                        color:'#999',
                        fontWeight:'400'
                    }}
                    >
                        +{members1.length-members.length}
                    </Text>
                        </View>
                }
               
                </TouchableOpacity>
                <View
                style={{
                    marginLeft:margin
                }}
                >
                    {/* {
isAdmin(user.userid,members)==true&&
            
                    <TouchableOpacity

                    onPress={()=>memberSheet()}
                    style={{flexDirection:'row',alignItems:'center',backgroundColor:'#eee',paddingHorizontal:7,borderRadius:10,paddingVertical:5,marginRight:10}}
                    >
                        
                    <Text
                    style={{
                        marginRight:4,
                        fontSize:13,
                        fontWeight:'400',
                  
                        color:'#999'
                    }}
                    >
                        Add Member
                    </Text>
                    <AddCircle
                    size={15}
                    color="#999"
                    variant="Broken"
                    />
                          </TouchableOpacity>        } */}

                </View>
            </View>

            </View>
    )
}
 
function RenderMessageBox({orgid}) {
    const {user} = useContext(AppContext)
    const [height] = useState(new Animated.Value(0));
    const [optionView,setOptionView] = useState(false)
    const [mediaOptionActive, setMediaOptionActive] = useState(false)
  const [pollOptionActive, setPollOptionActive] = useState(false)
    const [eventOptionActive, setEventOptionActive] = useState(false)
    const [opportunityOptionActive, setOpportunityOptionActive] = useState(false)
    const [announcementOptionActive, setAnnouncementOptionActive] = useState(false)
    const [voiceOptionActive, setVoiceOptionActive] = useState(false)
    const [linkOptionActive, setLinkOptionActive] = useState(false)
    const [text,setText]=useState('')
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function onBoxTap() {
    Animated.timing(height, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false,
    }).start();
    console.log(height)
    setOptionView(true)
  }

  function onKeyboardShow() {
    // Call the onBoxTap function when the keyboard becomes active

    onBoxTap();
  }
  async function fetchPosts(){
    await axios.post(endpoints['get_org_posts'],{
        orgid:orgid
    }).then(res=>{
        console.log(res.data)
        setPosts(res.data)
    })

}
  async function makePost(){
    await axios.post(endpoints['make_org_post'],{
        content:text,
        orgid:orgid,
        userid:user.userid

    }).then(res=>{
        setText('')
        Vibration.vibrate()
        fetchPosts()
       

    })
  }
  function tapOptions(option){
    switch (option) {
        case 'media':
          setMediaOptionActive(!mediaOptionActive);
          addImage()
          break;
        case 'poll':
          setPollOptionActive(!pollOptionActive);
          break;
        case 'event':
          setEventOptionActive(!eventOptionActive);
          break;
        case 'opportunity':
          setOpportunityOptionActive(!opportunityOptionActive);
          break;
        case 'announcement':
          setAnnouncementOptionActive(!announcementOptionActive);
          break;
        case 'voice':
          setVoiceOptionActive(!voiceOptionActive);
          break;
        case 'link':
          setLinkOptionActive(!linkOptionActive);
          break;
        default:
          break;
      }
       

 } 
  function onKeyboardHide() {
    setOptionView(false)
    Animated.timing(height, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }

  const interpolatedHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: ['15%', '55%'],
  });
  console.log(interpolatedHeight)
  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        // borderTopWidth: 1,
        // borderColor: '#ddd',
        // borderStyle: 'solid',
        width: '100%',
        padding: 10,
        height: interpolatedHeight,
        flexDirection: 'column',
      }}
    >
    
      <Pressable
     
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            height:48,
        }}
        >

        <View
        style={{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius:30,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:'#ddd',
            paddingHorizontal:20,
            paddingVertical:12,
            width:'88%',
            
          
        }}
        >
          <TextInput
            onBlur={()=>onKeyboardHide()}
             onPressIn={()=>onBoxTap()}
             value={text}
             onChangeText={(t)=>setText(t)}
            multiline
            style={{
            
                flexDirection:'column',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                fontWeight:'200',
                fontSize:15,
                width:'90%'
                
                
            }}
            placeholder="Share your Announcement, Event, or Polls"
          />
          <TouchableOpacity
          style={{
            width:10
          }}
          >

          
          <Microphone2
          color="#333"
          size={20}
          />
          </TouchableOpacity>
        </View>
        <Pressable
        onPress={()=>makePost()}


        style={{
            width:40,
            height:40,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:100,
            backgroundColor:'#333',

        }}
        >
            <ArrowUp color="white" size={23}/>

            </Pressable>
        </View>
      </Pressable>
      <View>
        {
            optionView==true &&
      
      <View style={{paddingHorizontal:10,flexDirection:'row', justifyContent:'space-between', paddingTop:8}}>
                <View style={{paddingHorizontal:10,flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>

          
                <Pressable onPress={()=>tapOptions('media')}>
                    <PictureFrame color="#333" variant={mediaOptionActive?"Bulk":'Broken'}/>
                </Pressable>
                <Pressable  onPress={()=>tapOptions('poll')} style={{marginLeft:18}} >
                    <Chart color="#333" variant={pollOptionActive?"Bulk":'Broken'}/>
                </Pressable>
              
     
                </View>
                
            </View>  }
      </View>
    </Animated.View>

  );
}

 
function RendorOrgPost({orgid}){
    const {user,colorMode}=useContext(AppContext)
    const [posts,setPosts]= useState(null)
    
    async function fetchPosts(){
        await axios.post(endpoints['get_org_posts'],{
            orgid:orgid
        }).then(res=>{
            console.log(res.data)
            setPosts(res.data)
        })

    }
    useLayoutEffect(()=>{
        fetchPosts()
    },[])
   
    return (
        <View
        style={{
    
 
        }}
        >
            {
                posts && posts.posts.map((post,index)=>{
                     
                    const postuser = posts.users[post.userid]
                    return (
                        <View
                        key={index}
                        style={{
                            paddingHorizontal:10,
                            paddingVertical:10,
                            marginBottom:10,
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                        >
                            <View>
                        <Image
                        source={{uri:wrapUIMG(postuser.uimg)}}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:100,
                            borderWidth:1,
                            borderColor:'#ddd'

                        }}
                        />

                            </View>
                            <View
                            style={{
                                paddingHorizontal:8,
                                width:'90%'
                                
                            }}
                            >
                                <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    width:'100%'
                                    
                                }}
                                >

                                <Text style={{
                                    fontSize:14,
                                    fontWeight:'500',
                                    color:"#333"
                                }}>
                                    {postuser.firstname+' '+postuser.lastname}
                                </Text>
                                <Text
                                style={{
                                    fontSize:12,
                                    fontWeight:'300',
                                    color:"#999",
                                    marginLeft:6
                                }}
                                >
                                    {getTimeDifference(post.date)+' ago'}
                                </Text>
                                </View>
                            <View
                            style={{
                                marginTop:6
                            }}
                            >
                            <Text
                            style={{
                                fontSize:16,
                                fontWeight:'300',
                                color:"#333"

                            }}
                            >
                                {post.content}
                            </Text>
                            </View>

                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}
function RenderDescription({bottomSheet,org}){
    return (
        <BottomSheet  sheetBackgroundColor={"#111"} ref={bottomSheet} height={Dimensions.get('screen').height-400}  >
        <View
        style={{
            paddingHorizontal:20,
            paddingVertical:20,
            flexDirection:'column',
            alignItems:'flex-start',
            justifyContent:'flex-start',
        }}>
            <Text
            style={{
                fontSize:20,
                fontWeight:'300',
                color:'white'
            }}
            >
                {org.org_description}
            </Text>
        </View>
        </BottomSheet>

    )
}
export default function OrgPage({navigation,route}){
    const scrollViewRef = useRef()
    const descriptionSheet = useRef()
    const [refreshing, setRefreshing] = useState(false);
    const {org} = route.params
    const {user,colorMode} = useContext(AppContext)
    console.log(org._id)
    const [orgData,setOrgData] = useState(null)
    const orgoptions = ['New Event','New Cohort','Study Hours','Add Members']
    function gottoStudyHours(){
        navigation.navigate("StudyHourStack",{

            org:org,orgdt:{name:org.org_name,uimg:org.org_logo,members:orgData.members},orgdata:orgData,orgid:org._id
        })
    }
    const orgoptionshashmap ={
        'Add Members':opeAddMemberSheet,
        "New Event":test,
        'New Cohort':gotoCohort, 
        'Study Hours':gottoStudyHours,
        'Settings':test
       
    }
    function test(){}
    function gotoCohort(){

        navigation.navigate('NewCohort',
        {
            org,
            orgdt:{name:org.org_name,uimg:org.org_logo,members:orgData.members},
            orgdata:orgData
        })
    }
    async function getOrg(){
       await axios.post(endpoints['getorg'],{
                org_id:org._id
        })
        .then(res=>{
            setOrgData(res.data)
        })
    }
    const AddUserAccessSheetref = useRef()
    const optionsicon = {
        'New Event':<CalendarAdd size="20" color={color_scheme(colorMode,'#333')} variant="Bold" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'New Cohort':<People size="20" color={color_scheme(colorMode,'#333')} variant="Bold" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'Study Hours':<ArchiveBook size="20" color={color_scheme(colorMode,'#333')} variant="Bold" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'Add Members':<UserAdd size="20" color={color_scheme(colorMode,'#333')} variant="Bold" style={{
        marginRight:4,
        fontWeight:'800'
        }}/>


    }
  
    useEffect(() => {
   
        getOrg()
    }, [])
    function opeAddMemberSheet(){
        AddUserAccessSheetref.current.show()
    }
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
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getOrg()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      const desc =  org.org_description.length > 120 ? org.org_description.slice(0, 120) + "..." : org.org_description;

    return (

 
    <View
    style={{
        flex:1,
        height:'100%',
        backgroundColor:color_scheme(colorMode,'white'),
 
        width:'100%',
        flexDirection:'column'
    }}
    >
        <View
        style={{
            paddingHorizontal:10,
            paddingBottom:5,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            // borderBottomWidth:0.5,
            // borderStyle:'solid',
            // borderColor:color_scheme(colorMode,'#ccc')

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

            <TouchableOpacity
            onPress={()=>onSettingsPress()}
            >

            <Entypo name="dots-three-horizontal" size={20} color={color_scheme(colorMode,'#333')} />
            </TouchableOpacity>

        </View>
        



        <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
       
            width:'100%',
            height:'100%',
            backgroundColor:color_scheme(colorMode,'white')
        }}
        //onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <View
        style={{
       
            paddingBottom:10,
          
        }}
        >
            <View
            style={{
            flexDirection:'row',
            paddingHorizontal:15,
            paddingVertical:20,
            // shadowColor: '#333',
            // backgroundColor:'transparent',
            // shadowOffset: {
            //   width: 0,
            //   height: 20,
            // },
            // shadowOpacity: 0.15,
            // shadowRadius: 3.84,
            // elevation: 35,
            }}
            >
                 <View>
                                {
                                    org.org_logo!=null?<Image
                                    source={{uri:wrapUIMG(org.org_logo)}}
                                    style={{
                                        width:100,
                                        height:100,
                                        marginRight:10,
                                        borderRadius:org.org_logo=='/profileimg/defaultorgimg.png'?0: 100,
                                        
                                    }}
                                    >

                                    </Image>:
                                    <View
                                    style={{
                                        height:50,
                                    width:50,
                                        borderRadius:10,
                                        backgroundColor:'#eee', 
                                        marginRight:10,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        borderStyle:'solid',
                                        borderWidth:1,
                                        borderColor:color_scheme(colorMode,'#ddd'),
                                        paddingHorizontal:5
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:color_scheme(colorMode,'#333'),
                                            fontSize:16,
                                            fontWeight:500
                                        }}
                                        >
                                            {org.org_shortname}
                                    
                                        </Text>
                                    </View>
                                }

                            </View>
               
                <View
                style={{
                    flexDirection:'column',
                    alignItems:'flex-start',
                    justifyContent:'center',
                    width:'90%'
                }}
                >
                    <Text
                    style={{
                        fontSize:20,
                        flexWrap:'wrap',
                        color:color_scheme(colorMode,'#333'),
                        fontWeight:700
                    }}
                    >
                        {org.org_name}
                    </Text>
                    <Text
                    style={{
                    
                        fontSize:16,
                        color:color_scheme(colorMode,'#333'),
                        fontWeight:300,
                        marginTop:5,
                        // flexWrap:'wrap',
                        width:'80%'
                        
                    }}
                    >
                        {desc}
                        {
                            org.org_description.length > 120 &&
                     
                        <TouchableOpacity
                        
                        onPress={()=>{descriptionSheet.current.show()}}
                        >
                        <Text
                        style={{
                            color:color_scheme(colorMode,'#333'),
                            fontWeight:'500',
                            fontSize:15,
                            marginLeft:5,
                            textDecorationLine:'underline',
                            marginTop:5,
                        }}
                        >
                            Read More
                        </Text>
                        </TouchableOpacity>
                           }
                    </Text>
                </View>
            </View>

            {

                orgData &&
            <View>

   
            <View>
                    <RenderMembers orgdt={{name:org.org_name,uimg:org.org_logo,members:orgData.members}} orgdata={orgData}navigation={navigation} orgid={orgData.org._id} members1={orgData.members} memberSheet={opeAddMemberSheet}/>
            </View>
            </View>
              }
        </View>
        <View
        style={{
 
        paddingTop:20,
        backgroundColor:color_scheme(colorMode,'white')
        }}
        >
      
      <View
        style={{
            paddingBottom:10
        }}
        >

    

        </View>
        <View
         style={{
            backgroundColor:color_scheme(colorMode,'#eee'),
            marginHorizontal:10,
    
            borderRadius:10,
        
        }}
        >

     
        { orgData &&
            orgData.channels.map((cohort,index)=>{
                const borderstyle =index!=orgData.channels.length-1?{   borderBottomWidth:0.5,
                    borderColor: color_scheme(colorMode,'#ddd'), 
                    borderStyle:'solid',

                }:{}
          
                return (
                    <TouchableOpacity
                    key={index}
                    onPress={()=>{
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        navigation.navigate('OrgChannelScreen',{
                        org,
                        cohort
                    })}}
                    style={[{
                      
            
                   
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingHorizontal:8,
                        paddingVertical:10,
                     
                       
             
                    },borderstyle]}
                    >
                        <View
                          style={{
                            flexDirection:'row',
                            alignItems:'center',
                         
                        }}
                        >
                            <View
                            style={{
                                
                                flexDirection:"row",
                                justifyContent:'center',
                                alignItems:'center',
                                //backgroundColor:color_scheme(colorMode,'white'),
                                borderRadius:10,
                                //    borderWidth:0.5,
                        // borderColor:'#333',//color_scheme(colorMode,'#fff'),
                        // borderStyle:'solid',

                        // shadowOffset: {
                        //     width: 0,
                        //     height: 5,
                        //   },
                        //   shadowOpacity: 0.15,
                        //   shadowRadius: 3.84,
                        //   elevation: 5,
                            }}
                            >

                           
                        <Hashtag size="25" color='#555'variant="Broken"/>
                        </View>
                        <View
                        style={{
                            flexDirection:'column',
                            marginLeft:10,
                        }}
                        >

             
                        <Text
                        style={{
                         
                            fontSize:18,
                            color:color_scheme(colorMode,'#333'),
                            fontWeight:'500'
                        }}
                        >
                        {cohort.channel_name}
                        </Text>
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginTop:4,
                        }}
                        >
         
                        
                        <Text
                        style={{
             
                            fontSize:14,
                  
                            color:color_scheme(colorMode,'#aaa'),
                            fontWeight:'200'
                        }}
                        >
                        {cohort.channel_members.length} Members
                        </Text>
                        </View>
                        </View>
                        </View>


                        <ArrowRight2 size="20" color={color_scheme(colorMode,'#aaa')}/>
                    </TouchableOpacity>
                )
            })
        }
           </View>
   
        {/* <RendorOrgPost orgid={org._id}/> */}
        </View>
        </ScrollView>
   
        {/* <RenderMessageBox orgid={org._id}/> */}
              <AddUserAccessSheet bottomSheet={AddUserAccessSheetref} org={orgData} />
        <RenderDescription bottomSheet={descriptionSheet} org={org}/>
    </View>
       )

}