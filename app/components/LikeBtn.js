import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1, Heart} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign } from '@expo/vector-icons';


export default function LikeBtn({likesno}){
    const [isLike, setIsLike] = useState(false);
    const [likeno,setLikeNo] = useState(likesno)
    function onClick(){
        setIsLike(!isLike);

    }
    return(
        <TouchableOpacity  style={homestyles.insightbtn} onPress={()=>onClick()}>
            <Heart color={isLike?"#FF0000":"#333"} size={24} variant={isLike?"Bulk":"Linear"}
          
            />
            <Text style={homestyles.postinsights1text}>
                    {likeno} 
                </Text>
        </TouchableOpacity> 
    )
}