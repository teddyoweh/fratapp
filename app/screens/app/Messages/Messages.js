import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";
import React,{ useState,useEffect,useLayoutEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../styles/messagestyles';
import { discoverstyles } from "../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { ChartCircle, MessageAdd, MessageAdd1, PenAdd,SearchNormal } from "iconsax-react-native";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { AppContext } from "../../../context/appContext";
function RenderCheckMark({stat}){
    //<MaterialCommunityIcons name="account-multiple-check-outline" size={24} color="black" />
    return (
        <>
        
        </>
    )
}
export default function MessagesScreen({navigation,route}){
    const {user} = useContext(AppContext)
    async function getMsgList(){
        await axios.post(endpoints['fetchmsglist'],{user_id:user.userid}).then(res=>{
            console.log(res.data)
            alert(JSON.stringify(res.data))
        })


    }
    const msgfilters = ['All','Unread','Groups']
    const [msgfilter,setMessageFilter] = useState(msgfilters[0])
    function swapFil(msgfil){
        setMessageFilter(msgfil)
    }
    useEffect(()=>{
        getMsgList()
    },[])
    return (

        <View style={messagestyles.container}>
            <View
            style={{
                flexDirection:'column'
                
            }}            
            >

     
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
            <ScrollView
                horizontal
                contentContainerStyle={{
                    marginTop:10,
                    paddingVertical:8,
                    
                    borderRadius:10,
                    width:'100%',
 
                }}
                >
                    {msgfilters.map((msgfil,index)=>{
return (


<TouchableOpacity
onPress={()=>swapFil(msgfil)}
 
style={{
    flexDirection:'row',
    alignItems:'center',
    marginRight:9,
    backgroundColor:msgfil==msgfilter?'#333':"transparent",
    borderWidth:4,
    borderStyle:'solid',
    borderColor:msgfil==msgfilter?"#eee":'transparent',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:30
}}
>
    <Text
    style={{
        fontSize:17,
        fontWeight:'600',
        color:msgfil==msgfilter?'white':"#999",
    }}
    >
        {msgfil}
    </Text>
    <View
    style={{
        marginLeft:5,
        height:20,
        width:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
   
        backgroundColor:msgfil==msgfilter?'white':"#999",
    }}
    >
        <Text
        style={{
            color:msgfil==msgfilter?'#333':'white',
            fontSize:13
        }}
        >
            3
        </Text>
    </View>
</TouchableOpacity>
)
                    })}
                   
                </ScrollView>
            </View>
            </View>
            <View
            style={{
                flexDirection:'column',
            
            }}
            >

            
                <ScrollView
                contentContainerStyle={{
                    paddingTop:10
                }}
                >
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item,index)=>{
                            return (
                                    <View
                                    key={index}
                                    style={{
                                        flexDirection:'row',                    
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        width:'100%',
                                        borderBottomWidth:1,
                                        borderStyle:'solid',
                                        borderColor:'#eee',
                                        paddingVertical:11,
                                        paddingHorizontal:13
                                    
                                    
                                    }}
                                    >
                                    <View
                                    style={{
                                        flexDirection:'row',
                                        width:'80%'

                                    }}
                                    >
                                     <View
                                     style={{
                                        flexDirection:"column",
                        
                                     }}
                                     >
                                    <Image
                                    style={{
                                        height:45,
                                        width:45,
                                        borderRadius:100

                                    }}
                                    source={{uri:'https://www.teddyoweh.net/_next/static/media/oweh.683faa7f.jpg'}}
                                    />
                                    </View>   
                                    <View
                                    style={{
                                        flexDirection:'column',
                                        paddingHorizontal:10,
                                        
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:"#333",
                                            fontWeight:'400',
                                            fontSize:17,
                                     
                                        }}
                                        >
                                        Teddy Oweh
                                        </Text>
                                        <Text
                                        style={{
                                            color:'#999',
                                            marginTop:5,
                                            fontWeight:'300',
                                            paddingLeft:4,
                                            fontSize:13
                                        }}
                                        >
                                        how have you been?
                                        </Text>
                                    </View>
                                    </View>
                                    <View
                                    style={{
                                        flexDirection:'column',
                                        paddingHorizontal:10,
                                        width:'20%',
                                        alignItems:'flex-end',
                                        justifyContent:"space-between"
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:"#333",
                                            fontWeight:'300',
                                            fontSize:12
                                        }}
                                        >
                                        12:00PM
                                        </Text>

                                        
                                    </View>
                                    </View>
                            )
                        })
                    }

                </ScrollView>
            </View>
        </View>
    )
}