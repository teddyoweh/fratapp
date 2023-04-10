import React from "react";
import { View } from "react-native";

 
import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from "./RegisterPage";
import { useRoute } from '@react-navigation/native';
 

 
const RegisterStack = createStackNavigator()

function RegisterStacks({navigation,route}) {

  return (
    <RegisterStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >


      <RegisterStack.Screen name="RegisterPage" component={RegisterPage} />
     

    </RegisterStack.Navigator>
 
 
  );
}



export default RegisterStacks