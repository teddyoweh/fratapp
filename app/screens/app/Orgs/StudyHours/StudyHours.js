import { View,Text, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, UserAdd, CalendarAdd, ArchiveBook, InfoCircle, More2, NoteAdd} from 'iconsax-react-native';
import { FontAwesome5,Feather, Ionicons,AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import { useContext, useEffect,useRef, useState,useCallback, useLayoutEffect } from "react";
import { AppContext } from "../../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import Spinner from '../../../../components/Spinner'
import { makeeventstyles } from "../../Calendar/MakeEvent";
import { wrapUIMG } from "../../../../utils/utils";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { getTimeDifference } from "../../../../utils/utils";
import { color_scheme } from "../../../../config/color_scheme";
import CircleProgress from "../../../../components/CIrcleProgress";
import * as Haptics from 'expo-haptics';

function RenderPeople(){
    const {colorMode,user} = useContext(AppContext)
    const timestat_colorhashmap = colorMode=='darkD'?{
        'Completed': '#33FF99',         
        'Checked In': '#FFCC66',        
        'Not Checked In': '#FF6666',    
      }
      :
      {
        'Completed': '#00CC66',         
        'Checked In': '#FF9900',       
        'Not Checked In': '#FF3333', 
      }
    return (
        <TouchableOpacity
        style={{
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:8,
            paddingVertical:10,
            borderColor:color_scheme(colorMode,'#ccc'),
            borderBottomWidth:0.3,
            borderStyle:'solid',
            justifyContent:'space-between'
        }}
        >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >
            <Image source={{uri:wrapUIMG(user.uimg)}} style={{
                width:50,
                height:50,
                borderRadius:100
            }}/>
            <Text
            style={{
                color:color_scheme(colorMode,'black'),
                fontSize:19,
                fontWeight:'500',
                marginLeft:10
            }}
            >
                Teddy Oweh
            </Text>
            </View>
            <View
            style={{
                backgroundColor:timestat_colorhashmap['Checked In'],
                paddingHorizontal:8,
                paddingVertical:6,
                borderRadius:10
            }}
            >
                <Text
                style={{
                    color:color_scheme(colorMode,'black'),
                    fontSize:11
                }}
                >
                    Checked In
                </Text>
            </View>

        </TouchableOpacity>
    )
}
export default function StudyHours({route,navigation}){
    const {colorMode,user} = useContext(AppContext)
    const {orgid,orgdt,orgdata} = route.params
    const filters = ['7th May - 21st May ','1st June - 14th June','14th June - 21st June']
    const peoplefilters = ['All','Completed','Checked In', 'Not Checked in']
    const [activeFilter,setActiveFilter]=useState(filters[0])
    const [activePeopleFilter,setActivePeopleFilter]=useState(peoplefilters[0])
    const [search,setSearch] = useState('')
    
      
      

    function swapFeed(item) {
        Haptics.impactAsync('medium')
        setActiveFilter(item);
 
      }
      function swapPeopleFilter(item) {
        Haptics.impactAsync('medium')
        setActivePeopleFilter(item);
 
      }

     function performSearch(text){

     } 
    return (
        <View
        style={{
            backgroundColor:    color_scheme(colorMode,'white'),
            flex:1
        }}
        
        >
           

            
            <View
            style={{
                paddingHorizontal:10,
                paddingVertical:6
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >

       
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
                </TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                alignItems:"center",
                paddingHorizontal:10
            }}
            >
                <Image
                source={{uri:wrapUIMG(orgdt.uimg)}}
                style={{
                height:40,
                width:40,
                borderRadius:100,
                marginRight:5
                }}
                />
                <Text
                style={{
                    color:color_scheme(colorMode,'black'),
                    fontSize:18,
                    fontWeight:'600'
                }}
                >
                    {orgdt.name}
                </Text>
            </View>
                </View>
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingHorizontal:14
,            }}
            >
            <Text
            style={{
                color:color_scheme(colorMode,'black'),
      
                fontSize:20,
                fontWeight:'600',
                paddingTop:18
            }}
            >
                Study Hours
            </Text>
            <TouchableOpacity>
            <NoteAdd size="30" variant="Bulk" color={color_scheme(colorMode,'gray')}/>
            </TouchableOpacity>
            </View>
            <View style={homestyles.filters}>
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        filters.map((filter,i)=>{
                            return(
                                <TouchableOpacity key={i} style={activeFilter==filter?[homestyles.filtera,{backgroundColor:color_scheme(colorMode,'black')}]:[homestyles.filter,{borderColor:color_scheme(colorMode,"#ccc"),backgroundColor:color_scheme(colorMode,'#eee')}]} onPress={()=>swapFeed(filter)}>
                                    <Text style={activeFilter==filter?[homestyles.filtertexta,{color:color_scheme(colorMode,'white')}]:homestyles.filtertext}>{filter}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }


                </ScrollView>
                
            </View>
            <View
            style={{
                marginHorizontal:10,
                flexDirection:'row',
                alignItems:"center",
                justifyContent:'space-between'
            }}
            >
            <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee'),width:'90%'}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search People"
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
            </View>
            <TouchableOpacity>
                <More size="32" variant="Broken" color={color_scheme(colorMode,'#aaa')}/>
            </TouchableOpacity>
            </View>
            <View style={homestyles.filters}>
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        peoplefilters.map((filter,i)=>{
                            return(
                                <TouchableOpacity key={i} style={activePeopleFilter==filter?[homestyles.filtera,{backgroundColor:color_scheme(colorMode,'black')}]:[homestyles.filter,{borderColor:color_scheme(colorMode,"#ccc"),backgroundColor:color_scheme(colorMode,'#eee')}]} onPress={()=>swapPeopleFilter(filter)}>
                                    <Text style={activePeopleFilter==filter?[homestyles.filtertexta,{color:color_scheme(colorMode,'white')}]:homestyles.filtertext}>{filter}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }


                </ScrollView>
                
            </View>
            <ScrollView>
                {[...Array(3)].map((peo,index)=>{
                    return (
                        <RenderPeople key={index}/>
                    )
                })}
            </ScrollView>
           
          
       
 
        </View>
    )
}