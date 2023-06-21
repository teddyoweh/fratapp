import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";

import React,{ useState,useEffect,useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../styles/messagestyles';
import { discoverstyles } from "../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { MessageAdd, MessageAdd1, PenAdd,SearchNormal } from "iconsax-react-native";
import MessagesScreen from "./Messages";
import { HomeStack } from '../Home';

 
const MessageStack = HomeStack

export default function MessageStacks({navigation,route}) {
 

  return (
    <MessageStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >
        <MessageStack.Screen name='MessagePage' component={MessagesScreen}
     
        />
      

       

    
    </MessageStack.Navigator>
 
 
  );
}
 
