import { View,Text,Animated, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, AddSquare, UserAdd, Profile, ProfileAdd} from 'iconsax-react-native';
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
import AddUserAccessSheet from "./AddMemberSheet";
import { BlurView } from "expo-blur";

export default function MembersPage({navigation,route}){
    const {orgid,orgdt,orgdata} = route.params
    const {user,colorMode}   = useContext(AppContext)
    const [search,setSearch] = useState('')
    console.log(    orgdt.members)
    function opeAddMemberSheet(){
        AddUserAccessSheetref.current.show()
    }
    const AddUserAccessSheetref = useRef()
    return (
        <View
        style={{
            backgroundColor:    color_scheme(colorMode,'white'),
            flex:1
        }}
        
        >
           

           <BlurView
            intensity={0}
        
            tint="dark"
            
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
                paddingHorizontal:10,
                paddingVertical:19
            }}
            >
            <Text
            style={{
                paddingTop:4,
                paddingBottom:10,
                paddingHorizontal:10,
                color:color_scheme(colorMode,'#333'),
                fontSize:16
            }}
            >
                Members ({orgdt.members.length})
            </Text>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}
            >

      
            <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee'),width:'89%'}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search Members"
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View>
                <TouchableOpacity
                onPress={()=>opeAddMemberSheet()}
                >
                    <ProfileAdd
                    size={40}
                    color={color_scheme(colorMode,'#aaa')}
                    variant="Broken"
                    />
                </TouchableOpacity>
                </View>
                </View>   
                </BlurView>
          
            <ScrollView>
         
          {
                    orgdt.members.map((member,index)=>{
                        return (
                            <View
                            key={index}
                            style={{
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderBottomWidth:0.5,
                                borderStyle:'solid',
                                borderColor:color_scheme(colorMode,'#eee')
                            }}
                            >
                            <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center'
                            }}
                            >
                            <Image
                            source={{uri:wrapUIMG(member.uimg)}}
                            style={{
                                height:50,
                                width:50,
                                borderRadius:100
                            }}
                            />
                            <View
                            style={{
                                paddingHorizontal:10,
                                flexDirection:'column'
                            }}
                            >
                                <Text
                                style={{
                                    paddingHorizontal:5,
                                    color:color_scheme(colorMode,'#333')
                                }}
                                >{member.name}</Text>
                                
                            </View>
                            </View>
                            <View>

                            </View>

                            </View>
                        )
                    })
                }
             
            </ScrollView>
            <AddUserAccessSheet bottomSheet={AddUserAccessSheetref} org={orgdata} />
        </View>
    )

}