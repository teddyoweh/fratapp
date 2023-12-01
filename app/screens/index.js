import React,{useContext,useEffect,useState,useRef} from "react";
import { View, Image, Animated, useColorScheme, Appearance, } from 'react-native';

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
import { NotificationContext } from "../context/notificationContext";
import { registerForPushNotificationsAsync, setupNotifications } from "../config/setup";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { color_scheme } from "../config/color_scheme";
import * as Location from 'expo-location';
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
        toValue: 0.4,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.Image
          source={require('../assets/refres-logo2.png')}
          style={{
            transform: [{ scale: scaleValue }],
            
          }}
        />
      </View>
    );
  }
  
export default function Screens(){
 
    const [user,setUser] = useState(null)
    const [isAuth,setIsAuth] = useState(null)
    const [token,setToken] = useState(null)
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
 
    const responseListener = useRef();
  
    async function VerifyAuth(){
 
        const token1 = await AsyncStorage.getItem('token')
 
        try {
            const res = await axios.post(endpoints['me'], { token: token1 });
       
            if (res.data.status) {
      
              
              storeData('token', res.data.token);
              setToken(res.data.token);
              setUser(res.data.user)
    
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
  
  
    
    }  
    const colorScheme = 'dark'

 
    const [colorMode,setColorMode]=useState(colorScheme)
  
      useEffect(() => {
        // setupNotifications()
        VerifyAuth()
   
 
        
      }, [])
 
      const [user_location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          try {
 
            const temp_location = await AsyncStorage.getItem('location');
            if (temp_location !== null) {
              setLocation(JSON.parse(temp_location));
            }
            
 
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              let location_ = await Location.getCurrentPositionAsync({});
              const x_ = JSON.stringify(location_.coords);
              AsyncStorage.setItem('location', x_);
              setLocation(location_.coords);
            } else {
              setErrorMsg('Permission to access location was denied');
  
            }
          } catch (error) {
            console.error('Error fetching or updating location:', error);
 
          }
        };
    
        fetchData();
      }, []); 
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color_scheme(colorMode,'white') }}>
            <AuthContext.Provider value={{isAuth,setIsAuth,setToken,token}}>
<AppContext.Provider value={{user,setUser,colorMode,setColorMode,   color_scheme,user_location}}>
  <NotificationContext.Provider value={{notificationListener,responseListener,notification}}>


    {
        isAuth ==null?<LandingScreen/> : isAuth ==false?  <AuthScreens/> : <AppScreens/>
    }
      </NotificationContext.Provider>
          </AppContext.Provider>
            </AuthContext.Provider>
        </SafeAreaView>
    )
}