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
import { color_scheme } from "../../../config/color_scheme";
function RenderOrgs({Orgs,setOrgs,FetchOrgs,navigation}){
    const {user,colorMode} = useContext(AppContext);

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
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                  <Image source={require("../../../assets/island.png")}
          style={{
            height:200,
            width:200
          }}
          />
                <Text
                style={{
                    color:color_scheme(colorMode,'#eee'),
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
                            borderBottomWidth:0.5,
                            borderStyle:'solid',
                            borderColor:color_scheme(colorMode,'#dddd'),
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
                                        backgroundColor:color_scheme(colorMode,'#eee'), 
                                        marginRight:10,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        borderStyle:'solid',
                                        borderWidth:1,
                                        borderColor:color_scheme(colorMode,'#ccc'),
                                        paddingHorizontal:5
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:color_scheme(colorMode,'#333'),
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
                            color:color_scheme(colorMode,'#333'),
                            fontSize:16,
                            fontWeight:500
                        }}
                        >
                            {org.org_name}
                        </Text>
                        </View>
                        <View>
                        <Ionicons name="ios-chevron-forward" size={22} color={color_scheme(colorMode,'#aaa')} />
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
    const {user,colorMode} = useContext(AppContext);
    const [searchTerm,setSearchTerm] = useState('')
    async function FetchOrgs(){
        await axios.post(endpoints['getorgs'],{user_id:user.userid}).then(res=>{
            setOrgs(res.data.orgs)
 
        })

    }
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    
        const filteredOrgs = Orgs.filter(org => org.org_name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(filteredOrgs);
      };
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      FetchOrgs()
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    const [search,setSearch] = useState('')
    return (
        <View style={{backgroundColor:color_scheme(colorMode,'white'),flex:1,height:'100%'}}>
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
                    color:color_scheme(colorMode,'#333')
                }}
                >
                    Organizations
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('CreateOrgs')}>
                <ElementPlus
                variant="Bulk"
                size={30}
                color="#aaa"
                />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical:10,paddingHorizontal:10}}>
            <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search My Organizations"
                    
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    />
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