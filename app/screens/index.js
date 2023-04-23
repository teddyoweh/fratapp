import React,{useContext,useEffect,useState,useRef} from "react";
import { View, Image, Animated } from 'react-native';


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
        console.log('Verify')
        const token1 = await AsyncStorage.getItem('token')
        console.log('token--',token1)
        try {
            const res = await axios.post(endpoints['me'], { token: token1 });
          
            if (res.data.status) {
              console.log(res.data.payload.user);
              storeJSONData('user', res.data.payload.user);
              storeData('token', res.data.payload.token);
              setIsAuth(true);
              setToken(res.data.payload.token);

            }
          } catch (err) {
           
        
            if (err.response && err.response.status === 401) {
              console.log('error:', err);
              setIsAuth(false);
              setToken(null);
            }
          }

    }
    // const getToken = async () => {
    
    
    //       const value = await AsyncStorage.getItem('token')
    //       console.log(value)
    //       if(value !== null) {
    //         console.log(value)
    //         setIsAuth(true)
    //         setToken(value)
 
    //       }
    
      
    //   }   
      const getUser = async () => {
    
    
        const value = await AsyncStorage.getItem('user')
        console.log(value)
        if(value !== null) {
          console.log(value)
    
          setUser(JSON.parse(value))

        }
  
    
    }  

      useEffect(() => {
        VerifyAuth()
      console.log(user)
      getUser()
        
      }, [])
      


      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <AuthContext.Provider value={{isAuth,setIsAuth}}>
<AppContext.Provider value={{user,setUser}}>
    {
        isAuth ==null?<LandingScreen/> : isAuth ==false?  <AuthScreens/> : <AppScreens/>
    }
    
          </AppContext.Provider>
            </AuthContext.Provider>
        </SafeAreaView>
    )
}