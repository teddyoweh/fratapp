import React,{useState,useContext,useRef,useEffect}from "react";
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

function LoadingScreen(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:'#b8b8b8',fontWeight:'600',fontSize:20}}>Loading...</Text>
        </View>
    )
}
function MapOutPosts({posts,navigation}){
    return(
        posts.map((post,index)=>{
            return(
                <PostsList index={index} navigation={navigation} post={post}/>
            )
        })
    )
}
export default function Feed({navigation}){
    const [refreshing, setRefreshing] = React.useState(false);
    const [posts,setPost]  = useState(null)
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);



function loadPosts(){
    axios.post(endpoints['getposts'],{cursor:null}).then(res=>{
        setPost(res.data)
    })

}
useEffect(() => {
  loadPosts();

   
},[] )

return (
    <ScrollView  contentContainerStyle={homestyles.postcontainer}
            
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadPosts()} />
      }>

{posts==null?<LoadingScreen/>:<MapOutPosts posts={posts} navigation={navigation}/>
        }
  

    </ScrollView>
)

}


