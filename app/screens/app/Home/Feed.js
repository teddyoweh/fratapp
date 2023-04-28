import React,{useState,useContext,useRef,useEffect,useCallback}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import LikeBtn from "../../../components/LikeBtn";
import PostsList from "../../../components/PostsList";
import MakePost from "./MakePost";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { createStackNavigator } from "@react-navigation/stack";

function LoadingScreen(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:'#b8b8b8',fontWeight:'600',fontSize:20}}>Loading...</Text>
        </View>
    )
}
function MapOutPosts({posts,navigation,users}){
 
    return(

        posts.map((post,index)=>{
         
            return(
                Object.keys(users).includes(post.userid)&&<PostsList index={index} navigation={navigation} post={post} userdetails={users[post.userid]}/>
            )
        })
    )
}


export default function Feed({navigation}){
    const FeedStacks = createStackNavigator()
    return (
            <FeedStacks.Navigator
            
            screenOptions={
                { 
                    headerShown:false,
                }
            }>

                <FeedStacks.Screen name="AllFeed" component={AllFeed} />
                <FeedStacks.Screen name="AnnouncementFeed" component={AnnounmentFeed} />
                <FeedStacks.Screen name="EventFeed" component={EventFeed} />
                <FeedStacks.Screen name="PostFeed" component={PostFeed} />
                <FeedStacks.Screen name="PollsFeed" component={PollsFeed} />
                <FeedStacks.Screen name="OpportunitiesFeed" component={OpportunitiesFeed} />

            </FeedStacks.Navigator>
    )
}

function AnnounmentFeed(){
    return <AllFeed type='announcement'/>
}
function EventFeed(){
    return <AllFeed type='event'/>
}
function PostFeed(){
    return <AllFeed type='post'/>
}
function PollsFeed(){
    return <AllFeed type='poll'/>
}
function OpportunitiesFeed(){
    return <AllFeed type='opportunity'/>
}

function AllFeed({navigation,route,type}){
    const [refreshing, setRefreshing] = React.useState(false);
    const [posts,setPost]  = useState(null)
    const [postData, setPostData] = useState(null)
    const [users,setUsers] = useState(null)
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
 



async function loadPosts(){
 
    await axios.post(endpoints['getposts'],{cursor:null}).then(res=>{
        setPostData(res.data)
   
        
      
    
         
    })

}
const memoizedLoadPosts = useCallback(() => {
    loadPosts();
  });
  
  useEffect(() => {
    memoizedLoadPosts()
  });

return (
    <ScrollView  contentContainerStyle={homestyles.postcontainer}
            
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={()=>loadPosts()} />
      }>

{postData==null?<LoadingScreen/>:<MapOutPosts posts={postData.posts} navigation={navigation} users={postData.users} />
        }
  

    </ScrollView>
)

}


