import React from "react";
import { View } from "react-native";

 
import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
import LoginStacks from "./Login";
import RegisterStacks from "./Register";
import LandingPage from "./Landing";
import AllowPage from "./Requests/Allow";
 
const AuthScreens = createStackNavigator()

function AuthScreen({navigation,route}) {

  return (
    <AuthScreens.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >
      {/* <AuthScreens.Screen name="GalleryAllowPage" initialParams={{type:'gallery'}} component={AllowPage} />
<AuthScreens.Screen name="LocationAllowPage" initialParams={{type:'location'}} component={AllowPage} />


<AuthScreens.Screen name="NotificationAllowPage" initialParams={{type:'notification'}} component={AllowPage} /> */}
<AuthScreens.Screen name="LandingPage" component={LandingPage} />
<AuthScreens.Screen name="LoginStack" component={LoginStacks} />

      <AuthScreens.Screen name="RegisterStack" component={RegisterStacks}/>
    </AuthScreens.Navigator>
 
 
  );
}



export default AuthScreen   