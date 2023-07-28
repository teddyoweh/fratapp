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
 
import Loading from "./Loading";


export default function ProfilePosts({navigation,userid}){
    const {user} = useContext(AppContext)
    const [postData,setPostData] = useState(null)
    console.log(user,'shi')
    let id;
    if(userid){
        id = userid

    }else{
        id = user.userid
    }
    async function loadMyPosts(){
 
       await axios.post(endpoints['getposts'],{userid:id})
        .then(res=>{
        
            setPostData(res.data)
  
        })
    }

    useEffect(() => {
        loadMyPosts()
    },[])
    return (
        postData!=null?
        postData.posts.map((post,index)=>{
 
            return(
                <>
                { postData.posts.length>0?
                <PostsList key={index }index={index} posti={post} navigation={navigation} move={false} userdetails ={postData.users[post.userid]}/>
                :
              <View
        style={{
          
 
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
                </>
                
            )
        }):
        
        <Loading/>
        
    )
}  