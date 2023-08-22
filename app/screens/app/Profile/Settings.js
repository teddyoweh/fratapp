import React,{useState,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, Alert, TextInput, StyleSheet} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, Category2} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign,MaterialCommunityIcons, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import ProfilePosts from "../../../components/ProfilePosts";
import { wrapUIMG } from "../../../utils/utils";
import { clearData } from "../../../utils/storage";
import { AuthContext } from "../../../context/authContext";
import { color_scheme } from "../../../config/color_scheme";


export default function Settings({navigation}){
    const {user,colorMode} = useContext(AppContext)
    const {setIsAuth} = useContext(AuthContext)
    async function logtfout(){

        await clearData()
        setIsAuth(false)
    }
    function logOuT(){
        Alert.alert('Logout', `Are you sure you want to log out of  @${user.username}`, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Logout', 
            style:'destructive',
            onPress: () => logtfout()
            
        
        },
          ]);
      
    }
    
    return (
        <View style={{backgroundColor:color_scheme(colorMode,'white'),flex:1,height:'100%'}}>
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,
        borderBottomWidth:1,borderColor:color_scheme(colorMode,"#eee"),borderStyle:"solid",paddingBottom:10
        }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>

            <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,"#333")} />
        </TouchableOpacity>
            <Text style={{
                marginLeft:5,
                fontSize:23,
                fontWeight:'bold',
                color:color_scheme(colorMode,"#333")
            }}>
                Settings
            </Text>
            </View>
            <View
            style={{
                width:'100%',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                paddingTop:10
            }}
            >


            <View style={{marginVertical:10,
  
            
             marginBottom:30,shadowRadius:4 ,
             width:'95%',
           
          
             borderRadius:10,
             marginBottom:10,
             paddingVertical:10,
             backgroundColor:color_scheme(colorMode,"white")
             
            }}>
                <ScrollView>
                    <View  style={[settingstyles.settingoptions,{backgroundColor:color_scheme(colorMode,"white")}]}>
               
                            <Text
                                          style={[settingstyles.settingoptionstext,{color:color_scheme(colorMode,"#333")}]}

                            >
                                Email
                            </Text>
                            <Ionicons name="chevron-forward" size={24} color={color_scheme(colorMode,"#333")} />
                
                    </View>
                    <View   style={[settingstyles.settingoptions,{backgroundColor:color_scheme(colorMode,"white")}]}>
               
               <Text
              style={[settingstyles.settingoptionstext,{color:color_scheme(colorMode,"#333")}]}

               >
                  Password
               </Text>
               <Ionicons name="chevron-forward" size={24} color={color_scheme(colorMode,"#333")} />
   
                    </View>
                    <View  style={[settingstyles.settingoptions,{borderBottomWidth:0,backgroundColor:color_scheme(colorMode,"white")}]}>
               <Text
    style={[settingstyles.settingoptionstext,{color:color_scheme(colorMode,"#333")}]}
               >
                  Logout
               </Text>
               <TouchableOpacity onPress={()=>logOuT()}>


               <MaterialCommunityIcons name="logout" size={24} color={color_scheme(colorMode,"#333")} />
   
               </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            </View>
        </View>
    )
}


const settingstyles = StyleSheet.create({
    settingoptions:{
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'space-between',
    borderBottomWidth:0.5,
    borderColor:'#222',
    borderStyle:"solid",
    
    paddingVertical:15,                                
                },
    settingoptionstext: {
                    fontSize:17,
                    fontWeight:'600',
                    color:'#333'
                }
})