import React,{useState,useEffect,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Pressable} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';

import LikeBtn from "./LikeBtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { wrapUIMG } from "../utils/utils";
import { AppContext } from "../context/appContext";
export default function PostsList({index,navigation,post,userdetails}){
    
const {user} = useContext(AppContext)
  function navigateToUser(){
 
    if(userdetails.userid==user.id){
        navigation.navigate('ProfileScreen')
    }
    else{

    
    navigation.navigate('ProfilesScreen',{userdetails:userdetails})
}
  }
    
    return (
        userdetails &&
        <Pressable style={homestyles.post} key={index} onPress={()=>navigation.navigate("PostPage",{post:post,userdetails:userdetails})}>
            <View style={homestyles.posttop}>
                <View style={homestyles.posttopleft}>
                    <View style={homestyles.posttopimg}>
                        <Image source={{uri:wrapUIMG(userdetails.uimg)}} style={homestyles.postuserimg}/>
                        
                    </View>
                    <Pressable style={homestyles.postuserdetails} onPress={()=>navigateToUser()}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={homestyles.postname}>{`${userdetails.firstname} ${userdetails.lastname}`}</Text>
                            <Text style={homestyles.postusername}>@{`${userdetails.username}`}</Text>
                        </View>

        
                        <Text style={homestyles.postuserrole}>Tarleton Computer Society President </Text>
                    </Pressable>
                </View>
                <View style={homestyles.posttopright}>
                    <TouchableOpacity>
                        <More color="grey" size={16}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={homestyles.postcontent}>
                <Text style={homestyles.postcontenttext}>
                   {post.content}
                </Text>
            </View>{post.links.length>0&&
            <View style={{flexDirection:'column',marginVertical:8,borderRadius:30,paddingVertical:2}}>
                
        {
            post.links.map((link,index)=>{
                return(
                    <View key={index} style={{flexDirection:'row',justifyContent
                    :'space-between',alignItems:'center',paddingVertical:3}}>
                    
                    <View key={index}style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <Text style={{marginLeft:5,color:'blue'}}>{link}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>remove(link)}>
                    
                    </TouchableOpacity>
                    </View>
                )
            })
        }
        </View>}
            <View style={homestyles.postinsights1}>
                <Text style={homestyles.postinsights1text}>
                    {post.likesno} Like{post.likesno>1&&'s'}
                </Text>
                <Text style={homestyles.postinsights1text}>
                 /
                </Text>
                <Text style={homestyles.postinsights1text}>
                    {post.commentsno} Comments
                </Text>
            </View>
            <View style={homestyles.postinsights}>
                <View style={homestyles.postcommentbox}>
                    <TextInput
                    placeholder="Add Comment"
                    />
                </View>
                <View style={homestyles.postinsight}>
                 <LikeBtn/>
                </View>

            </View>
        </Pressable>
        )
}
