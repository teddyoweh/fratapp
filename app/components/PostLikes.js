import React,{useState,useEffect,useContext, useRef}from "react";
import { View,Text,Dimensions, Image,TouchableOpacity, ScrollView, TextInput, Pressable, Share, ActionSheetIOS, KeyboardAvoidingView, InputAccessoryView, Button} from "react-native";
import { discoverstyles, homestyles } from "../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, MessageText, Link2, Link, MessageText1, Send2, ArrowUp, Verify, SearchNormal} from 'iconsax-react-native';
import { FontAwesome5,Entypo,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { captureRef, captureScreen } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import LikeBtn from "./LikeBtn";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { getTimeDifference, wrapPostImg, wrapUIMG } from "../utils/utils";
import { AppContext } from "../context/appContext";
import { color_scheme } from "../config/color_scheme";
import PagerView from 'react-native-pager-view';
import BottomSheet from "react-native-gesture-bottom-sheet";
import Spinner from "./Spinner";
import * as Haptics from 'expo-haptics'

export default function PostLikes({navigation, likeBottomSheet,post}){
    const {user,colorMode} = useContext(AppContext)
    const [search,setSearch]=useState('')

    const [users,setUsers]=useState(null)
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [lusers,setLusers]=useState(users)
    async function getUsers(){
        await axios.post(endpoints['fetchlikeusers'],{postID:post._id})
        .then(res=>{
 
            setUsers(res.data)
        })
    }
    function performSearch(text) {
        Haptics.impactAsync('light');
        setSearch(text);

        if (users && users.length > 0) {
            const filteredResults = users.filter(user =>
                user.firstname.toLowerCase().includes(text.toLowerCase()) ||
                user.lastname.toLowerCase().includes(text.toLowerCase()) ||
                user.username.toLowerCase().includes(text.toLowerCase())
            );

            setFilteredUsers(filteredResults);
        }
    }

    useEffect(()=>{
       getUsers()
    },[])
    function navigateToUser(usx){
        Haptics.impactAsync('medium')
        likeBottomSheet.current.close()
        if(usx._id==user.userid){
    
            navigation.navigate('ProfileStacks')
        }
        else{
    
        
        navigation.navigate('ProfilesScreen',{userdetails:usx})
    }
      }
    //   const usersToDisplay =  search.length > 0 ? filteredUsers : users;
    const usersToDisplay =   users;

    return (
        <BottomSheet   ref={likeBottomSheet} height={Dimensions.get('screen').height-90}
        >
        <View
        style={{
            backgroundColor:color_scheme(color_scheme,'white'),
            flex:1,
            paddingHorizontal:10,
            paddingVertical:20
        }}
        >
              {/* <View style={[discoverstyles.searchbox,{backgroundColor:color_scheme(colorMode,'#eee')}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={[discoverstyles.search,{color:color_scheme(colorMode,'black')}]}placeholder="Search People"
                    placeholderTextColor={color_scheme(colorMode,'gray')}
                    value={search}
                    keyboardAppearance={colorMode}
                    onChangeText={(text)=>performSearch(text)}
                    />
                </View> */}
                <ScrollView
                contentContainerStyle={{
                    paddingVertical:19
                }}
                >
                    {
                        users?
                        usersToDisplay.map((usx,index)=>{
                            return (
                                <TouchableOpacity
                                onPress={()=>navigateToUser(usx)}
                                 key={index}
                                 style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingVertical:10
                                 }}
                                 >
                                <View
                                  style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                 }}
                                >
                                    <Image source={{uri:wrapUIMG(usx.uimg)}} style={{
                                        height:40,width:40,borderRadius:100
                                    }}/>
                                    <View
                                      style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingHorizontal:10
                                     }}
                                    >
                                        <Text style={{
                                            fontSize:16,
                                            color:color_scheme(colorMode,'black'),
                                            fontWeight:'600',
                                            marginRight:4,
                                        }}>{usx.firstname+' '+usx.lastname}</Text>
                                        <Text style={{
                                            fontSize:14,
                                            color:color_scheme(colorMode,'#aaa')
                                        }}>@{usx.username}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            )
                        })
                        :<View style={{
                            flex:1,
                            height:Dimensions.get('screen').height-90,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <Spinner/>
                        </View>
                    }
                </ScrollView>
            
        </View>
        </BottomSheet>

    )
}