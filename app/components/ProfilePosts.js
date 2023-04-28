import React,{useState,useContext,useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "./PostsList";
import ProfileActionbtn from "./ProfileActionbtn";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { endpoints } from "../config/endpoints";


export default function ProfilePosts({navigation,userid}){
    const {user} = useContext(AppContext)
    const [posts,setPosts] = useState(null)
    const [users,setUsers] = useState(null)
 
    async function loadMyPosts(){
        
       await axios.post(endpoints['getposts'],{userid:userid})
        .then(function(res){
            console.log(res.data)
           setPosts(res.data.posts)
           setUsers(res.data.users)
        })
    }

    useEffect(() => {
        loadMyPosts()
    },[])
    return (
        posts&&users&&
        posts.map((post,index)=>{
 
            return(
                
                <PostsList key={index }index={index} post={post} navigation={navigation} users={users}/>
            )
        })
        
    )
}  