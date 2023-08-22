import React,{useState,useEffect,useContext, useRef}from "react";
import { View,Text,Dimensions, Image,TouchableOpacity, ScrollView, TextInput, Pressable, Share, ActionSheetIOS, KeyboardAvoidingView, InputAccessoryView, Button} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, MessageText, Link2, Link, MessageText1, Send2, ArrowUp, Verify} from 'iconsax-react-native';
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
            height:pageheight,
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
                            width:windowWidth
                        }}
                        >

                        
                       
                        <Image key={index} source={{uri:wrapPostImg(imgurl.uri)}} style={{
                            //width:windowWidth-1,
                          
                            width:width,
                            height:height,
                            
                            // marginRight:20,
                            marginBottom:10,
                            borderRadius:1,
                       
                      
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
        {
            images.map((im,index)=>{
                return (
                    <TouchableOpacity
                    key={index}
                    style={{
                        height:25,
                        width:25,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:"center",
                        marginLeft:8,
                        // backgroundColor:color_scheme(colorMode,'#aaa'),
                        borderWidth:1,
                        borderColor:index==cidnex?color_scheme(colorMode,'#eee'):'transparent',
                        borderRadius:100,
                    }}
                    onPress={()=>pagerRef.current.setPage(index)}
                    >
                        <View
                        style
                        ={{
                            height:15,
                            width:15,
                            backgroundColor:index==cidnex?color_scheme(colorMode,'#aaa'): color_scheme(colorMode,'#eee'),
                            borderRadius:100,
                      
                            
                        }}
                        >

                        </View>
                    </TouchableOpacity>
                    
                )
            })
        }

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
export default function PostsList({index,navigation,posti,userdetails,move}){
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const windowScale = Dimensions.get('window').scale;
    
 const [post,setPosti] =useState(posti)
 
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
      alert('shiot')
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }else{
        const offsetX = index * windowWidth;
      alert('dam')
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
  const morepostoptions = post.userid ==user.userid? ['Cancel', 'Report', 'Delete']:['Cancel', 'Report', ]
  const onMore = () =>
  
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
        setResult(String(Math.floor(Math.random() * 100) + 1));
      } else if (buttonIndex === 2) {
        setResult('🔮');
      }
    },
  );
  const inputcommentid = 'uniqueID';
const likeBottomSheet = useRef(null);
    return (
        userdetails && 
        <>

        <View style={[homestyles.post,{borderColor:color_scheme(colorMode,'#dddd')}]} key={index} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >
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
                            
                            <Verify size="18" color="#1d9bf0" variant="Bold"/>
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
            <Pressable style={homestyles.postcontent} onPress={()=>moveToPost()}>
                <Text selectable={true} style={[homestyles.postcontenttext,{color:color_scheme(colorMode,'#333')}]}>
                   {post.content}
                </Text>
            </Pressable>{post.links.length>0&&
            <View style={{flexDirection:'column',marginVertical:8,borderRadius:30,paddingVertical:2}}>
                
        {
            post.links.map((link,index)=>{
                return(
                    <View key={index} style={{flexDirection:'row',justifyContent
                    :'space-between',alignItems:'center',paddingVertical:3}}>
                    
                    <View key={index}style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <Text style={{marginLeft:5,color:'blue'}}>{link}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>remove(link)}>
                    
                    </TouchableOpacity>
                    </View>
                )
            })
        }
        </View>}
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
                 <LikeBtn setPost={setPosti} likesno={post.likesuserlist.length} postid={post._id} isLike={isLike} setIsLike={setIsLike}/>
                
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
                
            <TouchableOpacity  style={homestyles.insightbtn} onPress={()=>onMore()} >
            <Entypo name="dots-three-horizontal" size={18} color={  color_scheme(colorMode,'#aaa')} />
        
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
                {post.likesuserlist.length}
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
            <CommentInput  />
            </View>
         
            
        </View>
        <PostLikes likeBottomSheet={likeBottomSheet} post={post} navigation={navigation}/>
        </>
        )
}
