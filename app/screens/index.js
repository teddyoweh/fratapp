import React,{useContext,useEffect,useState,useRef} from "react";
import { View, Image, Animated, useColorScheme, } from 'react-native';

import { SafeAreaView } from "react-native";
import AuthScreen from "./auth";
import AppScreens from "./app";
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "../context/authContext";
import { AppContext } from "../context/appContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearData, storeData,storeJSONData} from "../utils/storage";
import axios from "axios";
import { endpoints } from "../config/endpoints";

function AuthScreens(){
    
    return (
        <NavigationContainer>
                        <AuthScreen/>
        </NavigationContainer>
    )
}


function LandingScreen() {
    const scaleValue = useRef(new Animated.Value(0.4)).current;
  
    useEffect(() => {
      Animated.timing(scaleValue, {
        toValue: 0.7,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.Image
          source={require('../assets/union.png')}
          style={{
            transform: [{ scale: scaleValue }],
          }}
        />
      </View>
    );
  }
export default function Screens(){
    //clearData()
    const [user,setUser] = useState(null)
    const [isAuth,setIsAuth] = useState(null)
    const [token,setToken] = useState(null)

    async function VerifyAuth(){
 
        const token1 = await AsyncStorage.getItem('token')
        try {
            const res = await axios.post(endpoints['me'], { token: token1 });
          
            if (res.data.status) {
 
              
              storeData('token', res.data.payload.token);
              setToken(res.data.payload.token);
              setUser(res.data.payload.user)
              setIsAuth(true);
    
      
          
            
           
              

            }
          } catch (err) {
           
        
            if (err.response && err.response.status === 401) {
        
              setIsAuth(false);
              setToken(null);
              clearData()
            }
          }

    }
   
      const getUser = async () => {
    
       
        const value = await AsyncStorage.getItem('user')
 
        console.log(value)
        if(value !== null) {
          console.log(value)
    


        }
  
    
    }  
    const getDeviceColorScheme = () => {
      const colorScheme = useColorScheme();
      return colorScheme === 'dark' ? 'dark' : 'light';
    };
    const [colorMode,setColorMode]=useState(getDeviceColorScheme())
   
      useEffect(() => {
        VerifyAuth()
      console.log(user)
 
        
      }, [])
      


      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <AuthContext.Provider value={{isAuth,setIsAuth}}>
<AppContext.Provider value={{user,setUser,colorMode,setColorMode}}>
    {
        isAuth ==null?<LandingScreen/> : isAuth ==false?  <AuthScreens/> : <AppScreens/>
    }
    
          </AppContext.Provider>
            </AuthContext.Provider>
        </SafeAreaView>
    )
}