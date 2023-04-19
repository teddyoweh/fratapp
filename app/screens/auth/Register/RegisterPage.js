import React, { useState } from "react";
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
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username,setUserName]=useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailerror,setEmailError] = useState(false)
  const [passworderror,setPasswordError] = useState(null)
  const [firstnameerror,setFirstNameError] = useState(null)
  const [lastnameerror,setLastNameError] = useState(false)
  const [usernameerror,setUsernameError] = useState(false)
  const [emailerrortxt,setEmailErrortxt] = useState('')
  const [passworderrortxt,setPasswordErrortxt] = useState('')
  const [firstnameerrortxt,setFirstNameErrortxt] = useState('')
  const [lastnameerrortxt,setLastNameErrortxt] = useState('')
  const [usernameerrortxt,setUsernameErrortxt] = useState('')


  const [viewpass,setViewPass] = useState(false)



 
  function onSubmit(){
    
    RegisterAction(firstname,lastname,username,email,password,navigation)

  }
  return (
    <KeyboardAvoidingView
      style={authstyles.authcontainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="chevron-back" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={authstyles.authlogobx}>
          <Image style={authstyles.authlogo} source={require("../../../assets/union.png")} />
        </View>

        <View style={authstyles.formbx}>
          <View style={authstyles.formgrp}>
            <Text style={authstyles.formtxt}>First Name</Text>
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center'},borderError(firstnameerror)]}>
            <TextInput style={{width:'95%'}}
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
          </View>

          <View style={authstyles.formgrp}>
            <Text style={authstyles.formtxt}>Last Name</Text>
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center'},borderError(lastnameerror)]}>
            <TextInput style={{width:'95%'}}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="family-name"
            inputMode="text"
            onChangeText={(text) => setLastName(text)}

            placeholder="" />
            {lastnameerror!=null &&
             <InputStatusIcon state={lastnameerror}/>            }
          </View>
          </View>
          
          <View style={authstyles.formgrp}>
            <Text style={authstyles.formtxt}>Username</Text>
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center'},borderError(usernameerror)]}>
            <TextInput style={{width:'95%'}}
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
          </View>
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
          </View>
          <View style={authstyles.formgrp}>
            <Text style={authstyles.formtxt}>Password</Text>
            
            <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',},borderError(passworderror)]}>

    
            <TextInput style={{width:passworderror!=null?'85%':'95%'}}
             autoCapitalize="none"
             autoCorrect={false}
             secureTextEntry={!viewpass}
             onChangeText={(text)=>setPassword(password)}
            placeholder="" />

            <TouchableOpacity style={{marginRight:10}}onPress={()=>setViewPass(!viewpass)}>
            {viewpass?<Entypo name="eye" size={24} color="black" />:<Entypo name="eye-with-line" size={24} color="black" />}
            </TouchableOpacity>
            {passworderror!=null
            
            &&
              <InputStatusIcon state={passworderror}/>  }
                    </View>
                  {
                    passworderror!=null&&
                  
<InputStatusText text={passworderrortxt}/>}
          </View>
          <View style={[{flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <BouncyCheckbox
                size={25}
                fillColor="#D030D0"
                unfillColor="#FFFFFF"
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
            <Pressable style={authstyles.actionbtn}>
              <Text style={{ color: "white", fontSize: 17, fontWeight: 600 }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
