import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";

import React,{ useState,useEffect,useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../styles/messagestyles';
import { discoverstyles } from "../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { MessageAdd, MessageAdd1, PenAdd,SearchNormal } from "iconsax-react-native";
import NoticationPage from "./Notification";
import { HomeStack } from "../Home";

const NotificationStack = HomeStack

export default function NotificationStacks({navigation,route}) {
 

  return (
    <NotificationStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >
        <NotificationStack.Screen name='NotificationPage' component={NoticationPage}/>
     

       

    
    </NotificationStack.Navigator>
 
 
  );
}
 
