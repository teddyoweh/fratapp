import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import { useContext, useEffect, useState,useCallback } from "react";
import { AppContext } from "../../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import Spinner from '../../../../components/Spinner'



export default function OrgPage({navigation,route}){

    return (

 
    <View
    style={{
        height:'100%',
        backgroundColor:'white',
        flex:1,
        width:'100%',
        flexDirection:'column'
    }}
    >
        <View
        style={{
            paddingHorizontal:10,
            paddingBottom:5,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderBottomWidth:1,
            borderStyle:'solid',
            borderColor:'#eee'

        }}
        >
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>

            <TouchableOpacity>

            <Entypo name="dots-three-horizontal" size={20} color="#333" />
            </TouchableOpacity>

        </View>
        <View
        style={{
            flex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'white'
        }}
        >



        <ScrollView
        contentContainerStyle={{
            flex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'white'
        }}
        >

        </ScrollView>
        </View>
    </View>
       )

}