import React,{useContext, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,authstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import { color_scheme } from "../../../config/color_scheme";




function LandingPage({navigation}){
    const {colorMode} = useContext(AppContext)
    const applogo = colorMode=='dark'?require('../../../assets/HERDS.png'):require('../../../assets/HERDS.png')
    const logostyle  = colorMode=='dark'?{      width: 200,
        height:200}:{
            width:500,
            height:500,
        }
    return (
        <View style={[authstyles.container,{
            backgroundColor:color_scheme(colorMode,'white')
        }]}> 
            <View style={authstyles.logobox}>
                <Image style={logostyle} source={applogo}/>
            </View>
            <View style={authstyles.btnsbox}>
            <TouchableOpacity style={authstyles.landingbtn} onPress={()=>navigation.navigate("RegisterStack")}>
                <Text style={authstyles.landingbtntxt}>
                    Get Started
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={authstyles.landingbtn1} onPress={()=>navigation.navigate("LoginStack")}>
                <Text style={authstyles.landingbtntxt1}>
                Login
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default LandingPage;