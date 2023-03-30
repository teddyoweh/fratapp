import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Pressable} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';

import LikeBtn from "./LikeBtn";
export default function PostsList({index,navigation}){
    return (
        <Pressable style={homestyles.post} key={index} onPress={()=>navigation.navigate("PostPage")}>
            <View style={homestyles.posttop}>
                <View style={homestyles.posttopleft}>
                    <View style={homestyles.posttopimg}>
                        <Image source={{uri:"https://www.teddyoweh.net/static/media/teddyoweh.0d737b82d1f21ff870f9.jpeg"}} style={homestyles.postuserimg}/>
                        
                    </View>
                    <View style={homestyles.postuserdetails}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={homestyles.postname}>Teddy Oweh</Text>
                            <Text style={homestyles.postusername}>@teddyoweh</Text>
                        </View>

        
                        <Text style={homestyles.postuserrole}>Tarleton Computer Society President </Text>
                    </View>
                </View>
                <View style={homestyles.posttopright}>
                    <TouchableOpacity>
                        <More color="grey" size={16}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={homestyles.postcontent}>
                <Text style={homestyles.postcontenttext}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quidem et dignissimos voluptas omnis praesentium consequuntur soluta est perspiciatis labore repudiandae necessitatibus at culpa eius dolore aliquid, cupiditate quia non?
                </Text>
            </View>
            <View style={homestyles.postinsights1}>
                <Text style={homestyles.postinsights1text}>
                    10 Likes
                </Text>
                <Text style={homestyles.postinsights1text}>
                 /
                </Text>
                <Text style={homestyles.postinsights1text}>
                    0 Comments
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
