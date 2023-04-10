import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,authstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';




function LandingPage({navigation}){
    return (
        <View style={authstyles.container}> 
            <View style={authstyles.logobox}>
                <Image style={authstyles.logo} source={require('../../../assets/union.png')}/>
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