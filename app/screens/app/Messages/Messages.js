import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable} from "react-native";
import React,{ useState,useEffect,useLayoutEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../styles/messagestyles';
import { discoverstyles } from "../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { ChartCircle, Edit, MessageAdd, MessageAdd1, PenAdd,Profile2User,SearchNormal, UserAdd } from "iconsax-react-native";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { AppContext } from "../../../context/appContext";
import Spinner from "../../../components/Spinner";
import { formatMsgDate, removeExcessWhitespace, wrapUIMG } from "../../../utils/utils";
function RenderCheckMark({stat}){
    //<MaterialCommunityIcons name="account-multiple-check-outline" size={24} color="black" />
    return (
        <>
        
        </>
    )
}
export default function MessagesScreen({navigation,route}){
    const {user} = useContext(AppContext)
    const [data,setData] = useState(null)
    async function getMsgList(){
        await axios.post(endpoints['fetchmsglist'],{user_id:user.userid}).then(res=>{
          setData(res.data)
          console.log(res.data)
        })


    }
    const msgfilters = ['All','Unread','Groups']
    const [msgfilter,setMessageFilter] = useState(msgfilters[0])
    function swapFil(msgfil){
        setMessageFilter(msgfil)
    }

    function goToChat(data){
     
        navigation.navigate('ChatStacks',{
            party_data:data
        })
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
                    <Pressable
                    style={{
                        marginRight:10
                    }}
                    >
                    <Edit size="23" color="#333" variant="Broken"/>
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
key={index}
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
            {
                data==null?<View
                style={{
                    flex:1
                }}
                >
                    <Spinner/>
                </View>
           :
            <View
            style={{
                flexDirection:'column',
            
            }}
            >
 <ScrollView
                contentContainerStyle={{
                    paddingTop:10,
                    marginBottom:50
                }}
                >
                    <View>

             
                    <Text
                    style={{
                        paddingHorizontal:13,
                        fontSize:20,
                        marginBottom:10,
                        color:'#333',
                        fontWeight:'600'
                    }}
                    >
                        Recent
                    </Text>
                    </View>
                    {
                        data.contacts.map((item,index)=>{
                            return (
                                    <TouchableOpacity
                                
                                    onPress={()=>goToChat(item.user_info)}
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
                                        width:'70%'

                                    }}
                                    >
                                     <View
                                     style={{
                                        flexDirection:"column",
                        
                                     }}
                                     >
                                    <Image
                                    style={{
                                        height:55,
                                        width:55,
                                        borderRadius:100

                                    }}
                                    source={{uri:wrapUIMG(item.user_info.uimg)}}
                                    />
                                    </View>   
                                    <View
                                    style={{
                                        flexDirection:'column',
                                        paddingHorizontal:10,
                                        justifyContent:'center'
                                        
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:"#333",
                                            fontWeight:'400',
                                            fontSize:17,
                                     
                                        }}
                                        >
                                        {item.user_info.firstname+' '+item.user_info.lastname}
                                        </Text>
                                        <Text
                                        style={{
                                            color:'#999',
                                            marginTop:5,
                                            fontWeight:'3400',
                                            paddingLeft:4,
                                            fontSize:16
                                        }}
                                        >
                                     {removeExcessWhitespace(item.content)}
                                        </Text>
                                    </View>
                                    </View>
                                    <View
                                    style={{
                                        flexDirection:'column',
                                        paddingHorizontal:10,
                                        width:'20%',
                                        alignItems:'center',
                                        justifyContent:"space-between"
                                    }}
                                    >
                                        <Text
                                        style={{
                                            fontSize:15,
                                            color:'#aaa'
                                        }}
                                        >
                                            {formatMsgDate(item.date)}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop:10,
                                                height:7,
                                                backgroundColor:'#333',
                                                width:7,
                                                borderRadius:100
                                            }}
                                        >

                                        </View>
                                        
                                    </View>
                                    </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>
            
                <ScrollView
                contentContainerStyle={{
                    paddingTop:10
                }}
                >
                    <View>

             
                    <Text
                    style={{
                        paddingHorizontal:13,
                        fontSize:20,
                        marginBottom:10,
                        color:'#333',
                        fontWeight:'600'
                    }}
                    >
                        Suggested
                    </Text>
                    </View>
                    {/* {
                     data.suggested &&   
                        data.suggested.map((item,index)=>{
                            console.log(item,'checking for sumn')
                            return (
                                    <TouchableOpacity
                                
                                    onPress={()=>goToChat(item)}
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
                                    source={{uri:wrapUIMG(item.uimg)}}
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
                                        {item.firstname+' '+item.lastname}
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
                                        Tap to Chat
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
                                        <Ionicons name="chevron-forward" size={2} color="black" />

                                        
                                    </View>
                                    </TouchableOpacity>
                            )
                        })
                    } */}

                </ScrollView>
            </View>
             }
        </View>
    )
}