import React,{useState,useContext,useRef,useEffect,useCallback}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Dimensions, Animated} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Add} from 'iconsax-react-native';
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
function LoadingScreen(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:'#b8b8b8',fontWeight:'600',fontSize:20}}>Loading...</Text>
        </View>
    )
}
function MapOutPosts({posts,navigation,users,route}){
 const {user,colorMode} = useContext(AppContext)
 
    return(
<View
style={{
    flex:1,
height:'100%'
}}
>
{
posts.length>0?


        posts.map((post, index) => (
            Object.keys(users).includes(post.userid) && <PostsList key={index} route={route} move={true} index={index} navigation={navigation} posti={post} userdetails={users[post.userid]} />
        )):<View
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
            </View>
    
} 
    </View>
)}
 
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
                {/* <FeedStacks.Screen name="AnnouncementFeed" initialParams={{postBottomSheet:postBottomSheet}} component={AnnounmentFeed} />
                <FeedStacks.Screen name="EventFeed" initialParams={{postBottomSheet:postBottomSheet}} component={EventFeed} />
                <FeedStacks.Screen name="PostFeed" initialParams={{postBottomSheet:postBottomSheet}}component={PostFeed} />
                <FeedStacks.Screen name="PollsFeed" initialParams={{postBottomSheet:postBottomSheet}} component={PollsFeed} />
                <FeedStacks.Screen name="OpportunitiesFeed" initialParams={{postBottomSheet:postBottomSheet}} component={OpportunitiesFeed} /> */}

            </FeedStacks.Navigator>
    )
}

// function AnnounmentFeed({navigation,route}){
//     return <AllFeed type='announcement'  postBottomSheet={route.params.postBottomSheet}  navigation={navigation}/>
// }
// function EventFeed({navigation,route}){
//     return <AllFeed type='event' postBottomSheet={route.params.postBottomSheet}  navigation={navigation}/>
// }
// function PostFeed({navigation,route}){
//     return <AllFeed type='post'  postBottomSheet={route.params.postBottomSheet}  navigation={navigation}/>
// }
// function PollsFeed({navigation,route}){
//     return <AllFeed type='poll'  postBottomSheet={route.params.postBottomSheet}  navigation={navigation}/>
// }
// function OpportunitiesFeed({navigation,route}){
//     return <AllFeed type='opportunity'  postBottomSheet={route.params.postBottomSheet}  navigation={navigation}/>
// }

function AllFeed({navigation,route}){
 
    const postBottomSheet = useRef()
 
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
 
    await api.post(endpoints['getposts'], { cursor: null }).then(res => {
        // Get the new posts from the response
        const newPosts = res.data.posts;
    
        // Check if each new post already exists in the postData.posts array
        const uniqueNewPosts = newPosts.filter(newPost => 
            !postData.posts.some(existingPost => existingPost._id === newPost._id)
        );
    
        // Update the state with the unique new posts
        setPostData(prevData => ({
            ...prevData,
            posts: [...uniqueNewPosts,...prevData.posts, ]
        }));
        console.log(`Number of new unique posts added: ${uniqueNewPosts.length}`);

    });
    

}
const MemoizedMapOutPosts = React.memo(MapOutPosts);

const memoizedLoadPosts = useCallback(async () => {
    const res = await api.post(endpoints['getposts'], { cursor: null });
 
    setPostData(res.data);
}, []);
  
//   useEffect(() => {
//     memoizedLoadPosts()
//   }, []);
  useFocusEffect(
    React.useCallback(() => {
        memoizedLoadPosts()
 
    }, [])
  );

  const {colorMode} = useContext(AppContext)
  
return (
  

  <View
  style={{
    backgroundColor:color_scheme(colorMode,'white'),
    flex:1,
    height:'100%'
  }}
  >


    <ScrollView  contentContainerStyle={[homestyles.postcontainer,{
        backgroundColor:color_scheme(colorMode,'white')
    }]}
       scrollsToTop={true} 
       showsVerticalScrollIndicator={false}    
       //alwaysBounceVertical={true}
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={()=>loadPosts()} />
      }>
 
{
postData ?

<MemoizedMapOutPosts posts={postData.posts} navigation={navigation} route={route}  users={postData.users} />

: <Loading />}
  

    </ScrollView>
    <MakePost navigation={navigation} setPost={setPostData} postd={postData} postBottomSheet={postBottomSheet
 }/>

<View style={homestyles.postbtndiv}>
                <TouchableOpacity style={homestyles.postbtn} onPress={()=>{
                    Haptics.impactAsync('light')
                    postBottomSheet.current.show()}}> 
                <Add color="white" variant="Broken" size={42} />
                {/* <Text style={homestyles.postbtntext}>New Post</Text> */}
                </TouchableOpacity>

            </View>
    </View>
 
)

}


 