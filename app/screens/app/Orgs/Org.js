import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles,discoverstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { useContext, useEffect, useState,useCallback } from "react";
import { AppContext } from "../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import Spinner from '../../../components/Spinner'
import Loading from "../../../components/Loading";
import { wrapUIMG } from "../../../utils/utils";
function RenderOrgs({Orgs,setOrgs,FetchOrgs,navigation}){
    const {user} = useContext(AppContext);
    console.log(Orgs)
    useEffect(
        ()=>{
            FetchOrgs()
        }

    ,[])
 
    return (
       
        <View
        style={{
            height:'100%'
        }}
        >
            
            {Orgs?
            Orgs.length==0?
            <View
            style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                <Text
                style={{
                    color:'#aaa',
                    fontSize:18,
                    fontWeight:'700'
                }}
                >
                    No Organizations
                </Text>
            </View>
            :
            Orgs.map((deorg,index)=>{
                const org = deorg.org
                console.log(org)
                return (
                    <View key={index}
                    style={{
                        
                      
                    }}
                    >
                        <TouchableOpacity style={{
                            paddingHorizontal:10,
                            paddingVertical:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            borderColor:'#eee'
                        }}
                        onPress={()=>navigation.navigate('OrgPageStacks',{
                            org:org
                        })}
                        >

                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                        >
                            <View>
                                {
                                    org.org_logo!=null?<Image
                                    source={{uri:wrapUIMG(org.org_logo)}}
                                    style={{
                                        width:55,
                                        height:55,
                                        marginRight:10,
                                        borderRadius:org.org_logo=='/profileimg/defaultorgimg.png'?0: 100,
                                        
                                    }}
                                    >

                                    </Image>:
                                    <View
                                    style={{
                                        height:50,
                                    width:50,
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
                                            fontSize:16,
                                            fontWeight:500
                                        }}
                                        >
                                            {org.org_shortname}
                                        </Text>
                                    </View>
                                }

                            </View>
               
                        <Text
                        style={{
                            color:'#333',
                            fontSize:16,
                            fontWeight:500
                        }}
                        >
                            {org.org_name}
                        </Text>
                        </View>
                        <View>
                        <Ionicons name="ios-chevron-forward" size={24} color="black" />
                        </View>
                        </TouchableOpacity>
                    </View>
                )
            }):
            
           <Loading/>
                
                }
   


        </View>
    )
    
}
export default function OrgHome({navigation}){
    const [refreshing, setRefreshing] = useState(false);
    const [Orgs,setOrgs] =  useState(null);
    const {user} = useContext(AppContext);
    async function FetchOrgs(){
        await axios.post(endpoints['getorgs'],{user_id:user.userid}).then(res=>{
            setOrgs(res.data.orgs)
 
        })

    }
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      FetchOrgs()
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    return (
        <View style={{backgroundColor:'white',flex:1,height:'100%'}}>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:10,
               
    
                paddingBottom:10,
                justifyContent:'space-between'
            }}>
                <Text 
                style={{
                    marginLeft:5,
                    fontSize:25,
                    fontWeight:'700',
                    color:'#333'
                }}
                >
                    Organizations
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('CreateOrgs')}>
                <ElementPlus
                variant="Bulk"
                size={30}
                color="#a330d0"
                />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical:10,paddingHorizontal:10}}>
            <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search My Organizations"/>
            </View>
            </View>
            <View
            style={{
                flex:1,
                height:'100%',
                width:'100%',
          
            }}
            >

                <ScrollView
                contentContainerStyle={{
                    height:'100%'
                }}
                 refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
         
           
                    <RenderOrgs Orgs={Orgs} setOrgs={setOrgs} FetchOrgs={FetchOrgs} navigation={navigation}/>
                
                </ScrollView>

            </View>
            
        </View>
        
    )
}