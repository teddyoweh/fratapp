import React,{useState,useContext,useRef, useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, StyleSheet, TextInput,  RefreshControl, Dimensions} from "react-native";
import { discoverstyles, homestyles,marketplacestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Add, Send2, Messenger, Verify, Notification, ShoppingCart, SearchNormal, Heart} from 'iconsax-react-native';
import { FontAwesome,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
 
 
import { wrapUIMG } from "../../../utils/utils";
import Spinner from "../../../components/Spinner";
import { schedulePushNotification, setupNotifications } from "../../../config/setup";
import { color_scheme } from "../../../config/color_scheme";
import { BlurView } from "expo-blur";
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics'
import axios from "axios";
import io from 'socket.io-client';
import { endpoints } from "../../../config/endpoints";
import { serverhost } from "../../../config/ip";


const arr =[
    {
        img:"https://www.pcworld.com/wp-content/uploads/2023/04/pcw-windows10-tv-100829154-orig.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://www.pcworld.com/wp-content/uploads/2023/04/pcw-windows10-tv-100829154-orig.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://www.pcworld.com/wp-content/uploads/2023/04/pcw-windows10-tv-100829154-orig.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://www.pcworld.com/wp-content/uploads/2023/04/pcw-windows10-tv-100829154-orig.jpg",
        title:"50 Inch TV",
        price:"$500",
    },
    {
        img:"https://media.cnn.com/api/v1/images/stellar/prod/nike-ultrafly-lead-cnnu.jpg",
        title:"50 Inch TV",
        price:"$500",
    }
]
export default function MarketPlaceScreen(){
    const {colorMode} = useContext(AppContext)
    const [search, setSearch] = useState('')
    const [activeOption, setActiveOption] = useState('All')
    function performSearch(){

    }
    const options = ['All','Shops','Products','Services']
    return (
        <View
        style={[marketplacestyles.container,{
            backgroundColor:color_scheme(colorMode,"white")
        }]}
        >
            <View
            style={{
                flexDirection:'column',
      
            }}
            >

      
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:10
            }}            
            >
                <Text
                style={{
                    flexDirection:'row',
                    color:'white',
                    fontSize:30,
                    fontWeight:800
                }}
                >
                    Shop
                </Text>
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}
                >
    
                    <TouchableOpacity
                    style={{
                        marginRight:10
                    }}
                    >
<ShoppingCart size="26" color="#fff"/>           
         </TouchableOpacity>
         <TouchableOpacity
                    style={{
                        marginRight:10
                    }}
                    >
                        <Ionicons name="ios-notifications-outline" size={26} color="white" />
                    </TouchableOpacity>
         <TouchableOpacity
                    style={{
                        marginRight:10
                    }}
                    >
                        <FontAwesome name="user-circle-o" size={26} color="white" /> 
                 </TouchableOpacity>

                </View>
            </View>
            <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search for products, shops, services, categories..."
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal
                contentContainerStyle={{
                    flexDirection:'row',
                    alignItems:'flex-start',
                }}
                style={{
            
                    marginTop:20,
                    marginBottom:20,
                
                }}
                >
                    {
                        options.map((option,index)=>(
                            <TouchableOpacity
                            key={index}
                            onPress={()=>setActiveOption(option)}
                            style={{
                                marginRight:10,
                                padding:10,
                                borderRadius:10,
                                backgroundColor:activeOption==option?"white":color_scheme(colorMode,'#eee')
                            }}
                            >
                                <Text
                                style={{
                                    color:activeOption==option?"black":'#888',
                                    fontSize:13,
                                    fontWeight:'bold'
                                }}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                </View>
                <ScrollView
                contentContainerStyle={{
                    flexDirection:'row',
                    alignItems:'flex-start',
                    flexWrap:'wrap',
                    justifyContent:'space-between'
                
                }}
                >
                    {arr.map((item,index)=>{

                        return (
                            <View
                            style={{
                                flexDirection:'column',
                                marginBottom:20
                            }}
                            >
                                <Image source={{uri:item.img}}
                                style={{
                                    width:Dimensions.get('window').width/2-20,
                                    height:Dimensions.get('window').height/4-20,
                                    borderRadius:10,
                                    marginBottom:10
                                
                                }}
                                />
                                <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between'
                                }}
                                >
                                <View
                                style={{
                                    flexDirection:'column'
                                }}
                                >
                                    <Text
                                    style={{
                                        fontSize:13,
                                        fontWeight:400,
                                        color:"white",
                                        marginBottom:5
                                    
                                    }}
                                    >
                                        {item.title}
                                    </Text>
                              
                                        <Text
                                        style={{
                                            fontSize:18,
                                            color:"white",
                                            fontWeight:900
                                        
                                        }}
                                        >
                                            {item.price}
                                        </Text>
                                        </View>
                                        {/* <TouchableOpacity
                                        style={{
                                            height:10,
                                            width:10,
                                            borderRadius:50,
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                        >
                                        <Heart size="20" color="white"/>
                                        </TouchableOpacity> */}
                                </View>
                                

                            </View>
                        )

                    })}

                </ScrollView>


        </View>
    )
}
