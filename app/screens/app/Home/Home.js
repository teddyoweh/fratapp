import React,{useState,useContext,useRef, useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Add, Send2, Messenger, Verify, Notification} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import LikeBtn from "../../../components/LikeBtn";
import PostsList from "../../../components/PostsList";
import MakePost from "./MakePost";
import Feed from "./Feed";
import { wrapUIMG } from "../../../utils/utils";
import Spinner from "../../../components/Spinner";
import { setupNotifications } from "../../../config/setup";
import { color_scheme } from "../../../config/color_scheme";
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics'
import axios from "axios";
import io from 'socket.io-client';
import { endpoints } from "../../../config/endpoints";
import { serverhost } from "../../../config/ip";
function RenderMessageBtn({navigation}){
    const {colorMode,user} = useContext(AppContext)
    const [count,setCount] = useState(null)
    function fetchSocket(){

        const socket = io(`http://${serverhost}:8080`);
    
        socket.on('connect', () => {
          const userId = user.userid
          socket.emit('unreadcount', userId);
        });
    
        socket.on('unreadcount', (message) => {
            
            if(message){
 
                try{
                    setCount(message)
                }
                catch{
                    console.log('lol something happened')
                }
                
            }
        
         
        });
    
        socket.on('disconnect', () => {
          console.log('Connection closed');
        });
        return () => {
          socket.close();
        };
    }

    async function fetchCount(){
        await axios.post(endpoints['getunreadcount'],{userId:user.userid})
        .then(res=>{
        setCount(res.data)
            }
        )
    }
    useEffect(
        ()=>{
            fetchCount()
            fetchSocket()
        },[]
    )
    return (
        <TouchableOpacity style={homestyles.msgicon} onPress={()=>navigation.navigate('MessagesScreen')}>
                       
                            <Messenger color={color_scheme(colorMode,'#333')} variant="Outline" size={30} />
                            {
                                count!=null && count >0  &&
                          
                            <View style={homestyles.msgiconnumb}>
                                <Text style={homestyles.msgiconnum}>{count}</Text>
                            </View>
                                   }
                        </TouchableOpacity>
    )
}
export default function HomeScreen({navigation}){
    const filters = ['For You','Announments','Events','Polls']//'Posts','Polls','Opportunities'
    const [activeFilter,setActiveFilter]=useState('For You')
    const {user} = useContext(AppContext)
    const postBottomSheet = useRef()
    function swapFeed(item) {
        setActiveFilter(item);
        //navigateToFeed(item);
      }
      
      function navigateToFeed(filter) {
        switch (filter) {
          case 'All':
            navigation.navigate('AllFeed');
            break;
          case 'Announments':
            navigation.navigate('AnnouncementFeed');
            break;
          case 'Events':
            navigation.navigate('EventFeed');
            break;
          case 'Posts':
            navigation.navigate('PostFeed');
            break;
          case 'Polls':
            navigation.navigate('PollsFeed');
            break;
          case 'Opportunities':
            navigation.navigate('OpportunitiesFeed');
            break;
          default:
            navigation.navigate('AllFeed');
            break;
        }
      }
 
      
     
    
 const {colorMode} = useContext(AppContext)
 
    return (
        <>
       {

        user==null ?<View style={{flex:1}}>
            <Spinner/>

        </View>:
    
        <View style={[homestyles.container,{backgroundColor:color_scheme(colorMode,'white')}]}>
           
      

 

 
      
            <View style={homestyles.top}>
                <View style={homestyles.toptop}>
                   <View style={homestyles.topleft}>
                    <Image source={require('../../../assets/HERDS-Landing.png')} style={{
                    height:50,
                    width:150,resizeMode:'contain'
                    
                    }}/>
                        {/* <Image source={{uri:wrapUIMG(user.uimg)}} style={homestyles.topuserimg}/>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <Text style={[homestyles.topusername,{color:color_scheme(colorMode,'#333'),marginRight:5}]}>{`${user.firstname} ${user.lastname}`}</Text>
                            {
                                user.isofficial &&
                           
                            <Verify size="18" color="#1d9bf0" variant="Bold"/>
                        }
                        </View> */}

                   
                    </View>
                    <View style={homestyles.topright}>
                    <TouchableOpacity style={homestyles.msgicon} onPress={()=>navigation.navigate('NotificationStacks')}>
                       
                       <Notification color={color_scheme(colorMode,'#333')} variant="Bold" size={30} />
                       {/* <View style={homestyles.msgiconnumb}>
                           <Text style={homestyles.msgiconnum}>
                               9+
                           </Text>
                       </View> */}
                   </TouchableOpacity>
                        <RenderMessageBtn navigation={navigation}/>
                    </View>
                </View>
                <View style={homestyles.topContent}>

                </View>
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
                      <TouchableOpacity style={[homestyles.filtera,{backgroundColor:color_scheme(colorMode,'#eee'),borderStyle:'dashed',borderColor:'#666',borderWidth:1}]} onPress={()=>swapFeed('s')}>
                                    <Text style={[homestyles.filtertext,{color:"#666"}]}>New Feed </Text>
                                </TouchableOpacity>



                </ScrollView>
                
            </View>
            
 
        
      

  
        <Feed  navigation={navigation} postBottomSheet={postBottomSheet} />
       

          
        </View>
        
            }
            
        </>
    )
}