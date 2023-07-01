import React,{useContext, useState}from "react";
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

  
    return (
<View style={discoverstyles.results}>
                 
                 <ScrollView style={{}}  >
             
                     { 
                     
                     people?
                     
           
                     people.map(
                         (person,index)=>{
                            
                  
                             return(
                                 <TouchableOpacity style={discoverstyles.result} key={index} onPress={()=>    navigation.navigate('ProfilesScreen',{userdetails:person})}>
                                 <Image source={{uri:wrapUIMG(person.uimg)}} style={{
                                    width:40,
                                    height:40,
                                    borderRadius:100
                                 }}/>
                                 <View style={discoverstyles.resultinfo}>
                                     {/* <Text style={discoverstyles.resultname}>{greek.name} ({greek.letters})</Text>
                                     <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text> */}
                                     <Text style={discoverstyles.resultname}>{person.firstname+' '+person.lastname}</Text>
                                    <Text style={discoverstyles.resultaddress}> @{person.username}</Text>
                                 </View> 
                             </TouchableOpacity>
                             )
                             }
                     )
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

export default function DiscoverScreen({navigation}){
    const greeks = [...frats,...sors]
    const [filters,setFilters]=useState(['TSU','People','Organizations','Fraternities','Sororities','Universities'])
    const [activeFilter,setActiveFilter]=useState('TSU')
    const [people,setPeople] = useState(null)
    const [search,setSearch]= useState('')
    const {user} = useContext(AppContext)
    async function SearchPeople(){
        await axios.post(endpoints['discoverpeople'],{search:search,userid:user.userid}).then(res=>{
            setPeople(res.data)
        })
    }
    function performSearch(t){
        
        setSearch(t)
        SearchPeople()
    }
    return (
        <View style={discoverstyles.container}>
           <View style={discoverstyles.top}>
                <Text style={discoverstyles.title}>Discover</Text>
                <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search People, Universitys Organizations, Fratenities, Sororities"
                    value={search}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View>
           </View>
           <View style={[profilestyles.postfilters,{marginTop:4, marginBottom:0}]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>


                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity style={activeFilter==filter?profilestyles.postfiltera:profilestyles.postfilter} onPress={()=>setActiveFilter(filter)} key={index}>
                                <Text style={activeFilter==filter?profilestyles.postfiltertxta:profilestyles.postfiltertxt}>
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
              
                <DiscoverPeople navigation={navigation} people={people}/>

           </View>
        </View>
    )
}