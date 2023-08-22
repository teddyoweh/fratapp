import React,{useContext, useEffect, useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Dimensions} from "react-native";
import { homestyles,profilestyles,discoverstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion,SearchNormal} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';
import { frats,sors } from "../../../greekdata/greeks";
import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import { AppContext } from "../../../context/appContext";
import { wrapUIMG } from "../../../utils/utils";
import { color_scheme } from "../../../config/color_scheme";
const DiscoverFeedStack = createStackNavigator()
function DiscoverFeedScreens(){
 
        return (
            <DiscoverFeedStack.Navigator
            screenOptions={
                {
                    headerShown:false,
                }
            }
            >
        
        
              <DiscoverFeedStack.Screen name="DiscoverS" component={DiscoverScreen} />
         
            </DiscoverFeedStack.Navigator>
         
         
          );
        }
 function DiscoverPeople({navigation,people}){

    const {colorMode} = useContext(AppContext)
    return (
<View style={[discoverstyles.results,{backgroundColor:color_scheme(colorMode,'white')}]}>
                 
                 <ScrollView style={{}}  >
             
                     { 
                     
                     people?
                     
                    people.length>0?
                     people.map(
                         (person,index)=>{
                            
                  
                             return(
                                 <TouchableOpacity style={[discoverstyles.result,{borderColor:color_scheme(colorMode,'#ddd')}]} key={index} onPress={()=>    navigation.navigate('ProfilesScreen',{userdetails:person})}>
                                 <Image source={{uri:wrapUIMG(person.uimg)}} style={{
                                    width:40,
                                    height:40,
                                    borderRadius:100
                                 }}/>
                                 <View style={discoverstyles.resultinfo}>
                                     {/* <Text style={discoverstyles.resultname}>{greek.name} ({greek.letters})</Text>
                                     <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text> */}
                                     <Text style={[discoverstyles.resultname,{color:color_scheme(colorMode,"black")}]}>{person.firstname+' '+person.lastname}</Text>
                                    <Text style={[discoverstyles.resultaddress,{color:color_scheme(colorMode,"#c3c3c3")}]}> @{person.username}</Text>
                                 </View> 
                             </TouchableOpacity>
                             )
                             }
                     ):
                     <View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >No Results Found
                        </Text>
                     </View>
                     :<View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >
                            Search People
                        </Text>
                     </View>
                    }
                                   </ScrollView>
          
                    
                 </View>
   
    )
 }
 function DiscoverOrgs({navigation,people}){
console.log(people)
    const {colorMode} = useContext(AppContext)
    return (
<View style={[discoverstyles.results,{backgroundColor:color_scheme(colorMode,'white')}]}>
                 
                 <ScrollView style={{}}  >
             
                     { 
                     
                     people?
                     
                    people.length>0?
                     people.map(
                         (person,index)=>{
                            
                  
                             return(
                                 <TouchableOpacity style={[discoverstyles.result,{borderColor:color_scheme(colorMode,'#ddd')}]} key={index} onPress={()=>    navigation.navigate('OrgProfilesScreen',{userdetails:person})}>
                                 <Image source={{uri:wrapUIMG(person.org_logo)}} style={{
                                    width:40,
                                    height:40,
                                    borderRadius:10
                                 }}/>
                                 <View style={discoverstyles.resultinfo}>
                                     {/* <Text style={discoverstyles.resultname}>{greek.name} ({greek.letters})</Text>
                                     <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text> */}
                                     <Text style={[discoverstyles.resultname,{color:color_scheme(colorMode,"black")}]}>{person.org_name}</Text>
                                    {/* <Text style={[discoverstyles.resultaddress,{color:color_scheme(colorMode,"#c3c3c3")}]}> @{person.username}</Text> */}
                                 </View> 
                             </TouchableOpacity>
                             )
                             }
                     ):
                     <View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >No Results Found
                        </Text>
                     </View>
                     :
                     <View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >
                            Search Orgs
                        </Text>
                     </View>
                    }
                                   </ScrollView>
          
                    
                 </View>
   
    )
 }

 function DiscoverAll({navigation,results}){

    const {colorMode} = useContext(AppContext)
    return (
<View style={[discoverstyles.results,{backgroundColor:color_scheme(colorMode,'white')}]}>
                 
                 <ScrollView style={{}}  >
             
                     { 
                     
                     results?
                     
                    results.length>0?
                     results.map(
                         (result,index)=>{
                            
                  
                             return(
                                 <TouchableOpacity style={[discoverstyles.result,{borderColor:color_scheme(colorMode,'#ddd')}]} key={index} onPress={()=>    navigation.navigate('ProfilesScreen',{userdetails:result})}>
                                 <Image source={{uri:wrapUIMG(result.uimg)}} style={{
                                    width:40,
                                    height:40,
                                    borderRadius:100
                                 }}/>
                                 <View style={discoverstyles.resultinfo}>
                                     {/* <Text style={discoverstyles.resultname}>{greek.name} ({greek.letters})</Text>
                                     <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text> */}
                                     {/* <Text style={[discoverstyles.resultname,{color:color_scheme(colorMode,"black")}]}>{person.firstname+' '+person.lastname}</Text>
                                    <Text style={[discoverstyles.resultaddress,{color:color_scheme(colorMode,"#c3c3c3")}]}> @{person.username}</Text> */}
                                 </View> 
                             </TouchableOpacity>
                             )
                             }
                     ):
                     <View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >No Results Found
                        </Text>
                     </View>
                     :<View
                     style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:"center",
                        alignItems:'center',
                        height:Dimensions.get('window').height/2
                     }}
                     >
                        
                        <Text
                            style={{
                                color:'#aaa',
                                fontSize:18,
                                fontWeight:'700'

                            }}
                    
                        >
                            Search Herds
                        </Text>
                     </View>
                    }
                                   </ScrollView>
          
                    
                 </View>
   
    )
 }

export default function DiscoverScreen({navigation}){
    const greeks = [...frats,...sors]
    const [filters,setFilters]=useState(['Organizations','People'])//'Fraternities','Sororities','Universities'
    const [activeFilter,setActiveFilter]=useState(filters[0])
    const [people,setPeople] = useState(null)
    const [search,setSearch]= useState('')
    const [orgs,setOrgs] = useState(null)
    const [results,setResults] = useState(null) 
    const {user} = useContext(AppContext)
    async function SearchPeople(){
        await axios.post(endpoints['discoverpeople'],{search:search,userid:user.userid}).then(res=>{
            setPeople(res.data)
        })
    }
    async function SearchOrgs(){
        await axios.post(endpoints['discoverorgs'],{
            search:search,userid:user.userid
        }).then(res=>{
            setOrgs(res.data)
        })
    }
    async function SearchAll(){
        await axios.post(endpoints['discoverall'],{
            search:search,userid:user.userid
        })
    }
    function performSearch(t){
        
        setSearch(t)
        // SearchPeople()
        if(
            activeFilter=='People'
        ){
            SearchPeople()
        }
        else if(
            activeFilter=='Organizations'
        ){
            SearchOrgs()    
        }
   
    }
    async function fetchOrgs(){
        await axios.post(endpoints['fetchorgs']).then(res=>{
            setOrgs(res.data)
        })
    }
    useEffect(()=>{
fetchOrgs()
    },[])
    const {colorMode} = useContext(AppContext)

    return (
        <View style={[discoverstyles.container,{backgroundColor:color_scheme(colorMode,'white')}]}>
           <View style={[discoverstyles.top]}>
                <Text style={[discoverstyles.title,{color:color_scheme(colorMode,'black')}]}>Discover</Text>
                <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search People, Universitys Organizations, Fratenities, Sororities"
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View>
           </View>
           <View style={[profilestyles.postfilters,{marginTop:4, marginBottom:0,  borderColor:color_scheme(colorMode,'#ddd'),}]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>


                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity style={activeFilter==filter?[profilestyles.postfiltera,{borderColor:color_scheme(colorMode,'black')}]:[profilestyles.postfilter]} onPress={()=>setActiveFilter(filter)} key={index}>
                                <Text style={activeFilter==filter?[profilestyles.postfiltertxta,{color:color_scheme(colorMode,'black')}]:[profilestyles.postfiltertxt,{color:color_scheme(colorMode,'grayy')}]}>
                                   {filter}</Text>
                               </TouchableOpacity>
                            )
                        })
                    }
                  
                  </ScrollView>
                </View>
           <View style={discoverstyles.content}>
            {/* <Text style={discoverstyles.contentheader}>
                Nearby
            </Text> */}
              {
                activeFilter=='All' && <DiscoverAll navigation={navigation} results={results}/> 
              }
                {
                activeFilter=='People' && <DiscoverPeople navigation={navigation} people={people}/>
                }

{
                activeFilter=='Organizations' && <DiscoverOrgs navigation={navigation} people={orgs}/>
                }
           </View>
        </View>
    )
}