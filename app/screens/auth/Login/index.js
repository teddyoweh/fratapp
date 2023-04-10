import React from "react";
import { View } from "react-native";

 
import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./LoginPage";
import ForgotPasswordPage from "./ForgotPassword";
import { useRoute } from '@react-navigation/native';
 

 
const LoginStack = createStackNavigator()

function LoginStacks({navigation,route}) {

  return (
    <LoginStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >


      <LoginStack.Screen name="LoginPage" component={LoginPage} />
      <LoginStack.Screen name="ForgotPassword"component={ForgotPasswordPage} />


    </LoginStack.Navigator>
 
 
  );
}



export default LoginStacks