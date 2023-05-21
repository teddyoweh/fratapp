import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,poststyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Back, MessageSearch} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import PostsList from "./PostsList";
import axios from "axios";
import { endpoints } from "../config/endpoints";


export default function PostPage({navigation,route}){
   

    const {post,userdetails} = route.params
    return (
        <View style={poststyles.container}>
            <View style={poststyles.top}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>

        
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            </View>
            <View style={poststyles.content}>
                <PostsList navigation={navigation} index={1} move={false} route={route} post={post} userdetails={userdetails}/>
                <View style={poststyles.commentssec}>
                    <View style={poststyles.commenthead}>
                    <Messages2 variant="Bulk" color="#a330d0" />
                    <Text style={poststyles.commentheadtext}>
          Comments


                    </Text>
                    </View>
                    <View style={poststyles.comment}>
                
                    </View>
                </View>
            </View>
        </View>

    )
}