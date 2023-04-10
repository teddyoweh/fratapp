import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Pressable} from "react-native";
import { homestyles,authstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Login} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";


function ForgotPasswordPage({navigation}){
    return (
        <View style={authstyles.authcontainer}>
            <View style={{paddingHorizontal:10}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back" size={24} color="#666" />
                </TouchableOpacity>
            </View>
            <View style={authstyles.authlogobx}>
                <Image style={authstyles.authlogo} source={require('../../../assets/union.png')}/>
            </View>
            <View style={authstyles.formbx}>
            <View style={authstyles.formgrp}>
                    <Text style={authstyles.formtxth1}>
                        Reset Password
                    </Text>
                    
                </View>
                <View style={authstyles.formgrp}>
                    <Text style={authstyles.formtxt}>
                        Email
                    </Text>
                    <TextInput style={authstyles.forminput} placeholder="" />
                </View>
                
                {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>

      
                <BouncyCheckbox
  size={25}
  fillColor="#D030D0"
  unfillColor="#FFFFFF"
 
  iconStyle={{ borderColor: "red",borderRadius:10 }}
  innerIconStyle={{ borderWidth: 1,borderRadius:10 }}
 
 
/>
    <Text style={{ color:'#666',
        fontSize:14,
        fontWeight:400,
        position:'relative',
        left:-10,
        }}
        >
        Remember me
    </Text>
 
                </View>
                <Text style={{ color:'#D030D0',
        fontSize:14,
        fontWeight:600,
        position:'relative',
        left:-10,
        }}
        >
        Forgot Password?
    </Text>
                </View> */}
                <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                    <Pressable style={authstyles.actionbtn}>
                        <Text style={{color:'white',fontSize:17,fontWeight:600}}>Send Code</Text>
                    </Pressable>
                </View>
            </View>  
        </View>
    )
}

export default ForgotPasswordPage;