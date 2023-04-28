import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";

import React,{ useState,useEffect,useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../styles/messagestyles';
import { discoverstyles } from "../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { MessageAdd, MessageAdd1, PenAdd,SearchNormal } from "iconsax-react-native";
export default function MessagesScreen({navigation,route}){
   
 
    return (
        <View style={messagestyles.container}>
            <View style={messagestyles.top}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{marginHorizontal:5,fontSize:20,fontWeight:800}}>
                        Messages
                    </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Pressable>
                    <FontAwesome name="pencil-square-o" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            <View style={{marginVertical:10,paddingHorizontal:10}}>
            <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search Messages, Groups, People"/>
            </View>
            </View>
        </View>
    )
}