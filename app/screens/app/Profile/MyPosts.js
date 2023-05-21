import React,{useState,useContext,useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";


export default function MyPosts({navigation,route}){
    const {user} = useContext(AppContext)
    const [posts,setPosts] = useState(null)
    const [users,setUsers] = useState(null)
    const [postData,setPostData] = useState(null)
   async function loadMyPosts(){
        
       await axios.post(endpoints['getposts'],{userid:user.userid})
        .then(function(res){
            setPostData(res.data)
   
        })
    }

    useEffect(() => {
        loadMyPosts()
    },[])
    return (
        postData&&
        postData.map((post,index)=>{
            return(
                <PostsList index={index} post={post} route={route} navigation={navigation} users={postData.users}/>
            )
        })
        
    )
}  