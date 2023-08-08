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
import { color_scheme } from "../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
function borderError(error){
if(error==false){
  return {borderColor:'#FF4136'}
}
}
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

function RegisterPage({navigation}) {
  const {user,setUser}=useContext(AppContext)
  const {isAuth,setIsAuth} = useContext(AuthContext)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username,setUserName]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailerror,setEmailError] = useState(null)
  const [passworderror,setPasswordError] = useState(null)
  const [firstnameerror,setFirstNameError] = useState(null)
  const [lastnameerror,setLastNameError] = useState(null)
  const [usernameerror,setUsernameError] = useState(null)
  const [emailerrortxt,setEmailErrortxt] = useState('')
  const [passworderrortxt,setPasswordErrortxt] = useState('')
  const [firstnameerrortxt,setFirstNameErrortxt] = useState('')
  const [lastnameerrortxt,setLastNameErrortxt] = useState('')
  const [usernameerrortxt,setUsernameErrortxt] = useState('')


  const [viewpass,setViewPass] = useState(false)

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  function validateReg(firstname, lastname, email, username, password) {
    let isValid = true;
  
    if (firstname.length < 1) {
      setFirstNameError(false);
      setFirstNameErrortxt("Firstname is required");
      isValid = false;
    } else {
      setFirstNameError(true);
    }
  
    if (lastname.length < 1) {
      setLastNameError(false);
      setLastNameErrortxt("Lastname is required");
      isValid = false;
    } else {
      setLastNameError(true);
    }
  
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
  
    if (username.length < 1) {
      setUsernameError(false);
      setUsernameErrortxt("Username is required");
      isValid = false;
    } else {
      setUsernameError(true);
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
  
 
  function onSubmit(){
    if(validateReg(firstname,lastname,email,username,password)){
      //RegisterAction(firstname,lastname,username,email,password,navigation)
      axios
      .post(endpoints["register"], {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
        //setIsAuth(true)
        //setUser(res.data.payload)
        //storeData('token',res.data.token)
        //storeJSONData('user',res.data.payload)

        navigation.navigate('VerificationPage',
        {
          email:email,
        })
        

       })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errors = error.response.data;
          errors.forEach((errorObj) => {
 
            switch (errorObj.type) {
              case "username":
              setUsernameError(false);
              setUsernameErrortxt(errorObj.message);
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

  const {colorMode} = useContext(AppContext)
  const applogo = colorMode=='dark'?require('../../../assets/HERDS.png'):require('../../../assets/union.png')
  const logostyle  = colorMode=='dark'?{      width: 150,
      height:150}:{
          width:500,
          height:500,
      }
  return ( 
    <KeyboardAvoidingView
 style={[authstyles.container,{
      backgroundColor:color_scheme(colorMode,'white')
  }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ paddingHorizontal: 10 }}>
      <TouchableOpacity onPress={()=>{
                       Haptics.impactAsync('medium')
                        navigation.goBack()}}
                    style={{
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'center',
                        height:33,
                        width:33,
                        backgroundColor:'#222',
                        borderRadius:100,
                        marginRight:10
                    }}
                    >
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={authstyles.authlogobx}>
          <Image style={logostyle} source={applogo} />
        </View>

        <View style={authstyles.formbx}>
          <View style={authstyles.formgrp}>
            <Text style={[authstyles.formtxt,
            {
              color:color_scheme(colorMode,"#222")
            }
            ]}>First Name</Text>
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center'},borderError(firstnameerror)]}>
            <TextInput  style={[authstyles.forminputbx,{width:'95%',color:color_scheme(colorMode,'black')}]}
                  keyboardAppearance={colorMode}
               autoCapitalize='none'
               autoComplete="given-name"
               autoCorrect={false}
               inputMode="text"
              onChangeText={(text) => setFirstName(text)}

            placeholder="" />
            {
              firstnameerror!=null
            &&
                  <InputStatusIcon state={firstnameerror}/>  }
          </View>
          {
            firstnameerror==false &&
         
            <InputStatusText text={firstnameerrortxt}/>}
          </View>

          <View style={authstyles.formgrp}>
            <Text style={[authstyles.formtxt,
            {
              color:color_scheme(colorMode,"#222")
            }
            ]}>Last Name</Text>
            <View style={[authstyles.forminput,{ flexDirection:'row',alignItems:'center'},borderError(lastnameerror)]}>
            <TextInput style={[authstyles.forminputbx,{width:'95%',color:color_scheme(colorMode,'black')}]}
                  keyboardAppearance={colorMode}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="family-name"
            inputMode="text"
            onChangeText={(text) => setLastName(text)}
      
            placeholder="" />
            {lastnameerror!=null &&
             <InputStatusIcon state={lastnameerror}/>            }
          </View>
          {
            lastnameerror==false &&
            <InputStatusText text={lastnameerrortxt}/>
            }

          </View>
          
          <View style={authstyles.formgrp}>
            <Text style={[authstyles.formtxt,
            {
              color:color_scheme(colorMode,"#222")
            }
            ]}>Username</Text>
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center'},borderError(usernameerror)]}>
            <TextInput  style={[authstyles.forminputbx,{width:'95%',color:color_scheme(colorMode,'black')}]}
                  keyboardAppearance={colorMode}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
            inputMode="text"
            onChangeText={(text) => setUserName(text)}

            placeholder="" />
            {
              usernameerror!=null&&
            
             <InputStatusIcon state={usernameerror}/>}
                      </View>

          {
            usernameerror==false &&
            <InputStatusText text={usernameerrortxt}/>
            }          
            </View>

   
          <View style={authstyles.formgrp}>
            <Text style={[authstyles.formtxt,
            {
              color:color_scheme(colorMode,"#222")
            }
            ]}
            >Email</Text>
                        <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',}, borderError(emailerror)]}>
            <TextInput   style={[authstyles.forminputbx,{width:'95%',color:color_scheme(colorMode,'black')}]}
                  keyboardAppearance={colorMode}
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
            <Text style={[authstyles.formtxt,
            {
              color:color_scheme(colorMode,"#222")
            }
            ]}>Password</Text>
            
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',},borderError(passworderror)]}>

    
            <TextInput style={[authstyles.forminputbx,{width:passworderror!=null?'85%':'95%'}]}
             autoCapitalize="none"
             autoCorrect={false}
             secureTextEntry={!viewpass}
             onChangeText={(text)=>setPassword(text)}
            placeholder="" />

            <TouchableOpacity style={{marginRight:10}}onPress={()=>setViewPass(!viewpass)}>
            {viewpass?<Entypo name="eye" size={22} color={color_scheme(colorMode,'black')} />:<Entypo name="eye-with-line" size={22} color={color_scheme(colorMode,'black')} />}
            </TouchableOpacity>
            {passworderror!=null
            
            &&
              <InputStatusIcon state={passworderror}/>  }
                    </View>
                  {
                    passworderror==false&&
                  
<InputStatusText text={passworderrortxt}/>}
          </View>
          <View style={[{flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <BouncyCheckbox
                size={25}
                fillColor="#a330d0"
                unfillColor={color_scheme(colorMode,'white')}
                iconStyle={{ borderColor: "red", borderRadius: 10 }}
                innerIconStyle={{ borderWidth: 1, borderRadius: 10 }}
              />
              <Text
                style={{
                  color: "#666",
                  fontSize: 14,
                  fontWeight: 400,
                  position: "relative",
                  left: -10,
                }}
              >
                Agree to Terms & Conditions
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
            }}
          >
            <Pressable style={authstyles.actionbtn} onPress={()=>onSubmit()}>
              <Text style={{ color: "white", fontSize: 17, fontWeight: 600 }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
