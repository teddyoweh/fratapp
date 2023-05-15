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


export default function Settings({navigation}){
    const {user} = useContext(AppContext)
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
        <View style={{backgroundColor:'white',flex:1,height:'100%'}}>
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,
        borderBottomWidth:1,borderColor:'#ddd',borderStyle:"solid",paddingBottom:10
        }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>

            <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
            <Text style={{
                marginLeft:5,
                fontSize:23,
                fontWeight:'bold',
                color:'#333'
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
             elevation: 10,
             shadowColor: '#999',
             shadowOffset: { width: 3, height: 10 },
             shadowOpacity: 0.35,
             marginBottom:30,shadowRadius:4 ,
             width:'95%',
             borderStyle:'solid',
             borderWidth:1,
             borderColor:'#eee',
             borderRadius:10,
             marginBottom:10,
             paddingVertical:10,
             backgroundColor:'white'
             
            }}>
                <ScrollView>
                    <View  style={settingstyles.settingoptions}>
               
                            <Text
                                          style={settingstyles.settingoptionstext}

                            >
                                Email
                            </Text>
                            <Ionicons name="chevron-forward" size={24} color="#333" />
                
                    </View>
                    <View  style={settingstyles.settingoptions}>
               
               <Text
                           style={settingstyles.settingoptionstext}

               >
                  Password
               </Text>
               <Ionicons name="chevron-forward" size={24} color="#333" />
   
                    </View>
                    <View  style={[settingstyles.settingoptions,{borderBottomWidth:0}]}>
               <Text
               style={settingstyles.settingoptionstext}
               >
                  Logout
               </Text>
               <TouchableOpacity onPress={()=>logOuT()}>


               <MaterialCommunityIcons name="logout" size={24} color="black" />
   
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
    borderColor:'#ddd',
    borderStyle:"solid",
    paddingHorizontal:10,
    paddingVertical:10,                                
                },
    settingoptionstext: {
                    fontSize:17,
                    fontWeight:'600',
                    color:'#333'
                }
})