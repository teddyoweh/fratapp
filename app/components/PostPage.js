import React,{useCallback, useContext, useEffect, useRef, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,RefreshControl, KeyboardAvoidingView, ActionSheetIOS, Alert, FlatList, ActivityIndicator} from "react-native";
import { homestyles,poststyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Back, MessageSearch, Verify} from 'iconsax-react-native';
import { FontAwesome5,Entypo,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import PostsList from "./PostsList";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapUIMG } from "../utils/utils";
import Spinner from "./Spinner";
import { AppContext } from "../context/appContext";
import { color_scheme } from "../config/color_scheme";
import api from "../config/api";
// async function FetchNextComments({postid,cursor}){
//   await api.post(endpoints['fetchcomments'],{
//     postId:postid,
//     cursor:cursor
//   }).then({

//   })
// }


const MemoizedRenderItem = React.memo(({comment,index})=>{
  const {colorMode} = useContext(AppContext)
 
 console.log(index,comment)
  return (
   comment && comment.userdata &&  <View key={index}
    style={{
        flexDirection:'row',
        alignItems:'flex-start',
        paddingHorizontal:15,
        paddingVertical:20,
        backgroundColor:"#191919",
        width:'98%',
        borderRadius:15,
        marginBottom:5
     
        // borderBottomWidth: index==leng-1?0: 1,
        // borderBottomColor:color_scheme(colorMode,'#eee')
    }}
    >
        <Image source={{uri: wrapUIMG(comment.userdata.uimg)}} style={{
            height:36,width:36,borderRadius:100}}/>
        <View
        style={{
            flexDirection:'column',
          paddingHorizontal:10,
          width:'95%',
  

        }}
        >
            <View
            style={{
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-between'
            }}
            >
                <View
                  style={{
                    flexDirection:'row',
                    alignItems:'flex-start'
                }}
                >

             
                <Text
                 style={{
                    fontSize:13,
                    color:"#fff",
                    fontWeight:'600',
                    marginRight:5
           
                }}
                >
                    @{comment.userdata.username}
                </Text>
                {
                    comment.userdata.isofficial &&
                
                <Verify size="12" color="#1d9bf0" variant="Bold"/>
            }
                </View>
                <View
                
                >
        
                <Text
                  style={{
                    fontSize:10,
                    fontWeight:'400',
                    color:'#828282',
                    marginRight:5,
                    
                }}
                >
                {
                        getTimeDifference(comment.date)
                    } ago
                </Text>
         
                </View>
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'flex-end',
                justifyContent:'space-between',
                width:'94%',
                marginTop:9
            
            }}
            >
            <Text
            style={{
                fontSize:14,
                color:color_scheme(colorMode,'black'),
                fontWeight:'400',
                marginRight:5,
   
            }}
            >
                {comment.comment}

            </Text>
            <TouchableOpacity  style={[ {

}]} onPress={()=>onMore(comment.id)} >
<Entypo name="dots-three-horizontal"   size={18} color={  color_scheme(colorMode,'#aaa')} />

</TouchableOpacity>
            </View>
           
            
        </View>
    </View>
  )
})
// function RenderComments({post,FetchPost}){
//  const {user,colorMode} = useContext(AppContext)
//  const leng = 10
 
//  const memoizedLoadPosts = useCallback(async () => {
//     const cux = postData?.posts[0]?._id
//     const cstat = postData?"prev":null
//     await api.post(endpoints['getposts'], {postids_:postData?.postids, userid:user.userid,user_location,cursor_stat:cstat,cursor:cux}).then(res => {

//         if(postData){
//             const xposts = [... new Set([...res.data.posts,...postData.posts])]
          
//             setPostData((prevData) => ({
//                 users: { ...prevData.users, ...res.data.users },
//                 posts: [...new Set([ ...res.data.posts,...prevData.posts])],
//                   postids:[...new Set([...prevData.postids,...res.data.postids])],
//                   cursor:xposts[xposts.length-1]?._id,
//               }));
            
//         }else{
            
//             setPostData(res.data)
        
//         }
    
  
            
        
 
 
//     });
// });
  
 
// function deleteComment(id){
//     axios.post(endpoints['deletecomment'],{id:id}).then(res=>{
//         FetchPost()
//     })

// }
// const [activedel,setActivedel] = useState('')
// const onMore = (id) =>
  
// ActionSheetIOS.showActionSheetWithOptions(
//     {
//       options: ['Delete', 'Cancel'],
//       destructiveButtonIndex: 0,
//       cancelButtonIndex: 1,
//       userInterfaceStyle: 'dark',
//     },
//     (buttonIndex) => {
//       if (buttonIndex === 1) {
//         // cancel action
//         Alert.alert('Cancel', 'Delete action canceled');
//       } else if (buttonIndex === 0) {
//         if (post.userid === user.userid) {
//           // Double verification
//           Alert.alert(
//             'Confirm Delete',
//             'Are you sure you want to delete?',
//             [
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//               {
//                 text: 'Delete',
//                 onPress: () => deleteComment(id),
//                 style: 'destructive',
//               },
//             ],
//             { cancelable: true }
//           );
//         } else {
//           Alert.alert('Unauthorized', 'You are not authorized to delete this comment');
//         }
//       }
//     }
//   );
//     return ( 
//       // <View>

    
//       // {
//       //   post.comments.length==0?
//       //        <View
//       //       style={{
//       //           flex:1,
//       //           flexDirection:'column',
//       //           alignItems:'center',
//       //           justifyContent:'center'
//       //       }}
//       //       >
//       //             <Image source={require("../assets/island.png")}
//       //     style={{
//       //       height:200,
//       //       width:200
//       //     }}
//       //     />
//       //        <Text
//       //           style={{
//       //               color:color_scheme(colorMode,'#eee'),
//       //               fontSize:18,
//       //               fontWeight:'700'
//       //           }}
//       //           >
//       //               No Comments
//       //           </Text>
//       //     </View>
//       //     :
          
//       //     <View
//       //     style={{
//       //         flexDirection:"column",
//       //         paddingBottom:10,
         
//       //         marginHorizontal:10,
    
//       //     }}
//       //     >

//       //         {post.comments.map((comment,index)=>{
//       //             return (
  
      
//       //             <View key={index}
//       //             style={{
//       //                 flexDirection:'row',
//       //                 alignItems:'flex-start',
//       //                 paddingHorizontal:15,
//       //                 paddingVertical:20,
//       //                 backgroundColor:"#191919",
//       //                 width:'98%',
//       //                 borderRadius:15,
//       //                 marginBottom:5
                   
//       //                 // borderBottomWidth: index==leng-1?0: 1,
//       //                 // borderBottomColor:color_scheme(colorMode,'#eee')
//       //             }}
//       //             >
//       //                 <Image source={{uri: wrapUIMG(comment.userdata.uimg)}} style={{
//       //                     height:36,width:36,borderRadius:100}}/>
//       //                 <View
//       //                 style={{
//       //                     flexDirection:'column',
//       //                   paddingHorizontal:10,
//       //                   width:'95%',
                
  
//       //                 }}
//       //                 >
//       //                     <View
//       //                     style={{
//       //                         flexDirection:'row',
//       //                         alignItems:'flex-start',
//       //                         justifyContent:'space-between'
//       //                     }}
//       //                     >
//       //                         <View
//       //                           style={{
//       //                             flexDirection:'row',
//       //                             alignItems:'flex-start'
//       //                         }}
//       //                         >
  
                           
//       //                         <Text
//       //                          style={{
//       //                             fontSize:13,
//       //                             color:"#fff",
//       //                             fontWeight:'600',
//       //                             marginRight:5
                         
//       //                         }}
//       //                         >
//       //                             @{comment.userdata.username}
//       //                         </Text>
//       //                         {
//       //                             comment.userdata.isofficial &&
                              
//       //                         <Verify size="12" color="#1d9bf0" variant="Bold"/>
//       //                     }
//       //                         </View>
//       //                         <View
                              
//       //                         >
                      
//       //                         <Text
//       //                           style={{
//       //                             fontSize:10,
//       //                             fontWeight:'400',
//       //                             color:'#828282',
//       //                             marginRight:5,
                                  
//       //                         }}
//       //                         >
//       //                         {
//       //                                 getTimeDifference(comment.date)
//       //                             } ago
//       //                         </Text>
                       
//       //                         </View>
//       //                     </View>
//       //                     <View
//       //                     style={{
//       //                         flexDirection:'row',
//       //                         alignItems:'flex-end',
//       //                         justifyContent:'space-between',
//       //                         width:'94%',
//       //                         marginTop:9
                          
//       //                     }}
//       //                     >
//       //                     <Text
//       //                     style={{
//       //                         fontSize:14,
//       //                         color:color_scheme(colorMode,'black'),
//       //                         fontWeight:'400',
//       //                         marginRight:5,
                 
//       //                     }}
//       //                     >
//       //                         {comment.comment}
           
//       //                     </Text>
//       //                     <TouchableOpacity  style={[ {
              
//       //         }]} onPress={()=>onMore(comment.id)} >
//       //         <Entypo name="dots-three-horizontal"   size={18} color={  color_scheme(colorMode,'#aaa')} />
          
//       //         </TouchableOpacity>
//       //                     </View>
                         
                          
//       //                 </View>
//       //             </View>
//       //                         )
//       //         })}
//       //     </View>
//       // }
//       // </View>
//       <RenderFlatList/>
       
//     )
// }

export default function PostPage({navigation,route}){
    const user_ids = []
   
    const {post,userdetails} = route.params
    for (let index = 0; index < post.commentslist.length; index++) {
            if(!user_ids.includes(post.commentslist[index].userid)){
                user_ids.push(post.commentslist[index].userid)
            }
    
        
    }
    const likeBottomSheet = useRef();
    const [refreshing, setRefreshing]  =useState(false);
    const [posti,setPosti] = useState(null)
     const FetchPost= useCallback(async ()=>{
        await axios.post(endpoints['getonepost'],{id:post._id}).then(res=>{
 
            setPosti(res.data)
  
          
   
        })  })

        const [hasReachedBottom, setHasReachedBottom] = useState(false);

   async function FetchNextPostComments(){
          await api.post(endpoints['getonepost'],{id:post._id,cursor:posti?.cursor}).then(res=>{
            if(posti?.cursor){
              if(res.data.comments.length!=0){
              
    
              setPosti((prevData) => ({
                 ...res.data,
                 comments:[...new Set([...prevData.comments,...res.data.comments])]
              }));
            }else{
              setHasReachedBottom(true)
 
            }
            }else{
              setPosti(res.data)
            }
            
     
          } )

        }
        const ListEndLoader = () => {
          if(hasReachedBottom==false){
  
       
       
        return <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          paddingVertical:15,
          justifyContent:'center',
          
        }}
        >
  
         <ActivityIndicator size={'small'} style={{
          
        }} />
        </View>;   }
    
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
   
        FetchPost()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      
  
      const fetchNextPost = React.useCallback(() => {
 
   
        FetchPost()
      
      }, []);
      

    useEffect(()=>{
      FetchPost()
    },[])
    const {colorMode} = useContext(AppContext)
    function RenderFlatList({data}){
 
      const {colorMode} = useContext(AppContext)
      return (
        <FlatList
        data={data}
        ListEmptyComponent={
          <View
          style={{
              flex:1,
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center'
          }}
          >
                <Image source={require("../assets/island.png")}
        style={{
          height:200,
          width:200
        }}
        />
           <Text
              style={{
                  color:color_scheme(colorMode,'#eee'),
                  fontSize:18,
                  fontWeight:'700'
              }}
              >
                  No Comments
              </Text>
        </View>
        }
    
        renderItem={({item,index})=>(
    
            
             <MemoizedRenderItem key={index} comment={item} index={index}/>

            
      )}
        keyExtractor={(item, index) => { index}}

        onEndReached={FetchNextPostComments}
        onEndReachedThreshold={0.2}
        ListFooterComponent={hasReachedBottom?<View/>:ListEndLoader}

        />
      )
    }
    return (
 
        <View style={[poststyles.container,{backgroundColor:color_scheme(colorMode,'white')}]}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchNextPost} />
        
        }>
                   <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
         
          flex:1,
      }}
      keyboardVerticalOffset={60}
      > 
            <View style={poststyles.top}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>

        
            <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
            </View>
            <View style={[poststyles.content,{backgroundColor:color_scheme('white')}]}>
                <PostsList navigation={navigation} index={1} move={false} route={route} posti={post} userdetails={userdetails} ispostpage={true} commentOnRefresh={onRefresh}/>
                {
                        posti &&
                <View style={poststyles.commentssec}>
                    <View style={[poststyles.commenthead, ]}
                    
                    >
                    <Messages2 variant="Bold" color="#aaa" />
           
               
                    <Text style={poststyles.commentheadtext}>
               
          Comments ({posti?.count})


                    </Text>    
                    </View>
                    <View style={poststyles.comment}>
                
                    </View>
                </View>
                 }
            </View>
            {
                posti==null?<View style={{
                    marginTop:20
                }}>
               <Spinner/>     
               </View>:
            <RenderFlatList data={posti.comments}/>}
            {/* // <RenderComments post={posti} FetchPost={FetchPost}  />      */}
                    </KeyboardAvoidingView>
          </View>


    )
}