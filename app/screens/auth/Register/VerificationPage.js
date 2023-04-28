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
export default function VerificationPage({ navigation,route }) {
    const {email}=route.params
    const [code,setCode]= useState('')
    const [coderror,setCodeError] = useState(null)
    const [codeerrortxt,setCodeErrorText] = useState('')
    const {user,setUser}=useContext(AppContext)
    const {isAuth,setIsAuth} = useContext(AuthContext)

    function onVerifySubmit(){
        if(code.length==0){
            setCodeError(false)
            setCodeErrorText('Please enter the verification code')
            return
        }else{

  
        axios.post(endpoints['verify'],{code:code,email:email}).then(res=>
        {
          
            setCodeError(true)
            console.log(res.data)
            storeData('token',res.data.token)
            storeJSONData('user',res.data.payload)
            setIsAuth(true)
            setUser(res.data.payload)
        }

        )
        .catch((error) => {
                console.log('fucking error')
                setCodeError(false)
                setCodeErrorText(error.response.data.message)
          
        })
    }  
    }

    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',padding:10}}>
                <Pressable onPress={()=>navigation.goBack()}>
                <Entypo name="chevron-small-left" size={24} color="black" />
                                </Pressable>
                </View>

            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Text style={{fontSize:27,fontWeight:'bold',textAlign:'center', padding:10,color:'#a330d0'}}>Verify your email.</Text>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'#bbb',marginTop:5,marginBottom:10}}>
                        Please enter the verification code sent to {email}.
                    </Text>
                   
                    <View style={[authstyles.forminput,{flexDirection:'row',alignItems:'center',marginVertical:5,width:'90%'},borderError(coderror)]}>

    
<TextInput style={{width:'95%'}}
 autoCapitalize="none"
 autoCorrect={false}
 placeholder="Enter verification code"
 value={code}
 onChangeText={(text)=>setCode(text)} />

 
{coderror!=null

&&
  <InputStatusIcon state={coderror}/>  }
        </View>
      {
        coderror==false&&
      
<InputStatusText text={codeerrortxt}/>}
<View style={{flexDirection:'row',alignItems:'center', marginTop:10,justifyContent:'center'}}>


                    <TouchableOpacity style={[authstyles.actionbtn,{width:'40%'}]} onPress={()=>onVerifySubmit()}>
              <Text style={{ color: "white", fontSize: 17, fontWeight: 600 }}>Verify</Text>
            </TouchableOpacity>
            </View>
                </View>
            </View>
                

        </View>
    )
}
