import React,{useState,useContext,useRef,useEffect,useCallback}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, StyleSheet, RefreshControl, Dimensions, Animated, ActivityIndicator, FlatList} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Add, TruckRemove} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import LikeBtn from "../../../components/LikeBtn";
import PostsList from "../../../components/PostsList";
import MakePost from "./MakePost";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../../../components/Loading";
import { color_scheme } from "../../../config/color_scheme";
import { useFocusEffect } from '@react-navigation/native';
import api from "../../../config/api";
import * as Haptics from 'expo-haptics'
import * as Animatable from 'react-native-animatable';
import PostSkeleton from "../../../components/PostSkeleton";
import Spinner from "../../../components/Spinner";
 
import { serverhost } from "../../../config/ip";
 
 
 
const FeedStacks = createStackNavigator()

export default function Feed({navigation,postBottomSheet}){
 
    return (
            <FeedStacks.Navigator
            
            screenOptions={
                { 
                    headerShown:false,
                }
            }>

                <FeedStacks.Screen name="AllFeed" initialParams={{postBottomSheet:postBottomSheet}} component={AllFeed} />
        
            </FeedStacks.Navigator>
    )
}

 

function AllFeed({navigation,route}){
 
    const postBottomSheet = useRef()
    const {user,user_location} = useContext(AppContext)
 
    const [refreshing, setRefreshing] = React.useState(false);
    const [posts,setPost]  = useState(null)
    const [postData, setPostData] = useState(null)
    const [users,setUsers] = useState(null)
    const [randomstate, setRandomState] = useState(0)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const onRefresh =async () => {
 
        setRefreshing(true);
        
        await api.post(endpoints['getposts'], {postids_:postData?.postids, userid:user.userid,user_location,cursor_stat:"prev",cursor:postData.posts[0]?._id }).then(res => {
     
            if(postData){
             
              
                const xposts = [... new Set([...res.data.posts,...postData.posts])]
                setPostData((prevData) => ({
                    users: { ...prevData.users, ...res.data.users },
                    posts: [...res.data.posts,...prevData.posts],
                    postids:[...new Set([...prevData.postids,...res.data.postids])],
                    cursor:postData.cursor
                  }));
                setRandomState(getRandomInt(0,22323242424)+[...res.data.posts,...postData.posts].length )
                
            }else{
           
                setPostData(res.data)
         
            }
        
      
                
            
     
     
        });
        setTimeout(async() => {
         
            setRefreshing(false);
        }, 2000);
    }
 
   
  const {colorMode} = useContext(AppContext)
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  const [loadingNewPost, setLoadingNewPost] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);


 

 
 
  const [isLoading, setIsLoading] = useState(true);
  const nextPageIdentifierRef = useRef();
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);

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

//   if (!isFirstPageReceived && isLoading) {
//     // Show loader when fetching first page data.
//     return <ActivityIndicator size={'small'} />;
//   }

  const renderItem= React.memo(({item,index})=>{
    const users = postData.users
    const post = item
  
 
    return (
        Object.keys(users).includes(post.userid) && <PostsList  route={route} move={true} index={index} navigation={navigation} posti={post} userdetails={users[post.userid]} />
    )
})

const MemoizedRenderItem = React.memo(({ item, index, route, navigation, postData }) => {
    const users = postData.users;
    const post = item;
 
  
    return (
      Object.keys(users).includes(post.userid) && (
        <PostsList route={route} move={true} index={index} navigation={navigation} posti={post} userdetails={users[post.userid]} />
      )
    );
  });

 

const [dnd, setDnd] = useState(false)
const memoizedLoadPosts = useCallback(async () => {
    const cux = postData?.posts[0]?._id
    const cstat = postData?"prev":null
    await api.post(endpoints['getposts'], {postids_:postData?.postids, userid:user.userid,user_location,cursor_stat:cstat,cursor:cux}).then(res => {

        if(postData){
            const xposts = [... new Set([...res.data.posts,...postData.posts])]
          
            setPostData((prevData) => ({
                users: { ...prevData.users, ...res.data.users },
                posts: [...new Set([ ...res.data.posts,...prevData.posts])],
                  postids:[...new Set([...prevData.postids,...res.data.postids])],
                  cursor:xposts[xposts.length-1]?._id,
              }));
            
        }else{
            
            setPostData(res.data)
        
        }
    
  
            
        
 
 
    });
});
  
useEffect(() => {
 
    memoizedLoadPosts();
 
  }, []);

  async function fetchNextPage(){
 
    await api.post(endpoints['getposts'], {postids_:postData?.postids, userid:user.userid,user_location,cursor:postData.cursor,cursor_stat:"next" }).then(res => {
        
        if(postData){
            if(res.data.posts.length!=0){

        
            const xposts = [...new Set([...postData.posts, ...res.data.posts])]
 
            setPostData((prevData) => ({
                users: { ...prevData.users, ...res.data.users },
                posts: [...new Set([...prevData.posts, ...res.data.posts])],
                  postids:[...new Set([...prevData.postids,...res.data.postids])],
                  cursor:res.data.cursor
              }));
            }
            else{
                setHasReachedBottom(true)
            }
         
        }else{
            setPostData(res.data)
       
        }
    
  
            
        
 
 
    });
 }
return (
  

  <View
  style={{
    backgroundColor:color_scheme(colorMode,'white'),
    flex:1,
    height:'100%'
  }}
  >


 
    
    {
     postData ?  
  
    <FlatList
    // extraData={randomstate}
      data={postData.posts}
      ListEmptyComponent={    <View
        style={{
            flex:1,
            height:Dimensions.get('screen').height/2,
            flexDirection:'row',
            alignItems:"center",
            justifyContent:"center",
            
            
        }}
        >
            <Text
            style={{
                color:color_scheme(colorMode,'#aaa'),
                fontSize:25,
                fontWeight:'600'
            }}
            >
                No Posts
            </Text>
            </View>}

    renderItem={({ item, index }) => (
        <MemoizedRenderItem item={item} index={index} route={route} navigation={navigation} postData={postData} />
      )}

      
        keyExtractor={(item, index) => { index}}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.2}
      ListFooterComponent={hasReachedBottom?<View/>:ListEndLoader}
      
      refreshControl={<RefreshControl
        colors={["#9Bd35A", "#689F38"]}
        refreshing={refreshing}
        onRefresh={onRefresh} />}
 
    /> :


    
    <View>
    {
        [...Array(10)].map((_, i) => {
            return <PostSkeleton key={i} />;
        }
        )

    }
</View>
    }

<View style={homestyles.postbtndiv}>
                <TouchableOpacity style={homestyles.postbtn} onPress={()=>{
                    Haptics.impactAsync('light')
                    navigation.navigate("MakePost",{
                        setPost:setPostData,
                        postd:postData,
                   
                    })
                   }}> 
                <Add color="white" variant="Broken" size={42} />
                {/* <Text style={homestyles.postbtntext}>New Post</Text> */}
                </TouchableOpacity>

            </View>
    </View>
 
)

}


 
 
  