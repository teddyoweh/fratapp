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
import Loading from "../../../components/Loading";

function LoadingScreen(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:'#b8b8b8',fontWeight:'600',fontSize:20}}>Loading...</Text>
        </View>
    )
}
function MapOutPosts({posts,navigation,users,route}){
 
    return(
<View
style={{
    flex:1,
height:'100%'
}}
>
{



        posts.map((post, index) => (
            Object.keys(users).includes(post.userid) && <PostsList key={index} route={route} move={true} index={index} navigation={navigation} posti={post} userdetails={users[post.userid]} />
        ))
    
} 
    </View>
)}


export default function Feed({navigation,postBottomSheet}){
    const FeedStacks = createStackNavigator()
    return (
            <FeedStacks.Navigator
            
            screenOptions={
                { 
                    headerShown:false,
                }
            }>

                <FeedStacks.Screen name="AllFeed" initialParams={{postBottomSheet:postBottomSheet}} component={AllFeed} />
                <FeedStacks.Screen name="AnnouncementFeed" initialParams={{postBottomSheet:postBottomSheet}} component={AnnounmentFeed} />
                <FeedStacks.Screen name="EventFeed" initialParams={{postBottomSheet:postBottomSheet}} component={EventFeed} />
                <FeedStacks.Screen name="PostFeed" initialParams={{postBottomSheet:postBottomSheet}}component={PostFeed} />
                <FeedStacks.Screen name="PollsFeed" initialParams={{postBottomSheet:postBottomSheet}} component={PollsFeed} />
                <FeedStacks.Screen name="OpportunitiesFeed" initialParams={{postBottomSheet:postBottomSheet}} component={OpportunitiesFeed} />

            </FeedStacks.Navigator>
    )
}

function AnnounmentFeed({navigation,postBottomSheet}){
    return <AllFeed type='announcement'  postBottomSheet={postBottomSheet}  navigation={navigation}/>
}
function EventFeed({navigation,postBottomSheet}){
    return <AllFeed type='event' postBottomSheet={postBottomSheet}  navigation={navigation}/>
}
function PostFeed({navigation,postBottomSheet}){
    return <AllFeed type='post'  postBottomSheet={postBottomSheet}  navigation={navigation}/>
}
function PollsFeed({navigation,postBottomSheet}){
    return <AllFeed type='poll'  postBottomSheet={postBottomSheet}  navigation={navigation}/>
}
function OpportunitiesFeed({navigation,postBottomSheet}){
    return <AllFeed type='opportunity'  postBottomSheet={postBottomSheet}  navigation={navigation}/>
}

function AllFeed({navigation,route,type}){
    const {postBottomSheet} = route.params
    
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
const MemoizedMapOutPosts = React.memo(MapOutPosts);

const memoizedLoadPosts = useCallback(async () => {
    const res = await axios.post(endpoints['getposts'], { cursor: null });
 
    setPostData(res.data);
}, []);
  
  useEffect(() => {
    memoizedLoadPosts()
  }, []);

return (
  

  <View
  style={{
    backgroundColor:'white',
    flex:1,
    height:'100%'
  }}
  >


    <ScrollView  contentContainerStyle={homestyles.postcontainer}
            
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={()=>loadPosts()} />
      }>
 
{
postData ?

<MemoizedMapOutPosts posts={postData.posts} navigation={navigation} route={route}  users={postData.users} />

: <Loading />}
  

    </ScrollView>
    <MakePost navigation={navigation} setPost={setPostData} postd = {postData} postBottomSheet={ postBottomSheet}/>
    </View>
 
)

}


