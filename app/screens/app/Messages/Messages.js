import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl, Pressable, Dimensions} from "react-native";
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
import { color_scheme } from "../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
function RenderCheckMark({stat}){
    //<MaterialCommunityIcons name="account-multiple-check-outline" size={24} color="black" />
    return (
        <>
        
        </>
    )
}
export default function MessagesScreen({navigation,route}){
    const {user,colorMode} = useContext(AppContext)
    const [refreshing, setRefreshing] = React.useState(false);

    const [data,setData] = useState(null)
    async function getMsgList(){
        await axios.post(endpoints['fetchmsglist'],{user_id:user.userid}).then(res=>{
          setData(res.data)
          console.log(res.data)
        })


    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMsgList()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      
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
    function sortByDate(arr) {
        return arr.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          // Compare the dates
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            return 0;
          }
        });

   
      }
    return (

        <View style={[messagestyles.container,{
            backgroundColor:color_scheme(colorMode,'white')
        }]}>
            <View
            style={{
                flexDirection:'column'
                
            }}            
            >

     
            <View style={messagestyles.top}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{
                       Haptics.impactAsync('medium')
                        navigation.goBack()}}
                    style={{
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'center',
                        height:33,
                        width:33,
                        backgroundColor:'#222',
                        borderRadius:100,
                        marginRight:10
                    }}
                    >
                        <Ionicons name="chevron-back" size={22} color={color_scheme(colorMode,'black')} />
                    </TouchableOpacity>
                    <Text style={{marginHorizontal:5,fontSize:20,fontWeight:800,color:color_scheme(colorMode,'black')}}>
                        Messages
                    </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Pressable
                    style={{
                        marginRight:10
                    }}
                    >
                    <Edit size="23" color={color_scheme(colorMode,'black')} variant="Broken"/>
                    </Pressable>
                </View>
            </View>
            <View style={{marginVertical:10,paddingHorizontal:10}}>
            <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search Messages, Groups, People"
                                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    />
            </View>
           
            {/* <ScrollView
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
                   
                </ScrollView> */}
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
                    marginBottom:50,
                    height:'100%',
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
                    <View>

             
                    <Text
                    style={{
                        paddingHorizontal:13,
                        fontSize:20,
                        marginBottom:10,
                        color:color_scheme(colorMode,'#333'),
                        fontWeight:'600'
                    }}
                    >
                        Recent
                    </Text>
                    </View>
                    {
                        data.contacts.latestMessages.length==0?<View
                        style={{
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                 
                            height:'50%'
                        }}
                        >
                                <Text
                                style={{
                                    fontWeight:'600',
                                    fontSize:17,
                                    color:'#444'
                                }}
                                >
                                    No Recent Messages
                                </Text>
                        </View>:
                      sortByDate(data.contacts.latestMessages).reverse().map((item,index)=>{
                            let name_ 
                            let uimg_  
                            let chat_data_
                            let type_ = item.receiver_type
                            let channel_id = item.channel_info? item.channel_info._id:null
 
                            let org_id = item.org_info? item.org_info._id:null
                            
                            if(item.receiver_type=='user'){
                                name_ = item.user_info.firstname+' '+item.user_info.lastname
                                uimg_ = item.user_info.uimg
                                chat_data_ = item.user_info
                            }
                            else if(item.receiver_type=='group'){
                                name_ = item.org_info.org_name
                                uimg_ = item.org_info.org_logo
                                chat_data_ = item.org_info
                            }

                            else if(item.receiver_type=='cohort'){
                        
                                name_ = item.channel_name
                                uimg_ = item.org_info.org_logo
                                chat_data_ = item.org_info
                            }
                            function shortenText(text,proportion) {
                                const maxLength = Math.floor(Dimensions.get('window').width * proportion)/10;
 
                                if (text.length <= maxLength) {
                                  return text;
                                } else {
                                  return text.slice(0, maxLength - 3) + '...';
                                }
                              }

                              name_ = shortenText(name_,0.8);
                        
                            return (
                                    <TouchableOpacity
                                
                                    onPress={()=>goToChat({...chat_data_,type_,name_,uimg_,receiver_type:item.receiver_type,channel_id:channel_id,
                                        org_id:org_id})}
                                    key={index}
                                    style={{
                                        flexDirection:'row',                    
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        width:'100%',
                                        borderBottomWidth:0.5,
                                        borderStyle:'solid',
                                        borderColor:color_scheme(colorMode,'#ddd'),
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
                                        borderWidth:1,
                                        borderStyle:'solid',
                                        borderColor:'#333',
                                        padding:1.4,
                                        borderRadius:100,
                        
                                     }}
                                     >
                                    <Image
                                    style={{
                                        height:45,
                                        width:45,
                                        borderRadius:100,
                                        

                                    }}
                                    source={{uri:wrapUIMG(uimg_)}}
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
                                            color:color_scheme(colorMode,"#333"),
                                            fontWeight:'400',
                                            fontSize:16,
                                     
                                        }}
                                        >
                                        {name_}
                                        </Text>
                                        <Text
                                        style={{
                                            color:!item.viewedby.includes(user.userid)?'white':color_scheme(colorMode,'#777777'),
                                            marginTop:5,
                                            fontWeight:!item.viewedby.includes(user.userid)?'500':'400',
                                            paddingLeft:2,
                                            fontSize:14,

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
                                        alignItems:'flex-end',
                                        justifyContent:"center",
 
                                    }}
                                    >
                                        <Text
                                        style={{
                                            fontSize:12,
                                            color:color_scheme(colorMode,'#aaa')
                                        }}
                                        >
                                            {formatMsgDate(item.date)}
                                        </Text>
                                        {
                                            !item.viewedby.includes(user.userid)&&
                                            <Ionicons name="checkmark-done" size={17} color="#555" style={{
                                                marginTop:10
                                            }} />
                                           
                                             }
                                    </View>
                                    </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>

            </View>
             }
        </View>
    )
}