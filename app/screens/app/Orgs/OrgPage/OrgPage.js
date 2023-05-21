import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import { useContext, useEffect, useState,useCallback } from "react";
import { AppContext } from "../../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import Spinner from '../../../../components/Spinner'
import { makeeventstyles } from "../../Calendar/MakeEvent";


export default function OrgPage({navigation,route}){
   

     const {org} = route.params
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
        <View>
            <View
            style={{
            flexDirection:'row',
            paddingHorizontal:15,
            paddingVertical:20
            }}
            >
                <View
                style={{
 
                    flexDirection:'row',
                    alignItems:'flex-start',
            
                }}
                >
                    {
                        org.org_logo!=null?<Image>

                        </Image>:
                      <View
                      style={{
                          height:80,
                      width:80,
                          borderRadius:10,
                          backgroundColor:'#eee', 
                          marginRight:10,
                          flexDirection:'row',
                          justifyContent:'center',
                          alignItems:'center',
                          borderStyle:'solid',
                          borderWidth:1,
                          borderColor:'#ccc',
                          paddingHorizontal:5
                      }}
                      >
                          <Text
                          style={{
                              color:'#333',
                              fontSize:20,
                              fontWeight:500
                          }}
                          >
                              {org.org_shortname}
                          </Text>
                      </View>
                                                                                                                                                                                   }
                </View>
                <View
                style={{
                    flexDirection:'column',
                    alignItems:'flex-start',
                    justifyContent:'center'
                }}
                >
                    <Text
                    style={{
                        fontSize:20,
                        flexWrap:'wrap',
                        color:'#333',
                        fontWeight:700
                    }}
                    >
                        {org.org_name}
                    </Text>
                    <Text
                    style={{
                        fontSize:16,
                        color:'#333',
                        fontWeight:500,
                        marginTop:5
                    }}
                    >
                        {org.org_description}
                    </Text>
                </View>
            </View>
            <View>
                <ScrollView
                horizontal
                >
                <View style={{flexDirection:"row",flexWrap:'wrap',paddingHorizontal:10}}>
                        {
                            org.org_teams.map((team,index)=>{
                                return (
                                    <TouchableOpacity key={index} style={{paddingVertical:7,paddingHorizontal:7
                                    ,
                                    }} >
                                    <Text style={[makeeventstyles.eventtypetext,{fontSize:13}]}>{team}</Text>
                                </TouchableOpacity>   
                                )
                            })
                        }
                    </View>

                </ScrollView>
            </View>
        </View>

        </ScrollView>
        </View>
    </View>
       )

}