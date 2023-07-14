import React,{useContext, useEffect, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,RefreshControl} from "react-native";
import { homestyles,poststyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Back, MessageSearch} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import PostsList from "./PostsList";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapUIMG } from "../utils/utils";
import Spinner from "./Spinner";
import { AppContext } from "../context/appContext";
import { color_scheme } from "../config/color_scheme";
function RenderComments({post,FetchUsers,usersData}){
 const {colorMode} = useContext(AppContext)
    return ( 
        <View
        style={{
            flexDirection:"column",
            paddingBottom:15
        }}
        >
            {post.commentslist.map((comment,index)=>{
                return (

    
                <View key={index}
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:10,
                    paddingVertical:10,
                    width:'98%',
                    borderBottomWidth: index==post.commentslist.length-1?0: 1,
                    borderBottomColor:color_scheme(colorMode,'#eee')
                }}
                >
                    <Image source={{uri: wrapUIMG(usersData[comment.userid].uimg)}} style={{
                        height:40,width:40,borderRadius:100}}/>
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

                            <Text
                            style={{
                                fontSize:14,
                                color:"#333",
                                fontWeight:'600',
                                marginRight:5
                            }}
                            >
                                {usersData[comment.userid].firstname+' '+usersData[comment.userid].lastname}
                            </Text>
                            <Text
                             style={{
                                fontSize:13,
                                color:"#aaa",
                                fontWeight:'400',
                                marginRight:5
                            }}
                            >
                                @{usersData[comment.userid].username}
                            </Text>
                            </View>
                            <Text
                              style={{
                                fontSize:12,
                                color:"#aaa",
                                fontWeight:'400',
                                marginRight:5
                            }}
                            >
                            {
                                    getTimeDifference(comment.date)
                                } ago
                            </Text>
                        </View>
                        <Text>
                            {comment.comment}
                        </Text>
                    </View>
                </View>
                            )
            })}
        </View>
    )
}

export default function PostPage({navigation,route}){
    const user_ids = []
    const [usersData,setUsersData]= useState(null)
    const {post,userdetails} = route.params
    for (let index = 0; index < post.commentslist.length; index++) {
            if(!user_ids.includes(post.commentslist[index].userid)){
                user_ids.push(post.commentslist[index].userid)
            }
    
        
    }
    const [refreshing, setRefreshing]  =useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        FetchUsers(user_ids)
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      async function FetchUsers(users){
        await axios.post(endpoints['getcommentuser'],{users:users}).then(res=>{
            console.log(res.data)
            setUsersData(res.data)
        })
    }
   
  
    useEffect(()=>{
        FetchUsers(user_ids)
    },[])
    const {colorMode} = useContext(AppContext)
    return (
        <ScrollView style={[poststyles.container,{backgroundColor:color_scheme(colorMode,'white')}]}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        
        }>
            <View style={poststyles.top}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>

        
            <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
            </View>
            <View style={[poststyles.content,{backgroundColor:color_scheme('white')}]}>
                <PostsList navigation={navigation} index={1} move={false} route={route} posti={post} userdetails={userdetails}/>
                <View style={poststyles.commentssec}>
                    <View style={[poststyles.commenthead,{borderColor:color_scheme(colorMode,'#eee')}]}
                    
                    >
                    <Messages2 variant="Bulk" color="#333" />
                    <Text style={poststyles.commentheadtext}>
          Comments ({post.commentslist.length})


                    </Text>
                    </View>
                    <View style={poststyles.comment}>
                
                    </View>
                </View>
            </View>
            {
                usersData==null?<Spinner/>:
       
            <RenderComments post={post} FetchUsers={FetchUsers} usersData={usersData} />     }
        </ScrollView>

    )
}