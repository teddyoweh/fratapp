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

function AddUserAccessSheet({bottomSheet,org}){
    const {user} = useContext(AppContext)
    const [users,setUsers] = useState(null)
    const [selectedUsers,setSelectedUsers] = useState([])
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
    const addUser = (uid) => {
        if(!selectedUsers.includes(uid)){
            setSelectedUsers([...selectedUsers,uid])
        }else{
            removeUser(uid)
        }
        console.log(selectedUsers)
    }
    const removeUser = (uid) =>{
        setSelectedUsers(selectedUsers.filter(u=>u!==uid))
    }
        
        
    async function addToOrg(){
        var ids = [];
        for (var i = 0; i < users.length; i++) {
        ids.push(users[i]._id);
        }

        await axios.post(endpoints['add_member'],{
            orgid:org.org._id,
            userids:ids
        }).then(res=>{
            bottomSheet.current.close()
        })
    }
    return (
        <>

        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet} height={850} >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1,
    paddingTop:20}}>

        <View style={[discoverstyles.searchbox,{marginHorizontal:10}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}    autoCapitalize="none"  placeholderTextColor={'#aaa'} placeholder="Search Username, Firstname, Lastname" value={input} onChangeText={(text)=>searchUsers(text)}/>
                </View>
        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:"white",flex:1}}
              >

<View style={{flexDirection:'column', backgroundColor:'white', height:"100%",paddingTop:10}}>

 
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
            paddingHorizontal:20
        }}
        >
            <Text
            style={{
                fontSize: 15,
                fontWeight:600
            }}
            >
            Selected Users ({selectedUsers.length}) 
            </Text>
        <Button title="Add" onPress={()=>addToOrg()}/>
        </View>
        {
            users.map((suser,index)=>{
                const bgcolor = selectedUsers.includes(suser._id)?'#f5f5f5':'transparent'
                const isSelected = selectedUsers.includes(suser._id)
                return (
                    <TouchableOpacity
                    key={index}
                    onPress={()=>{
                        addUser(suser._id)}}
                    style={{

                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                     
                        borderStyle:'solid',
                        borderColor:'#f5f5f5',
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
                                color:'#333'
                            
                            }}>
                                {suser.firstname+' '+suser.lastname}
                            </Text>
                            <Text
                            style={{
                                fontSize:14,
                                color:'#888'
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
        </ScrollView>
        
        </KeyboardAvoidingView>
  </BottomSheet>

  </>
    )
    
}

function RenderMembers({members1,memberSheet}){
    const members = members1.slice(0,8)
    let margin;
    let finalindex;
    function isAdmin(uid, memberDetails) {
        const user = memberDetails.find((member) => member.userid === uid);
        return user && user.role === 'admin';
      }
    const {user} = useContext(AppContext)
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
    color:'#333',
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


            <View
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
                        <>
                 
                        <View key={index}>
                            <Image
                            source={{uri:wrapUIMG(member.uimg)}}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 25,
                                position:'relative',
                                left:index*-15,
                                borderColor:'#bbb',
                                borderWidth:0.5

                            }}
                            >

                            </Image>
                        </View>

                        </>
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
               
                </View>
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
    const {user}=useContext(AppContext)
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
export default function OrgPage({navigation,route}){
    const scrollViewRef = useRef()
    const {org} = route.params
    const {user} = useContext(AppContext)
    console.log(org._id)
    const [orgData,setOrgData] = useState(null)
    const orgoptions = ['New Event','New Cohort','Study Hours','Add Members']
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
        'New Event':<CalendarAdd size="20" color="#777" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'New Cohort':<People size="20" color="#777" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'Study Hours':<ArchiveBook size="20" color="#777" style={{
            marginRight:4,
            fontWeight:'800'
            }}/>
    ,
        'Add Members':<UserAdd size="20" color="#777" style={{
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
    return (

 
    <View
    style={{
        flex:1,
        height:'100%',
        backgroundColor:'white',
 
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
            borderBottomWidth:1,
            borderStyle:'solid',
            borderColor:'#ddd'

        }}
        >
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>

            <TouchableOpacity>

            <Entypo name="dots-three-horizontal" size={20} color="#333" />
            </TouchableOpacity>

        </View>
        



        <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
       
            width:'100%',
            height:'100%',
            backgroundColor:'white'
        }}
        //onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}

        >
        <View
        style={{
            borderBottomWidth:1,
            borderStyle:'solid',
            borderColor:'#ddd',
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
                                        borderColor:'#ccc',
                                        paddingHorizontal:5
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:'#333',
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
                    justifyContent:'center'
                }}
                >
                    <Text
                    style={{
                        fontSize:20,
                        flexWrap:'wrap',
                        color:'#333',
                        fontWeight:700
                    }}
                    >
                        {org.org_name}
                    </Text>
                    <Text
                    style={{
                        fontSize:16,
                        color:'#333',
                        fontWeight:500,
                        marginTop:5
                    }}
                    >
                        {org.org_description}
                    </Text>
                </View>
            </View>

            {

                orgData &&
            <View>

   
            <View>
                    <RenderMembers members1={orgData.members} memberSheet={opeAddMemberSheet}/>
            </View>
            </View>
              }
        </View>
        <View
        style={{
 
        paddingTop:20,
        backgroundColor:'#fff'
        }}
        >
      
      <View
        style={{
            paddingBottom:10
        }}
        >

    
        <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal:16,
            paddingVertical:10
 
        }}
        showsHorizontalScrollIndicator={false}
        
        >
        {
            orgoptions.map((orgopt,index)=>{
                return (
                    <View
                    style={{
                        marginRight:10,
                        backgroundColor:'#eee',
                        paddingHorizontal:8,
                        paddingVertical:6,
                        borderRadius:10,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderStyle:'solid',
                        borderColor:'#ccc'
              
                    }}
                    >
                        {optionsicon[orgopt]}
                        <Text
                        style={{
                            color:'#777',
                            fontWeight:'600',
                            fontSize:13
                            
                        }}>
                            {orgopt}
                        </Text>
                    </View>
                )
            })
        }    
        </ScrollView>
        </View>
        
        { orgData &&
            orgData.channels.map((cohort,index)=>{
                return (
                    <TouchableOpacity
                    key={index}
                    onPress={()=>navigation.navigate('OrgChannelScreen',{
                        org,
                        cohort
                    })}
                    style={{
                        backgroundColor:'#ffffff',
                        marginVertical:8,
                        marginHorizontal:10,
                        borderRadius:10,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingHorizontal:10,
                        paddingVertical:10,
                        // borderWidth:0.5,
                        // borderColor:'#ddd',
                        // borderStyle:'solid',
                        shadowColor: '#666',
             
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    >
                        <View
                          style={{
                            flexDirection:'row',
                            alignItems:'center',
                         
                        }}
                        >
                        <Notepad2 size="40" color="#333"variant="Bulk"/>
                        <View
                        style={{
                            flexDirection:'column',
                            marginLeft:10,
                        }}
                        >

             
                        <Text
                        style={{
                         
                            fontSize:18,
                            color:'#333',
                            fontWeight:'300'
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
                        fontStyle:'italic',
                            color:'#aaa',
                            fontWeight:'500'
                        }}
                        >
                        {cohort.channel_members.length} Members
                        </Text>
                        </View>
                        </View>
                        </View>


                        <ArrowRight2 size="20" color="#aaa"/>
                    </TouchableOpacity>
                )
            })
        }
   
        {/* <RendorOrgPost orgid={org._id}/> */}
        </View>
        </ScrollView>
   
        {/* <RenderMessageBox orgid={org._id}/> */}
              <AddUserAccessSheet bottomSheet={AddUserAccessSheetref} org={orgData} />
      
    </View>
       )

}