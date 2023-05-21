import React,{useState,useEffect,useContext}from "react";
import { View,Text,Dimensions, Image,TouchableOpacity, ScrollView, TextInput, Pressable} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, MessageText, Link2, Link} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';

import LikeBtn from "./LikeBtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapPostImg, wrapUIMG } from "../utils/utils";
import { AppContext } from "../context/appContext";
export default function PostsList({index,navigation,post,userdetails,move}){
    const windowWidth = Dimensions.get('window').width;
 
const {user} = useContext(AppContext)
 
  function navigateToUser(){
 
    if(userdetails.userid==user.userid){

        navigation.navigate('ProfileStacks')
    }
    else{

    
    navigation.navigate('ProfilesScreen',{userdetails:userdetails})
}
  }
  function moveToPost(){
    if(move==true){
        navigation.navigate('PostPage',{post:post,userdetails:userdetails})
    }
  }
 
    return (
        userdetails &&
        <Pressable style={homestyles.post} key={index} onPress={()=>moveToPost()}>
            <View style={homestyles.posttop}>
                <View style={homestyles.posttopleft}>
                    <View style={homestyles.posttopimg}>
                        <Image source={{uri:wrapUIMG(userdetails.uimg)}} style={homestyles.postuserimg}/>
                        
                    </View>
                    <Pressable style={homestyles.postuserdetails} onPress={()=>navigateToUser()}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={homestyles.postname}>{`${userdetails.firstname} ${userdetails.lastname}`}</Text>
                           
                        </View>

        
                        <Text style={homestyles.postusername}>@{`${userdetails.username}`}</Text>
                    </Pressable>
                </View>
                <View style={homestyles.posttopright}>
                    {/* <TouchableOpacity>
                    
                        <More color="grey" size={16}/>
                    </TouchableOpacity> */}
                     <Text style={homestyles.postdate}>
                                {
                                    getTimeDifference(post.date)
                                } ago
                            </Text>
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
        {/* <View
        style={{
            width:'100%',
            flexDirection:'row',
            paddingHorizontal:10
        }}
        >
            {
                post.isanouncement==true&&
                <View
                style={{
                    backgroundColor:'#ac58cd47',
                    paddingHorizontal:10,
                    paddingVertical:5,
                    borderRadius:30,
                  
                }}
                >
                    <Text
                    style={{
                        color:'#a330d0',
                        fontSize:12,
                        
                    }}
                    >
                        Announment
                    </Text>
                </View>
            }
        </View> */}
        <View
        style={{
            width:'100%',
            flexDirection:'row',
           

        }}
        >
            {
                post.imgurls.length>0&&
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                
                onScroll={(e)=>console.log(e)}
                contentContainerStyle={{
                  
                    // paddingHorizontal:10,
                    paddingVertical:10,
                 
                    
                }}
                >
                    {
                        post.imgurls.map((imgurl,index)=>{
                     
                            return(
                                <Image key={index} source={{uri:wrapPostImg(imgurl)}} style={{
                                    width:windowWidth-12,
                                    height:430,
                                    marginRight:20,
                                    marginBottom:10,
                                    borderRadius:10,
                                    borderColor:'#aaa',
                                    borderWidth:0.6
                                }}/>
                            )
                        }
                        )
                        }
                </ScrollView>

            }
        </View>
        <View
        style={{
            width:'100%',
            flexDirection:'row',
            justifyContent:'space-between'
        }}
        >


            <View style={homestyles.postinsights1}>
            <View style={homestyles.postinsight}>
                 <LikeBtn likesno={post.likesno}/>
                
                </View>
                 
               <View>
               <View  style={homestyles.insightbtn}  >
            <Messages2 color="#333" size={23} variant="Linear"/>
            <Text style={homestyles.postinsights1text}>
            {post.commentsno}
                </Text>
        </View> 
               </View>
                 
            </View>
            <View>
            <View  style={homestyles.insightbtn}  >
            <Link color="#333" size={23} variant="Outline"/>
            </View>
            </View>
            </View>
            <View style={homestyles.postinsights}>
                <View style={homestyles.postcommentbox}>
                    <TextInput
                    placeholder="Add Comment"
                    />
                </View>
                

            </View>
        </Pressable>
        )
}
