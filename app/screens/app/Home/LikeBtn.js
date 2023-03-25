import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign } from '@expo/vector-icons';


export default function LikeBtn(){
    const [isLike, setIsLike] = useState(false);
    function onClick(){
        setIsLike(!isLike);

    }
    return(
        <TouchableOpacity  style={isLike?homestyles.likebtna:homestyles.likebtn} onPress={()=>onClick()}>
            <Like1 color={isLike?"white":"#537FE7"} size={18} variant={isLike?"Bulk":"Broken"}/>
        </TouchableOpacity> 
    )
}