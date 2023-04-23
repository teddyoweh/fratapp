import React, { useState,useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { homestyles, authstyles } from "../../../styles";
import {
  Message,
  Messages1,
  Message2,
  Messages2,
  Messages3,
  MessageSquare,
  More,
  Like,
  Like1,
  AddCircle,
  Login,
} from "iconsax-react-native";
import { FontAwesome5, Ionicons, AntDesign, MaterialIcons,Entypo } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { RegisterAction } from "../../../actions/auth";
import axios from "axios";
import { serverip } from "../../../config/ip";
import { endpoints } from "../../../config/endpoints";
import { AuthContext } from "../../../context/authContext";
import { AppContext } from "../../../context/appContext";
import  { getData,getJSONData,storeData,storeJSONData } from "../../../utils/storage";

function InputStatusIcon({state}){
    if(!state){
      return (
        <MaterialIcons name="error" size={24} color="#FF4136" />)}
    else{
    return (
      <AntDesign name="checkcircle" size={24}  color="#00C853" />
    )
    }
  }
  function InputStatusText({text}){
    return <Text style={{color:"#FF4136"}}>
      {text}
    </Text>
  }
  
function LoginPage({navigation}){
    const {setIsAuth} = useContext(AuthContext)
    const {user,setUser} = useContext(AppContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailerror,setEmailError] = useState(null)
    const [passworderror,setPasswordError] = useState(null)
    const [emailerrortxt,setEmailErrortxt] = useState('')
    const [passworderrortxt,setPasswordErrortxt] = useState('')
    const [viewpass,setViewPass] = useState(false)

    function borderError(error){
        if(error==false){
          return {borderColor:'#FF4136'}
        }
        }
        function isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
          }

          function validateReg(email, password) {
            let isValid = true;
           
          
            if (email.length < 1) {
              setEmailError(false);
              setEmailErrortxt("Email is required");
              isValid = false;
            } else {
              if (isValidEmail(email)) {
                setEmailError(true);
              } else {
                setEmailError(false);
                setEmailErrortxt("Invalid Email");
                isValid = false;
              }
            }
           
          
            if (password.length < 1) {
              setPasswordError(false);
              setPasswordErrortxt("Password is required");
              isValid = false;
            } else {
              if (password.length < 6) {
                setPasswordError(false);
                setPasswordErrortxt("Password must be at least 6 characters long");
                isValid = false;
              } else {
                setPasswordError(true);
              }
            }
          
            return isValid;
          }
          async function onSubmit(){
            if(validateReg(email,password)){
              await axios
              .post(endpoints["login"], {
              
                email: email,
                password: password,
              })
              .then((res) => {

                storeData('token',res.data.token)
                storeJSONData('user',res.data.payload)
                setIsAuth(true)
                setUser(res.data.payload)
                
          
              
            
               
        
                //navigation.navigate('LoginStack')
                
        
               })
              .catch((error) => {
                if (error.response && error.response.status === 400) {
                  const errors = error.response.data;
                  errors.forEach((errorObj) => {
         
                    switch (errorObj.type) {
                      case "password":
                      setPasswordError(false);
                      setPasswordErrortxt(errorObj.message);
                        break;
                      case "email":
                      setEmailError(false);
                      setEmailErrortxt(errorObj.message);
                        break;
                      default:
         
                        break;
                    }
                  });
                }  
              });
            
        
            }
          
        
          }
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
            <Text style={authstyles.formtxt}
            >Email</Text>
                        <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',}, borderError(emailerror)]}>
            <TextInput  style={{width:'95%'}}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            inputMode="email"

            placeholder="" />
            {emailerror!=null&&
            <InputStatusIcon state={emailerror}/>}
            </View>
            {
              emailerror==false &&
              <InputStatusText text={emailerrortxt}/>
              
            }
          </View>
          <View style={authstyles.formgrp}>
            <Text style={authstyles.formtxt}>Password</Text>
            
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',},borderError(passworderror)]}>

    
            <TextInput style={{width:passworderror!=null?'85%':'95%'}}
             autoCapitalize="none"
             autoCorrect={false}
             secureTextEntry={!viewpass}
             onChangeText={(text)=>setPassword(text)}
            placeholder="" />

            <TouchableOpacity style={{marginRight:10}}onPress={()=>setViewPass(!viewpass)}>
            {viewpass?<Entypo name="eye" size={24} color="black" />:<Entypo name="eye-with-line" size={24} color="black" />}
            </TouchableOpacity>
            {passworderror!=null
            
            &&
              <InputStatusIcon state={passworderror}/>  }
                    </View>
                  {
                    passworderror==false&&
                  
<InputStatusText text={passworderrortxt}/>}
          </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>

      
                <BouncyCheckbox
  size={25}
  fillColor="#a330d0"
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
                <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}  >

                <Text style={{ color:'#a330d0',
        fontSize:14,
        fontWeight:600,
        position:'relative',
        left:-10,
        }}
        >
        Forgot Password?
    </Text>
                        
    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                    <Pressable style={authstyles.actionbtn} onPress={()=>onSubmit()}>
                        <Text style={{color:'white',fontSize:17,fontWeight:600}}>Login</Text>
                    </Pressable>
                </View>
            </View>  
        </View>
    )
}

export default LoginPage