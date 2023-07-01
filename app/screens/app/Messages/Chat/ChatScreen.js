import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Animated,    RefreshControl, Pressable, KeyboardAvoidingView, Dimensions} from "react-native";
import React,{ useState,useEffect,useLayoutEffect,useRef,  useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../../styles/messagestyles';
import { discoverstyles } from "../../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { Add, ArrowUp, Call, ChartCircle, MessageAdd, MessageAdd1, Microphone2, PenAdd,SearchNormal, Video } from "iconsax-react-native";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import { AppContext } from "../../../../context/appContext";
import Spinner from "../../../../components/Spinner";
import { formatTime, removeExcessWhitespace, wrapUIMG } from "../../../../utils/utils";
import { BlurView } from "expo-blur";

import io from 'socket.io-client';
import { serverhost, serverip } from "../../../../config/ip";
import { schedulePushNotification } from "../../../../config/setup";

 
 
function RenderMsg({msg,msg2}){
    const {user} =useContext(AppContext)
    const rad = msg.sender_id==user.userid? {borderBottomRightRadius:0}:{borderBottomLeftRadius:1}
 
    
    return (
        <View
        style={{
            flexDirection:'row',
            paddingHorizontal:20,
            marginBottom:msg2? msg2.sender_id!=msg.sender_id ?15:2:0,
            justifyContent:msg.sender_id==user.userid? 'flex-end':'flex-start'
        }}
        >
            <View
            style={[{
                backgroundColor:msg.sender_id==user.userid?"#333":'#eee',
                paddingHorizontal:20,
                paddingVertical:10,
                borderRadius:15,
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'flex-end',
                maxWidth:'90%',
                //maxWidth:Dimensions.get('window').width-10,
                alignItems:'flex-end',
            }]
                
                
            }
            >
                <Text
                style={{
                    color:msg.sender_id==user.userid?"white":'#333',
                    fontSize:18,
                    fontWeight:300,
                    flexDirection:'row',
                 
              
                }}
                >
                   {removeExcessWhitespace(msg.content)}
                </Text>
                <Text
                style={{
                   color:msg.sender_id==user.userid?"#888":'#aaa',
                   marginLeft:10,
                   fontSize:11,
                 
                }}
                >
                    {formatTime(msg.date)}
                </Text>
            </View>

        </View>
    )
}
 

export default function ChatScreen({navigation,route}){
    
    const {user} =useContext(AppContext)
    const {party_data} = route.params
    const [data,setData] = useState(null)
    const [text,setText] = useState('')
    const [msgtype,setMsgType]  = useState('text')
    const scrollViewRef = useRef(null);

 
    const scrollToBottom = () => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    };
 
  
  
    async function SendMessage(){
        await axios.post(endpoints['sendmsg'],{
            user_id:user.userid,
            receiver_id:party_data._id,
            text: removeExcessWhitespace(text),
            msg_type:msgtype,
            receiver_type:'user'
        }).then(res=>{
         
            setText('')
            //oya nasetData([...data,res.data])
        })
    }
    async function FetchMessages(){
        await axios.post(endpoints['fetchmsgs'],{receiver_id:user.userid}).then(res=>{
            setData(res.data)
        })
    }
    function fetchSocket(){

        const socket = io(`http://${serverhost}:8080`);
    
        socket.on('connect', () => {
          const userId = user.userid
          socket.emit('userId', userId);
        });
    
        socket.on('message', (message) => {
            if(message){
                try{
                    console.log('shit theres a new mesage')
                    console.log('New message:', message);
                    schedulePushNotification(party_data.firstname+' '+party_data.lastname,message.content)
                    setData(oldArray => [...oldArray,message])
                    scrollToBottom();
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
    useEffect(()=>{
       FetchMessages() 
       fetchSocket()
       
    },[])
    // useEffect(() => {
    //     if(data){

        
    //     fetchSocket()
    // }
    //   }, []);
   ;
    return (
     
        <View
        style={{
            flexDirection:'column',
            flex:1,
            backgroundColor:'white'
        }}
        >
   
            <View
             style={{
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-between',
                paddingHorizontal:10,
                paddingVertical:15,
                shadowColor: '#ccc',
                backgroundColor:'transparent',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
                borderBottomWidth:1.5,
                borderColor:'#eee',
                borderStyle:'solid'
                
                
            }}
            >

        
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >


            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <View
            style={{
                backgroundColor:"#333",
                height:22,
                width:22,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:100,
                marginLeft:0
            }}
            >
                <Text
                style={{
                    color:'white',
                    fontSize:12
                }}
                >
                    3
                </Text>
            </View>
            </TouchableOpacity>
            <View
            style={{
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center'
            }}
            ><View
            style={{
                flexDirection:'column',
                alignItems:'flex-end',
            
            }}
            >


        <Image source={{uri:wrapUIMG(party_data.uimg)}} style={{
            borderColor:'#ccc',
            borderWidth:1,
            height:65,
            width:65,
            borderRadius:100
        }}/>
        <View
        style={{
            backgroundColor:'#00FF00',
            height:10,
            width:10,
            position:'relative',
            bottom:10,
            left:-5,
            borderRadius:100
        }}
        >

        </View>
        </View>
        <Text
        style={{
            color:'#333',
            marginTop:3,
            fontSize:16,
            fontWeight:'400'
        }}
        >
            {party_data.firstname+' '+party_data.lastname}
        </Text>

            </View>
         
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >

                <TouchableOpacity
                style={{
                    marginRight:10
                }}
                >
                <Call size="25" color="#333" variant="Bold"/>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    marginRight:10
                }}
                >
                <Video size="25" color="#333" variant="Bold"/>
                </TouchableOpacity>
            </View>
            </View>
        
        <ScrollView
         ref={scrollViewRef}
         onContentSizeChange={scrollToBottom}
        contentContainerStyle={{
        backgroundColor:'transparent',
           
            paddingVertical:30,
        }}
        >
            {
                data==null?<View>
                    <Spinner/>
                </View>:
                data.map((msg,index)=>{
                    let msg2 = null
                    if(data[index+1]){
                        msg2 = data[index+1]
                    }
                    return (
                       <RenderMsg msg={msg} msg2={msg2} key={index}/>
                    )
                })
            }
         
          
            {/* <TypingComponent/> */}

        </ScrollView>


    
        <View
        style={{
            flexDirection:'row',
            paddingVertical:10,
            backgroundColor:'white',
            alignItems:'center'
        }}
        >
                 <Pressable
    


    style={{
        marginHorizontal:5,
        width:35,
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#eee',
        borderWidth:1,
        borderColor:'#ddd'

    }}
    >
        <Add color="#aaa" size={26}/>

        </Pressable>
             <View
        style={{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius:30,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:'#ddd',
            paddingRight:20,
            paddingLeft:13,
            paddingVertical:10,
            width:'78%',
            
          
        }}
        >
          <TextInput
            // onBlur={()=>onKeyboardHide()}
            //  onPressIn={()=>onBoxTap()}
            autoCapitalize={false}
        
            autoCorrect={false}
            autoFocus={true}
             value={text}
             onChangeText={(t)=>setText(t)}
            multiline
            style={{
            
                flexDirection:'column',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                fontWeight:'200',
                fontSize:16,
                width:'90%'
                
                
            }}
            placeholder="Send a message"
          />
          <TouchableOpacity
          style={{
            width:10
          }}
          onMagicTap={()=>alert('shit')}
          >

          
          <Microphone2
          color="#333"
          size={20}
          />
          </TouchableOpacity>
        </View>
        <Pressable
        onPress={()=>{
           SendMessage()
        }}
    


        style={{
            marginLeft:5,
            width:40,
            height:40,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:100,
            backgroundColor:'#333',

        }}
        >
            <ArrowUp color="white" size={23}/>

            </Pressable>

        </View>

        </View>
      
    )
}