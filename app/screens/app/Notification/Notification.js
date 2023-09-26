
import React, { useContext, useEffect, useState } from "react"
import { View,Text, TouchableOpacity } from "react-native"
import { AppContext } from "../../../context/appContext"
import { color_scheme } from "../../../config/color_scheme"
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics'
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import Spinner from "../../../components/Spinner";
import { ScrollView } from "react-native-gesture-handler";
import { wrapUIMG } from "../../../utils/utils";
import { Image } from "react-native";

export default function NoticationPage({navigation}){
    const [data,setData] = useState(null)
    const {user,colorMode} = useContext(AppContext)
    const filters  = ['All','Posts','Messages','Events','Links','Organizations']
    const [activeFilter,setActiveFilter] = useState('All')
    
    async function getNotifications(){
        await axios.post(endpoints['get_notifications'],{
            userid:user.userid
        }).then(res=>{

    
         
            setData(res.data)
        }
        ).catch(err=>console.log(err))
    }
    function swapFilter(item){
        setActiveFilter(item)
    }
    useEffect(()=>{
        getNotifications()
    },[])

    function notifFilter(){
        if(activeFilter=='All'){
            return data.notifications
        }else if(activeFilter=='Posts'){
            return data.notifications.filter(item=>item.party_type=='post')
        }else if(activeFilter=='Messages'){
            return data.notifications.filter(item=>item.party_type=='message')
        }else if(activeFilter=='Events'){
            return data.notifications.filter(item=>item.party_type=='event')
        }else if(activeFilter=='Links'){
            return data.notifications.filter(item=>item.party_type=='link')
        }else if(activeFilter=='Organizations'){
            return data.notifications.filter(item=>item.party_type=='org')
        }
    }
    async function updateMemberStatus(orgid,userid,status,notif_id){
        await axios.post(endpoints['update_member_status'],{
            orgid:orgid,
            userid:userid,
            status:'active',
            notif_id:notif_id
        })
    }
    async function updateLinkStatus(orgid,userid,status,notif_id){
        await axios.post(endpoints['update_link_stat'],{
            notif_id:notif_id,
            userid:userid,

        })
    }
    function notifAction(data){
        if(notif_type=='orginvite'){
            const {notif_type,notif_id,orgid,userid,status} = data
            updateMemberStatus(orgid,userid,status,notif_id)
        }
        if(notif_type=='link'){
            const {notif_type,notif_id,orgid,userid,status} = data
            updateMemberStatus(orgid,userid,status,notif_id)
        }
        
    }
    return ( 
        <View
        style={{
            flex:1,
            backgroundColor:color_scheme(colorMode,'white')
         

        }} 

        >
             <View style={{flexDirection:'row',alignItems:'center',
            paddingHorizontal:10}}>
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
                        Notifications
                    </Text>
                </View>
            {data==null?
            <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            }}
            >
<Spinner/>

            </View>
            :
                data.notifications.length==0?
                <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',

                }}
                >
                <Text
                style={{
                    fontSize:20,
                    fontWeight:'bold',
                    color:"#666"
                }}
                >No Notifications</Text>
                </View>
                :
                <View>
                    <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal:16,
                        paddingVertical:8,
                    }}
                    horizontal={true}
                    >
                        {
                            filters.map((item,index)=>{
                                const btnstyle = activeFilter==item?{backgroundColor:'white',paddingHorizontal:13,paddingVertical:8,borderRadius:10,marginHorizontal:1}:{paddingHorizontal:13,marginHorizontal:1,paddingVertical:8}
                                const btntxtstyle = activeFilter==item?{
                                    fontSize:15,
                                    color:'#333'
                                }:{
                                    fontSize:15,
                                    color:'#666'
                                }

                                return (
                                    <TouchableOpacity
                                    style={btnstyle}
                                    onPress={()=>swapFilter(item)}
                                    >
                                        <Text
                                        style={btntxtstyle}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                    <ScrollView
                    style={{
                        paddingHorizontal:16,
                        paddingVertical:17,
                    }}
                    >


                        {
                            data.notifications.map((item,index)=>{
                                return (
                                    <>
                                   { item.party_type=='org'&&
                                    <View
                                    style={{
                                   
                                        paddingVertical:12,
                                        marginBottom:10,
                                        borderBottomWidth:1,
                                        borderColor:'#333',
                                        borderStyle:'solid',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                      <View
                                      style={{

                                        flexDirection:'row',
                                        alignItems:'center',
                                      }}
                                      >
                                        
                                        <View>
                                            <Image source={{uri:wrapUIMG(item.org_details.org_logo)}}
                                            style={{
                                                height:45,
                                                width:45,
                                                borderRadius:100
                                            }}
                                            />
                                        </View>
                                        <View
                                        style={{
                                            paddingHorizontal:10,
                                            flexDirection:'column',
                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:17,
                                                fontWeight:'bold',
                                                color:'white'
                                            }}
                                            >
                                                {item.org_details.org_name} 
                                            </Text>
                                            <Text
                                            style={{
                                                fontSize:15,
                                                color:"#ccc"
                                            }}
                                            >
                                                Invited you to join  
                                            </Text>
                                        </View>
                                      </View>
                                      {
                                        item.orginvite_stat?
                                        <View>
                                        <View
                                        style={{
                                            
                                            backgroundColor:'#555',
                                            paddingHorizontal:10,
                                            paddingVertical:8,
                                            borderRadius:10,
                                            alignItems:'center',
                                            justifyContent:'center'

                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:15,
                                                fontWeight:'300',
                                                color:'white'
                                            }}
                                            >
                                                {
                                                    item.orginvite_stat
                                                }
                                            </Text>

                                        </View>
                                        </View>
                                    :
                                      <View
                                      style={{

                                        flexDirection:'row',
                                        alignItems:'center',
                                      }}
                                      >
                                            <TouchableOpacity
                                            onPress={()=>notifAction({notification_type:item.notification_type,notif_id:item._id,orgid:item.org_details._id,userid:user.userid,status:'Accepted'})}
                                            style={{
                                                backgroundColor:"#a330d0",
                                                paddingHorizontal:10,
                                                paddingVertical:8,
                                                borderRadius:10,
                                                alignItems:'center',
                                                justifyContent:'center'

                                            }}
                                            >
                                                <Text
                                                style={{
                                                    fontSize:15,
                                                    fontWeight:'300',
                                                    color:'white'
                                                }}
                                                >
                                                    Join
                                                </Text>
                                            </TouchableOpacity>
                                        <TouchableOpacity
                                        style={{
                                            paddingHorizontal:10,
                                            paddingVertical:8,
                                            borderRadius:10,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:15,
                                                fontWeight:'300',
                                                color:'#ccc'
                                            }}
                                            >
                                                Ignore
                                            </Text>
                                        </TouchableOpacity>
                                            
                                      </View>
                                        }
                                    </View>
                            }
                                  { item.party_type=='user'&&
                                    <View
                                    style={{
                                 
                                        paddingVertical:13,
                                        marginBottom:10,
                                        borderBottomWidth:1,
                                        borderColor:'#333',
                                      
                                   
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                      <View
                                      style={{

                                        flexDirection:'row',
                                        alignItems:'center',
                                      }}
                                      >
                                        
                                        <View>
                                            <Image source={{uri:wrapUIMG(item.user_details.uimg)}}
                                            style={{
                                                height:45,
                                                width:45,
                                                borderRadius:100
                                            }}
                                            />
                                        </View>
                                        <View
                                        style={{
                                            paddingHorizontal:10,
                                            flexDirection:'column',
                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:17,
                                                fontWeight:'bold',
                                                color:'white'
                                            }}
                                            >
                                                {item.user_details.firstname + ' ' + item.user_details.lastname} 
                                            </Text>
                                            <Text
                                            style={{
                                                fontSize:15,
                                                color:"#ccc"
                                            }}
                                            >
                                                Requested to Link
                                            </Text>
                                        </View>
                                      </View>
                                      {
                                        item.orginvite_stat?
                                        <View>
                                        <View
                                        style={{
                                            backgroundColor:'#555',
                                            paddingHorizontal:10,
                                            paddingVertical:8,
                                            borderRadius:10,
                                            alignItems:'center',
                                            justifyContent:'center'

                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:15,
                                                fontWeight:'300',
                                                color:'white'
                                            }}
                                            >
                                                {
                                                    item.orginvite_stat
                                                }
                                            </Text>

                                        </View>
                                        </View>
                                    :
                                      <View
                                      style={{

                                        flexDirection:'row',
                                        alignItems:'center',
                                      }}
                                      >
                                            <TouchableOpacity
                                            onPress={()=>notifAction({notification_type:item.notification_type,notif_id:item._id,userid:user.userid,status:'Accepted'})}
                                            style={{
                                                backgroundColor:"#a330d0",
                                                paddingHorizontal:10,
                                                paddingVertical:8,
                                                borderRadius:10,
                                                alignItems:'center',
                                                justifyContent:'center'

                                            }}
                                            >
                                                <Text
                                                style={{
                                                    fontSize:15,
                                                    fontWeight:'300',
                                                    color:'white'
                                                }}
                                                >
                                                    Link
                                                </Text>
                                            </TouchableOpacity>
                                        <TouchableOpacity
                                        style={{
                                            paddingHorizontal:10,
                                            paddingVertical:8,
                                            borderRadius:10,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                        >
                                            <Text
                                            style={{
                                                fontSize:15,
                                                fontWeight:'300',
                                                color:'#ccc'
                                            }}
                                            >
                                                Ignore
                                            </Text>
                                        </TouchableOpacity>
                                            
                                      </View>
                                        }
                                    </View>
                            }
                                 
                                    
                                    </>
                                    
                                )
                            })
                        }

                    </ScrollView>
                    
                </View>

            }
        
        </View>
    )
}