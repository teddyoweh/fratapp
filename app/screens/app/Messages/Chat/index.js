import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";

import React,{ useState,useEffect,useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../../styles/messagestyles';
import { discoverstyles } from "../../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { MessageAdd, MessageAdd1, PenAdd,SearchNormal } from "iconsax-react-native";
import ChatScreen from "./ChatScreen";
import { HomeStack } from '../../Home';

const ChatStack = HomeStack
export default function ChatStacks({navigation,route}) {
 
  const {party_data} = route.params
  return (
    <ChatStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >
        <ChatStack.Screen name='ChatScreen' initialParams={{
          party_data:party_data
        }} component={ChatScreen}
     
        />
      

       

    
    </ChatStack.Navigator>
 
 
  );
}
 
