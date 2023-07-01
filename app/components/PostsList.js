import React,{useState,useEffect,useContext, useRef}from "react";
import { View,Text,Dimensions, Image,TouchableOpacity, ScrollView, TextInput, Pressable} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, MessageText, Link2, Link, MessageText1, Send2, ArrowUp} from 'iconsax-react-native';
import { FontAwesome5,Entypo,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';

import LikeBtn from "./LikeBtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapPostImg, wrapUIMG } from "../utils/utils";
import { AppContext } from "../context/appContext";




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

    return (


    <View style={[homestyles.postcommentbox,{
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    }]}>
        <TextInput
        style={{
            width:'80%',
            height:'100%',
        }}
        value={comment}
        onChangeText={(text)=>setComment(text)}
        placeholder="Add Comment"
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
backgroundColor:'#333',

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


    return (
        userdetails && 
        <Pressable style={homestyles.post} key={index} >
            <View style={homestyles.posttop}>
                <View style={homestyles.posttopleft}>
                    <View style={homestyles.posttopimg}>
                        <Image source={{uri:wrapUIMG(userdetails.uimg)}} style={homestyles.postuserimg}/>
                        
                    </View>
                    <Pressable style={homestyles.postuserdetails} onPress={()=>navigateToUser()}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={homestyles.postname}>{`${userdetails.firstname} ${userdetails.lastname}`}</Text>
                           
                        </View>

        
                        <Text style={homestyles.postusername}>@{`${userdetails.username}`}</Text>
                    </Pressable>
                </View>
                <View style={homestyles.posttopright}>
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
                <Text selectable={true} style={homestyles.postcontenttext}>
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}
            
                ref={scrollViewRef}
                // onScroll={(e)=>console.log(e)}
                contentContainerStyle={{
                  
                    // paddingHorizontal:10,
                    flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    // /justifyContent:'center',
                    width:'100%',
                    paddingVertical:10,
                 
                    
                }}
                >
                    {
                        post.imgurls.map((imgurl,index)=>{
                            const {width,height} = scaleImageToScreen(imgurl.width,imgurl.height)
                            return(
                              
                                <View
                                key={index}
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
                            
                            )
                        }
                        )
                        }
                </ScrollView>

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
            <MessageText1 color="#aaa" size={23} variant="Bold"/>
            <Text style={homestyles.postinsights1text}>
   
                </Text>
        </Pressable> 
               </View>
               <View  style={homestyles.insightbtn}  >
            <Send2 color="#aaa" size={23} variant="Bold"/>
            <Text style={homestyles.postinsights1text}>
   
                </Text>
        </View> 
                 
            </View>
           
            <View>
                
            <View  style={homestyles.insightbtn}  >
            <Entypo name="dots-three-horizontal" size={18} color="#aaa" />
        
            </View>
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
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingRight:10
            }}
            >
                <Text
                style={{
                    color:"#aaa",
                    fontWeight:"600",
                    fontSize:16,
                    marginRight:5
                    
                }}
                >
                {post.likesuserlist.length}
                </Text>
                <Text
                   style={{
                    color:"#aaa",
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5
                    
                }}
                >
                    Likes
                </Text>
                
                </View>
                <Text
                
                style={{
                    color:"#999",
                    fontWeight:"600",
                    fontSize:16,}}>
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
                    color:"#aaa",
                    fontWeight:"600",
                    fontSize:16,
                    marginRight:5
                    
                }}>
                {post.commentslist.length}
                </Text>
                <Text
                   style={{
                    color:"#aaa",
                    fontWeight:"600",
                    fontSize:13,
                    marginRight:5

                    
                }}
                >
                    Comments
                </Text>
            </View>
                </View>
            <View style={homestyles.postinsights}>
             <CommentInput postid={post._id} setPost={setPosti}/>
                

            </View>
        </Pressable>
        )
}
