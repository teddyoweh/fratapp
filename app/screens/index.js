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
          source={require('../assets/HERDS.png')}
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
    useEffect(() => {
    
      registerForPushNotificationsAsync().then(token);
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
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
  
  
    
    }  
    const colorScheme = 'dark'

 
    const [colorMode,setColorMode]=useState(colorScheme)
  
      useEffect(() => {
        setupNotifications()
        VerifyAuth()
   
 
        
      }, [])
      


   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color_scheme(colorMode,'white') }}>
            <AuthContext.Provider value={{isAuth,setIsAuth}}>
<AppContext.Provider value={{user,setUser,colorMode,setColorMode,   color_scheme}}>
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