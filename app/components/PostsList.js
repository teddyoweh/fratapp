import React,{useState,useEffect,useContext, useRef}from "react";
import { View,Text,Dimensions, Image,TouchableOpacity, ScrollView, TextInput, Pressable, Share, ActionSheetIOS, KeyboardAvoidingView, InputAccessoryView, Button} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, MessageText, Link2, Link, MessageText1, Send2, ArrowUp, Verify, Calendar, Calendar2, ArrowRight} from 'iconsax-react-native';
import { FontAwesome5,Entypo,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { captureRef, captureScreen } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import LikeBtn from "./LikeBtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapPostImg, wrapUIMG } from "../utils/utils";
import { AppContext } from "../context/appContext";
import { color_scheme } from "../config/color_scheme";
import PagerView from 'react-native-pager-view';
import PostLikes from "./PostLikes";
import * as Haptics from 'expo-haptics'
import BottomSheet from "react-native-gesture-bottom-sheet";
import MapView from "react-native-maps";

function RenderImages({images}){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const windowScale = Dimensions.get('window').scale;
    const [pageheight,setPageHeight] = useState(scaleImageToScreen(images[0].width,images[0].height).height)
    const [cidnex,setCindex] = useState(0)
    const pagerRef = useRef(null);
  const handleScroll = (event) => {
    const { position } = event.nativeEvent;
    const currentPageIndex = Math.floor(position);

    

    console.log('Current page key:', currentPageIndex);
    setPageHeight(scaleImageToScreen(images[currentPageIndex].width,images[currentPageIndex].height).height)
    setCindex(currentPageIndex)
    
  };
    function scaleImageToScreen(imageWidth, imageHeight) {
 
        const maxWidth = windowWidth  
        const maxHeight = windowHeight  
        const imageAspectRatio = imageWidth / imageHeight;
        let scaledWidth = maxWidth;
        let scaledHeight = maxWidth / imageAspectRatio;
        if (scaledHeight > maxHeight) {
          scaledHeight = maxHeight;
          scaledWidth = maxHeight * imageAspectRatio;
        }
 
        return { width: scaledWidth, height: scaledHeight };
      } 
     
    const {colorMode} = useContext(AppContext)
    return (
        <View
        style={{
            flex:1,
            height:pageheight+50,
            marginBottom:10
        }}
        >

      
        <PagerView  style={{  flex: 1}} initialPage={0}
                ref={pagerRef}

          onPageScroll={handleScroll}
        >
       

 
                        
          {
                images.map((imgurl,index)=>{
                    const {width,height} = scaleImageToScreen(imgurl.width,imgurl.height)
                   
                    return(
                      
                        <View
                        key={`${index}`}
                        style={{
                   
                            paddingHorizontal:10,
                        }}
                        >

                        
                       
                        <Image key={index} source={{uri:wrapPostImg(imgurl.uri)}} style={{
                            //width:windowWidth-1,
                          
                            width:width-55,
                            height:height,
                            
                            // marginRight:20,
                            marginBottom:10,
                            borderRadius:10,
                       
                      
                        }}/>
                        </View>
                    
                    )})
                
            } 
    
    
        
 
         
      </PagerView>
      {images.length>1&&
      <View

      style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"flex-end",
        paddingVertical:10,
        paddingHorizontal:10

      }}
      >
        <Text
        style={{
            color:"#555",
            fontWeight:'600',
            fontSize:16,
            marginRight:5
        }}
        >
            {
                cidnex+1 +"/"+images.length
            }
        </Text>
         

        </View>}
      </View>
    )

}

function CommentInput({postid,setPost}){
    const {user} = useContext(AppContext)
    const [comment,setComment] = useState('')
    async function addComment(){
        await axios.post(endpoints['addcomment'],{userid:user.userid,comment:comment,postid:postid}).then(
            res=>{
                console.log(res.data)
                setPost(res.data)
                setComment('')
            }
        )
    }
    const {colorMode} = useContext(AppContext)
    return (


    <View style={[homestyles.postcommentbox,{
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        borderWidth:0.5,
       
        borderColor:color_scheme(colorMode,'#ddd')
    }]}>
        <TextInput
        style={{
            width:'80%',
            height:'100%',
            fontSize:14,
            fontWeight:'600',
            paddingTop:8,
            color:color_scheme(colorMode,'black')
        }}
  

        value={comment}
        keyboardAppearance={colorMode}
        onChangeText={(text)=>setComment(text)}
        placeholder="Add Comment"
        placeholderTextColor={color_scheme(colorMode,'s3')}
        
        multiline={true}
        />
       <Pressable
onPress={()=>addComment()}


style={{
width:30,
height:30,
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
borderRadius:100,
backgroundColor:color_scheme(colorMode,'#eee'),

}}
>
<ArrowUp color="white" size={16}/>

</Pressable>
    </View>
    )
}
function checkUserVoteStatus(userId, idHashMap) {
    for (const key in idHashMap) {
        if (idHashMap.hasOwnProperty(key)) {
            const idArray = idHashMap[key];
            if (idArray.includes(userId)) {
                return {
                    state: true,
                    votedFor: key
                };
            }
        }
    }
    
    return {
        state: false,
        votedFor: null
    };
}
function calculateVotePercentages(voteHashMap) {
    const result = {};
    let totalVotes = 0;
    for (let index = 0; index < Object.keys(voteHashMap).length; index++) {
        const key = Object.keys(voteHashMap)[index];
        const value = voteHashMap[key];
        
        totalVotes += value.length;
        result[key] = value.length;
     
        
    }
    let ans = {}
    for (let index = 0; index < Object.keys(voteHashMap).length; index++) {
        const key = Object.keys(voteHashMap)[index];
        const value = voteHashMap[key];
        const percentage = totalVotes === 0 ? 0 : (value.length / totalVotes) * 100;
        result[key] = percentage;


        
    }

    
    return result;
}
function RenderPollVote({ post, setPosti }) {
    const { colorMode, user } = useContext(AppContext);
    const { state, votedFor } = checkUserVoteStatus(user.userid, post.pollsvotes);
    const voteOptions = calculateVotePercentages(post.pollsvotes);
  
    async function updatePoll(who) {
      try {
        await axios.post(endpoints['updatepoll'], { userid: user.userid, postid: post._id, votedoption: who }).then(
            res=>{
                setPosti(res.data)
            }
        );
        // Assuming the response data is the updated poll data
        // You might need to adapt this part based on the actual response structure
 
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: 18,
          paddingVertical: 5,
        }}
      >
        {post.pollsoptions.map((poll, index) => {
          const optionPercentage = voteOptions[poll] || 0;
          const showvalue = !optionPercentage ==0? optionPercentage.toFixed(0):100
          return (
            <View
            style={{
                width:'100%',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
            }}
            >

            <TouchableOpacity
              onPress={() => updatePoll(poll)}
              key={index}
              style={{
                backgroundColor: color_scheme(colorMode, '#eee'),
                width: !state ? '100%':'88%',
            
                borderRadius: 10,
                marginBottom: 5,
                position: 'relative', // Add position to allow relative positioning
              }}
            >
              {/* {state && votedFor === poll && ( // Display indicator only if state is true and votedFor matches current option */}
                <View
                  style={{
                  
                    width:state && votedFor === poll? `${optionPercentage}%`:`${showvalue}%`, // Set the width based on the percentage
                    backgroundColor: state && votedFor === poll?'#a330d0':optionPercentage==0?"transparent":"#444",
             
                   
                    paddingHorizontal:10,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                >
           
              {/* )} */}
           
              <Text
                style={{
                  color: color_scheme(colorMode, '#333'),
                  width:500
                }}
              >
                {poll}
              </Text>
                       
              </View>
            </TouchableOpacity>
            {
                state &&
            
            <Text
            style={{
                color: color_scheme(colorMode, '#333'),
                fontWeight:'600',
                fontSize:13
            }}
            >
                {Math.round(optionPercentage)}%
            </Text>
              }
            </View>
          );
        })}
      </View>
    );
  }
  
function EventMoreSheet({eventMoreSheetRef,post}){
    return (
        <BottomSheet   sheetBackgroundColor="#111" ref={eventMoreSheetRef} height={Dimensions.get("screen").height-140}    style={{
       
        }}>
            <View
            style={{
                flexDirection:'column',
       
                justifyContent:'space-between',
                paddingHorizontal:10,
                paddingVertical:20,
                // backgroundColor:'#2229',
                marginHorizontal:15,
                // borderWidth:1,
                // borderColor:'#3335',

                borderRadius:10,
                marginVertical:15,
                height:'95%',


            }}
            >
                <View
                
                >

       
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    borderBottomWidth:1,
                    borderColor:'#333',
                    borderStyle:'solid',
                    paddingBottom:16


                }}
                >
                    <Text
                    style={{
                        color:'white',
                        fontWeight:'900',
                        fontSize:24,
                    }}
                    >
                        {post.eventname}
                    </Text>
                </View>
                <Text
                style={{
                    color:'#fff',
                    marginTop:20,
                    fontSize:20,
                    fontWeight:'300'
                }}
                >
                    {post.eventdescription}
                </Text>
                <View
                style={{
                    flexDirection:'column',
                    
                }}
                >
                    <View
                    style={{
                        flexDirection:'column',
                        marginTop:40

                    }}
                    >
                        <Text
                        style={{
                            color:'#999',
                            fontWeight:'300',
                            fontSize:16,
                        }}
                        >
                            Start
                        </Text>
                        <Text
                        style={{
                            color:'#fff',
                            fontWeight:'300',
                            fontSize:20,
                            marginTop:5
                        }}
                        >
                            {post.eventstartdate}
                        </Text>

                    </View>
                    <View
                    style={{
                        flexDirection:'column',
                        marginTop:40

                    }}
                    >
                        <Text
                        style={{
                            color:'#999',
                            fontWeight:'300',
                            fontSize:16,
                        }}
                        >
                            End
                        </Text>
                        <Text
                        style={{
                            color:'#fff',
                            fontWeight:'300',
                            fontSize:20,
                            marginTop:5
                        }}
                        >
                            {post.eventenddate}
                        </Text>

                    </View>
                </View>
                <View
                style={{
                    marginTop:40
                }}
                >
                <MapView
                 initialRegion={{
                    latitude: post.eventlocation.lat, // Default latitude
                    longitude: post.eventlocation.long, // Default longitude
                    latitudeDelta: 0.02, // Controls the zoom level
                    longitudeDelta: 0.02, // Controls the zoom level
                  }}
            tintColor="#444"
            style={{
                
                height:300,
             
                borderRadius:15,
                width:'99%',
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#222'
            }}
            />
                </View>
                </View>
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
                    justifyContent:'center',
                    width:'48%',
                    paddingHorizontal:20,
       
                    paddingVertical:19,
                    borderWidth:0.5,
                    borderRadius:60,
                    borderColor:'white',
                    // backgroundColor:'white',
                }}
                >
                    <Text
                    style={{
                        color:'#fff',
                        fontWeight:'400',
                        fontSize:23,
                    }}
                    >
                       RSVP
                    </Text>
               
                </View>
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
             justifyContent:'center',
                    width:'48%',
                    paddingHorizontal:20,
       
                    paddingVertical:19,
                    borderWidth:0.5,
                    borderRadius:60,
                    borderColor:'white',
                    backgroundColor:'white',
                }}
                >
                    <Text
                    style={{
                        color:'#333',
                        fontWeight:'400',
                        fontSize:20,
                    }}
                    >
                       Add to Calendar
                    </Text>
                
                </View>
           
            </View>
            </View>
        

        </BottomSheet>
    )
}
function RenderEvent({ post, setPosti }){
    const eventMoreSheetRef = useRef(null);
    function onMore(){
        
        eventMoreSheetRef.current.show()
    }
    function parseAndFormatDate(inputDate) {
        // Split the input date string into components
        const parts = inputDate.split(' ');
      
        // Extract day, month, and year from the date part
        const day = parts[2].replace(',', '').padStart(2, '0');
        const monthName = parts[1];
        const year = parts[3];
      
        // Convert the month name to a numeric month (assuming English month names)
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = (monthNames.indexOf(monthName) + 1).toString().padStart(2, '0');
      
        // Extract time and AM/PM
        const time = parts[4];
        const ampm = parts[5];
      
        // Construct the formatted date string
        const formattedDate = `${day}/${month}/${year} ${time}${ampm}`;
      
        return formattedDate;
      }
    return (<View
    style={{
        flexDirection:'column',
        alignItems:'center',   marginHorizontal:10,
              
        marginBottom:10,
    
    }}
    >
       
        <View
        style={{
            paddingHorizontal:10,
            paddingVertical:20,
            flexDirection:'column',
            backgroundColor:'#2229',
            // borderStyle:'solid',
            // borderWidth:1,
            // borderColor:'#333',
            borderRadius:10,
   
            width:'100%'
        
        }}
        >
            <View
            style={{
                flexDirection:'row',
                paddingBottom:10,
                borderBottomWidth:1,
                borderColor:'#333',
                borderStyle:'solid'
            }}
            >


            <Text
            style={{
                color:'white',
                fontWeight:'600',
                fontSize:20,
     
            }}
            >
                
                {post.eventname}
            </Text>
            </View>
            <Text
            style={{
                paddingVertical:10,
                color:'white',
                fontWeight:'300',
                fontSize:17,
            }}
            >
                {post.eventdescription}
            </Text>
            <View>
            {/* <View
                style={{
                    flexDirection:'column',
                    
                }}
                >
                    <View
                    style={{
                        flexDirection:'column',
                        marginTop:10

                    }}
                    >
                        <Text
                        style={{
                            color:'#999',
                            fontWeight:'300',
                            fontSize:12,
                        }}
                        >
                            Start
                        </Text>
                        <Text
                        style={{
                            color:'#fff',
                            fontWeight:'300',
                            fontSize:17,
                            marginTop:5
                        }}
                        >
                            {post.eventstartdate}
                        </Text>

                    </View>
                    <View
                    style={{
                        flexDirection:'column',
                        marginTop:20,
                        marginBottom:10

                    }}
                    >
                        <Text
                        style={{
                            color:'#999',
                            fontWeight:'300',
                            fontSize:12,
                        }}
                        >
                            End
                        </Text>
                        <Text
                        style={{
                            color:'#fff',
                            fontWeight:'300',
                            fontSize:17,
                            marginTop:5
                        }}
                        >
                            {post.eventenddate}
                        </Text>

                    </View>
                </View> */}
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:10,

            }}
            >

 
            <View
            style={{
                backgroundColor:'white',
          
                paddingVertical:10,
         
                paddingHorizontal:10,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-evenly',
                borderRadius:10,
                width:'86%'
            }}
            >
              
            
      <Text
      style={{
            color:'#333',
            fontWeight:'600',
            fontSize:17,
      }}
      >
        RSVP
      </Text>

            </View>
            <TouchableOpacity
            onPress={()=>onMore()}
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                height:40,
                width:40,
                borderRadius:100,
                backgroundColor:'#333',
            }}
            >

<Calendar2 size="26" color="#aaa" variant="Bold"/>
            </TouchableOpacity>
            </View>
        </View>
        <View
        style={{
            flexDirection:'row',
            alignItems:'center',
            marginTop:10
        }}
        >
    <View
        style={{
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:10,
            paddingVertical:3,
            borderRadius:10,
            width:'25%',
            backgroundColor:'#222',
        }}
        />

<View
        style={{
            marginLeft:5,
            flexDirection:'row',
            alignItems:'center',
     
            borderRadius:100,
            width:8,
            height:8,
            backgroundColor:'#222',
        }}
        />
        </View>
        <EventMoreSheet eventMoreSheetRef={eventMoreSheetRef} post={post}/>
        </View>
    )
}
export default function PostsList({index,navigation,posti,userdetails,move}){
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const windowScale = Dimensions.get('window').scale;
    
 const [post,setPosti] =useState(posti)
 const [showPost,setShowPost] = useState(true)
 
const {user} = useContext(AppContext)
const [isLike, setIsLike] = useState(post.likesuserlist.includes(user.userid));
function scaleImageToScreen(imageWidth, imageHeight) {
 
    const maxWidth = windowWidth  
    const maxHeight = windowHeight  
  
    // Calculate the aspect ratio of the image
    const imageAspectRatio = imageWidth / imageHeight;
  
    // Calculate the scaled dimensions
    let scaledWidth = maxWidth;
    let scaledHeight = maxWidth / imageAspectRatio;
  
    // Check if the scaled height exceeds the maximum height
    if (scaledHeight > maxHeight) {
      scaledHeight = maxHeight;
      scaledWidth = maxHeight * imageAspectRatio;
    }
  
    // Return the scaled dimensions as an object
    return { width: scaledWidth, height: scaledHeight };
  }
  
  function navigateToUser(){
 
    if(userdetails.userid==user.userid){

        navigation.navigate('ProfileStacks')
    }
    else{

    
    navigation.navigate('ProfilesScreen',{userdetails:userdetails})
}
  }
  function moveToPost(){
    if(move==true){
        navigation.navigate('PostPage',{post:post,userdetails:userdetails})
    }
  }
  const scrollViewRef = useRef(null);

 

  const handleScrollToImg = (index) => {
    if (scrollViewRef.current) {
      const offsetX = index * windowWidth;
    
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }else{
        const offsetX = index * windowWidth;
      
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  };

  const {colorMode} = useContext(AppContext)

  async function shareBtn() {
 
    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = Dimensions.get('window').scale; // The pixel ratio of the device
  
    const pixels = targetPixelCount / pixelRatio;
  
   
    captureScreen({
        format: "jpg",
        quality: 0.8
      }).then(
       async (uri) => {
            await Share.share({
                message:
                  'React Native | A framework for building native apps using React',
              url:uri},{
                tintColor:'black'
              });
        }
   
      );
 
    
  }
  async function deletePost(id){
    await axios.post(endpoints['deletepost'],{
        id:id
    }).then(
        res=>{
            setShowPost(false)
        }
    )
  }
  const morepostoptions = post.userid ==user.userid? ['Cancel', 'Report', 'Delete']:['Cancel', 'Report','Block' ]
  const onMore = (id) =>
  
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: morepostoptions ,
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        alert(`Successfuly Reported this post, We will review this post and take action if necessary.`)
      } else if (buttonIndex === 2) {
        if (post.userid ==user.userid){
            deletePost(id)
        }
        else{
            blockUser()
            alert(`Successfully Blocked @${userdetails.username}\n Refresh Feed to see changes.`)
        }
    
        
      }
    },
  );
  async function blockUser(){
    await axios.post(endpoints['block_link'],{
         userid:user.userid, partyid:post.userid
     }).then(res=>{
 
         navigation.goBack()
     })
   }
  const inputcommentid = 'uniqueID';
const likeBottomSheet = useRef(null);
const [likeno,setLikeNo] = useState(post.likesuserlist.length)
    return (
        showPost &&   userdetails && 
        <>

        <View style={[homestyles.post,{borderColor:color_scheme(colorMode,'#dddd')}]} key={index} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >
                      {
                            post.account_type!='anonymous'&&
            <View style={homestyles.posttop}>
                <View style={homestyles.posttopleft}>
                    
                    <View style={homestyles.posttopimg}>
 
                     
                        <Image source={{uri:wrapUIMG(userdetails.uimg)}} style={homestyles.postuserimg}/>   
                        
                    </View>
                    <Pressable style={homestyles.postuserdetails} onPress={()=>navigateToUser()}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[homestyles.postname,{color:color_scheme(colorMode,'#333'),marginRight:5}]}>@{`${userdetails.username}`}</Text>
                            {
                                userdetails.isofficial &&
                            
                            <Verify size="16" color="#1d9bf0" variant="Bold"/>
                        }
                        {
                            userdetails.pinnedorg &&
                            <Image source={{uri:wrapUIMG(userdetails.pinnedorg.org_logo)}} style={{marginLeft:1,width:13,height:13,borderRadius:4}}/>
                        }
                     
                        </View>

        
                        
                    </Pressable>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {/* <TouchableOpacity>
                    
                        <More color="grey" size={16}/>
                    </TouchableOpacity> */}
                     <Text style={homestyles.postdate}>
                                {
                                    getTimeDifference(post.date)
                                } ago
                            </Text>
                </View>
            </View>
            }
            {
                post.account_type=='anonymous'&&
                <View style={{flexDirection:'row',alignItems:'flex-end',
                 justifyContent:'flex-end',
                 paddingVertical:2,
                 paddingHorizontal:10
                 }}>
                {/* <TouchableOpacity>
                
                    <More color="grey" size={16}/>
                </TouchableOpacity> */}
                 <Text style={homestyles.postdate}>
                            {
                                getTimeDifference(post.date)
                            } ago
                        </Text>
            </View>
            }
            
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingBottom: post.account_type=='anonymous'?10:0
            }}
            >
            {
                            post.account_type=='anonymous'&&
                            <Image source={require('../assets/icon.jpeg')} style={[homestyles.postuserimg,{marginRight:1,marginLeft:10}]}/>}
           
            <Pressable style={homestyles.postcontent} onPress={()=>moveToPost()}>
                <Text selectable={true} style={[homestyles.postcontenttext,{color:color_scheme(colorMode,'#333')}]}>
                   {post.content}
                </Text>
            </Pressable>
            </View>
            {
                post.posttype=='poll'&& 
                <RenderPollVote post={post} setPosti={setPosti}/>
            }
            {
                post.posttype=='event'&&
                <RenderEvent post={post} setPosti={setPosti}/>
            }
        {/* <View
        style={{
            width:'100%',
            flexDirection:'row',
            paddingHorizontal:10
        }}
        >
            {
                post.isanouncement==true&&
                <View
                style={{
                    backgroundColor:'#ac58cd47',
                    paddingHorizontal:10,
                    paddingVertical:5,
                    borderRadius:30,
                  
                }}
                >
                    <Text
                    style={{
                        color:'#a330d0',
                        fontSize:12,
                        
                    }}
                    >
                        Announment
                    </Text>
                </View>
            }
        </View> */}
        <View
        style={{
            width:'100%',
            flexDirection:'column',
     

        }}
        >
            {
                post.imgurls.length>0&&
                <RenderImages images={post.imgurls}/>
               

            }
       
        </View>
        <View
        style={{
            width:'100%',
            flexDirection:'row',
            justifyContent:'space-between'
        }}
        >


            <View style={homestyles.postinsights1}>
            <View style={homestyles.postinsight}>
                 <LikeBtn likeno={likeno}  setLikeNo={setLikeNo} setPost={setPosti} likesno={post.likesuserlist.length} postid={post._id} isLike={isLike} setIsLike={setIsLike}/>
                
                </View>
                 
               <View>
               <Pressable onPress={()=>moveToPost()}  style={homestyles.insightbtn}  >
            <MessageText1 color={  color_scheme(colorMode,'#aaa')} size={23} variant="Bold"/>
            <Text style={homestyles.postinsights1text}>
   
                </Text>
        </Pressable> 
               </View>
               <TouchableOpacity  style={homestyles.insightbtn}  onPress={()=>shareBtn()} >
            <Send2 color={  color_scheme(colorMode,'#aaa')} size={23} variant="Bold"/>
            <Text style={homestyles.postinsights1text}>
   
                </Text>
        </TouchableOpacity> 
                 
            </View>
           
            <View>
                
            <TouchableOpacity  style={[homestyles.insightbtn,{
                marginRight:6
            }]} onPress={()=>onMore(post._id)} >
            <Entypo name="dots-three-horizontal"   size={18} color={  color_scheme(colorMode,'#aaa')} />
        
            </TouchableOpacity>
            </View>
            
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:20,
                paddingBottom:10
            }}
            >
            <TouchableOpacity
            onPress={()=>{
                Haptics.impactAsync("medium")
                likeBottomSheet.current.show()}}
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingRight:10
            }}
            >
                <Text
                style={{
                    color:color_scheme(colorMode,'#aaa'),
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5
                    
                }}
                >
                {likeno}
                </Text>
                <Text
                   style={{
                    color:color_scheme(colorMode,'#aaa'),
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5
                    
                }}
                >
                    likes
                </Text>
                
                </TouchableOpacity>
                <Text
                
                style={{
                    color:"#999",
                    fontWeight:"600",
                    fontSize:13,}}>
                •
                </Text>
                <View
            style={{
                paddingLeft:10,
                flexDirection:'row',
                alignItems:'center',
            }}
            >
                <Text
                
                style={{
              color:color_scheme(colorMode,'#aaa'),
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5
                    
                }}>
                {post.commentslist.length}
                </Text>
                <Text
                   style={{
                   color:color_scheme(colorMode,'#aaa'),
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5

                    
                }}
                >
                    comments
                </Text>
            </View>
                </View>
            <View
            style={{
                paddingHorizontal:10
            }}
            >
            {/* <CommentInput  /> */}
            </View>
         
            
        </View>
        <PostLikes likeBottomSheet={likeBottomSheet} post={post} navigation={navigation}/>
        </>
        )
}
