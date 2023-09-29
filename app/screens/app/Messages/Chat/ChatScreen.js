import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Animated,    RefreshControl, Pressable, KeyboardAvoidingView, Dimensions, Keyboard, TouchableWithoutFeedback, Alert} from "react-native";
import React,{ useState,useEffect,useLayoutEffect,useRef,  useContext, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../../styles/messagestyles';
import { discoverstyles } from "../../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { Add, ArrowUp, Call, ChartCircle, MessageAdd, MessageAdd1, Microphone2, PenAdd,PictureFrame,SearchNormal, Video } from "iconsax-react-native";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import { AppContext } from "../../../../context/appContext";
import Spinner from "../../../../components/Spinner";
import { formatTime, removeExcessWhitespace, wrapPostImg, wrapUIMG } from "../../../../utils/utils";
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics'
import io from 'socket.io-client';
import { serverhost, serverip } from "../../../../config/ip";
import { schedulePushNotification } from "../../../../config/setup";
import { color_scheme } from "../../../../config/color_scheme";
import * as ImagePicker from 'expo-image-picker';
function scaleImageToFitScreen(imageWidth, imageHeight, screenWidth, screenHeight) {
 
    const imageAspectRatio = imageWidth / imageHeight;
  
 
    const maxImageWidth = screenWidth;
    const maxImageHeight = screenHeight;

    let scaledWidth = maxImageWidth;
    let scaledHeight = scaledWidth / imageAspectRatio;
    if (scaledHeight > maxImageHeight) {
      scaledHeight = maxImageHeight;
      scaledWidth = scaledHeight * imageAspectRatio;
    }

    return { width: scaledWidth, height: scaledHeight };
  }
  function scaleImageToScreen(imageWidth, imageHeight) {

    const maxWidth = Dimensions.get('screen').width  
    const maxHeight =  Dimensions.get('screen').height  

    // Calculate the aspect ratio of the image
    const imageAspectRatio = imageWidth / imageHeight;

    // Calculate the scaled dimensions
    let scaledWidth = maxWidth;
    let scaledHeight = maxWidth / imageAspectRatio;

    // Check if the scaled height exceeds the maximum height
    if (scaledHeight > maxHeight) {
    scaledHeight = maxHeight;
    scaledWidth = maxHeight * imageAspectRatio;
    }

    // Return the scaled dimensions as an object
    return { width: scaledWidth, height: scaledHeight };
    }
function RenderSendImages({setImages, images}){
    console.log(images,'oh shit')
    const removeItemByIndex = (indexToRemove) =>{
        Haptics.impactAsync('medium');
        setImages(images.filter((_, index) => index !== indexToRemove));}

    return (
        <View
        style={{
          
            paddingHorizontal:20,
            paddingVertical:10,
            backgroundColor:'transparent'
        }}
        >
            <ScrollView
            contentContainerStyle={{
                backgroundColor:'transparent'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            >
                {
                    images.map((img,index)=>{
                        const {width,height} = scaleImageToFitScreen(img.width,img.height,Dimensions.get('screen').width,Dimensions.get('screen').height)
                        return (
                            <View
                            key={index}
                            >
                                <Image
                                source={{uri:img.uri}}
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:10,
                                    marginRight:9
                                }}
                                />
                                 <TouchableOpacity onPress={()=>removeItemByIndex(index)}
                                style={{
                                    position:'absolute',
                                    top:5,
                                    right:15
                                }}
                                >
                                    <MaterialIcons name="cancel" size={15} color="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
function RenderMsg({navigation, msg,msg2,usershashmap,receiver_type}){
    const {user} =useContext(AppContext)
    const rad = msg.sender_id==user.userid? {borderBottomRightRadius:0}:{borderBottomLeftRadius:1}
 
 
    return (
    
       <>
       {
                msg.msg_type=='action'&&
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingBottom:10,
                }}
                >
                    <Text
                    style={{
                        color:"#444",
                    }}
                    >
                        {msg.content}
                    </Text>
                </View>
       }
   {
                msg.msg_type=='text'&&
        <View
        style={{
            flexDirection:'row',
            paddingHorizontal:20,
            marginBottom:msg2? msg2.sender_id!=msg.sender_id ?15:1:10,
            justifyContent:msg.sender_id==user.userid? 'flex-end':'flex-start'
        }}
        >  
        <View
        style={{
            flexDirection:'row',
            alignItems:msg.msg_images.length>0?'flex-start':'center',
            
        }}
        >
            {
                msg.sender_id!=user.userid&&msg.receiver_type!='user'&&
        
            <View>
            <Image
            source={{uri:wrapUIMG(usershashmap[msg.sender_id].uimg)}}
            style={{
                height:30,
                width:30,
                borderRadius:100,
                marginRight:5,
                //marginTop:msg2? msg2.sender_id!=msg.sender_id ?15:2:0,
            }}
            />
            </View>
                }
           
         <View
        style={{flexDirection:'column',
        alignItems: msg.sender_id==user.userid? 'flex-end':'flex-start',
      
    }}
        >

            {
                receiver_type!='user'&&msg.sender_id!=user.userid&&
         
            <View
            style={{
                paddingVertical:5,
                paddingHorizontal:8
            }}
            >
                <Text
                style={{
                    color:'#aaa',
                }}
                >
                    {usershashmap[msg.sender_id].firstname+' '+usershashmap[msg.sender_id].lastname}
                </Text>
            </View>
               }
             { msg.msg_images.map((img)=>{
                const {width,height} = scaleImageToScreen(img.width,img.height)
                return (
                    <TouchableOpacity
                    onPress={()=>{
                        Haptics.impactAsync('medium')
                        navigation.navigate("DMMessageViewer",{
                            img:img
                        })
                    }}
                    >

    
<Image
                style={{
                    height:height/2,
                    width:width/2,
                    marginVertical:10,
                    borderRadius:20
                    
                }}
                source={{uri:wrapPostImg(img.uri)}}
                />
                                </TouchableOpacity>
                )
            })
                
                
            }
      
            {
                msg.content.length>0 &&
             
            <View
            style={[{
                backgroundColor:msg.sender_id==user.userid?'#b347fd':"#333",
                paddingHorizontal:20,
                paddingVertical:10,
                borderRadius:18,
                // borderBottomEndRadius:msg.sender_id==user.userid?5:23,
                // borderBottomStartRadius:msg.sender_id==user.userid?23:5,

                flexDirection:'row',
          
                justifyContent:'flex-end',
                maxWidth:'100%',
                
                //maxWidth:Dimensions.get('window').width-10,
                alignItems:'flex-end',
            }]
                
                
            }
            >
                <Text
                style={{
                    color:msg.sender_id==user.userid?"white":'#fff',
                    fontSize:18,
                    fontWeight:300,
                    flexDirection:'row',
                    maxWidth:'87%'
                 
              
                }}
                >
                   {removeExcessWhitespace(msg.content)}
                </Text>
                <Text
                style={{
                   color:msg.sender_id==user.userid?"#ddd":'#aaa',
                   marginLeft:10,
                   fontSize:11,
                 
                }}
                >
                    {formatTime(msg.date)}
                </Text>
            </View>
                            }
            </View>
            </View> 
            </View>}
            </>
   
    )
}
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> {children}
    </TouchableWithoutFeedback>
    );

export default function ChatScreen({navigation,route}){
    
    const {user,colorMode} =useContext(AppContext)
    
    const {party_data} = route.params
 
    const { receiver_type, channel_id, org_id } = Object.keys(party_data).includes('receiver_type')
    ? party_data
    : route.params;
    
 
  
    const [data,setData] = useState(null)
    const [text,setText] = useState('')
    const [msgtype,setMsgType]  = useState('text')
    const scrollViewRef = useRef(null);
 
    const partyid = party_data._id?party_data._id:party_data.userid
    const scrollToBottom = () => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    };
    
 
  
    async function SendMessage(){
        const random = randomNumberString()
        Haptics.impactAsync('medium')
        const body = {
            user_id:user.userid,
            receiver_id:partyid,
            text: removeExcessWhitespace(text),
            msg_type:msgtype,
            receiver_type:receiver_type,
            random:random,
            email:user.email,
            images:images,
            channel_id,
            org_id
    
        }
        console.log(body)
        await axios.post(endpoints['sendmsg'],body).then(async res=>{
         
            setText('')
            if(images.length>0){

            
            await uploadImages(random).then(res=>{
            })
        }
            //oya nasetData([...data,res.data])
        })
    }
    const [usersHashMap,setUsersHashMap] = useState(null)
    async function FetchMessages(){
        await axios.post(endpoints['fetchmsgs'],{receiver_id:partyid,user_id:user.userid,org_id,channel_id,receiver_type}).then(res=>{
            setData(res.data.messages)
            setUsersHashMap(res.data.usersHashMap) 


 
            console.log(res.data, 'this is the orginal data')

        })
    }
    const receivedMessages = useMemo(() => new Set(), []); 
    function fetchSocket(){

        const socket = io(`http://${serverhost}:8080`);
    
        socket.on('connect', () => {
          const userId = user.userid
          socket.emit('userId', userId);
        });
    
        socket.on('message', async (message) => {
            if(message){
                try{
                    receivedMessages.add(message.id);
              
              
             setData((prevData) => [...prevData, message]);
                    //ahaschedulePushNotification(party_data.firstname+' '+party_data.lastname,message.content)
       
                    // setData([...data,newMessages])
          
                    // console.log({...data,messages:newMessages},'this is the new data')
                
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
 
        fetchSocket()
        
     },[receivedMessages])
    useEffect(()=>{
       FetchMessages() 
 
       
    },[])
   
  
   const [keyboardStatus, setKeyboardStatus] = useState(Keyboard.isVisible());

   useEffect(() => {
    // const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    //   setKeyboardStatus(true);
    // });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(null);
    });

    // return () => {
    //   showSubscription.remove();
    //   hideSubscription.remove();
    // };
  }, []);
  const [images,setImages] = useState([])
  function randomNumberString() {
    var min = 10000;  
    var max = 99999;  
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
      aspect: [1,1],
      selectionLimit:10,
    
    //   quality: 1,
      allowsMultipleSelection:true
    });
 
    _image.assets.map((img,index)=>{
        if (!_image.canceled) {
            
            setImages((prevImages) => [...prevImages, img]);
        }
    })
  
  };
const uploadImages = async (random) =>{

   images.map(async (image,index)=>{
    const data = new FormData();
    data.append('name', 'avatar');
    data.append('email',user.email)
    data.append('random',`${random}`)
    data.append('uri', image.uri)
    
    data.append('fileData', {
     uri : image.uri,
     type: image.type,
        name: 'jacked',
        
  

    });
  


 
    const config = {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
     },
    
    };
   
   await axios.post(endpoints['uploadpost'],data).then(res=>{
    setImages([])
   })
   })
  
}

function UpdateMessageViewed() {
    const lastMessage = data[data.length - 1];
    
    if (!lastMessage.viewedby.includes(user.userid)) {
      axios
        .post(endpoints['updateviewed'], { messageId: lastMessage._id,viewerId:user.userid })
        .then(response => console.log('Message viewed status updated:', response.data.message))
        .catch(error => console.error('Error updating message viewed status:', error));
    } else {
      console.log('User has already viewed the message.');
    }
  }

  useEffect(() => {
    if (data){

        
    if(data.length > 0) {
        UpdateMessageViewed();
    }}
    }, [data]);
    return (
     
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{
            flexDirection:'column',
            flex:1,
            backgroundColor:color_scheme(colorMode,'white'),
 
        }}
        >
   
            <View
             style={{
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-between',
                paddingHorizontal:10,
                paddingVertical:10,
                shadowColor: color_scheme(colorMode,'#ccc'),
                backgroundColor:'transparent',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
                borderBottomWidth:0.5,
                borderColor: color_scheme(colorMode,'#eee'),
                borderStyle:'solid'
                
                
            }}
            >
<View
style={{
    flexDirection:'row',
    alignItems:'center'
}}
>


        
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >

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
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
        
            </TouchableOpacity>
            {
                receiver_type=='user'?
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center'
                }}
                ><View
                style={{
                    flexDirection:'column',
                    alignItems:'flex-end',
                    marginRight:10
                
                }}
                >
    
    
            <Image source={{uri:wrapUIMG(party_data.uimg)}} style={{
        
            
                height:45,
                width:45,
                borderRadius:100
            }}/>
            
            </View>
            <View
            style={{
                flexDirection:'column'
            }}
            >
            <Text
            style={{
                color:color_scheme(colorMode,'#333'),
                 
                fontSize:19,
                fontWeight:'500'
            }}
            >
                {party_data.firstname +' '+ party_data.lastname}
            </Text>
            {/* <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >
            <View
            style={{
                backgroundColor:'#00FF00',
                height:8,
                width:8,
                position:'relative',
                marginRight:5,
            
             
                borderRadius:100
            }}
            />
     <Text
            style={{
                color:color_scheme(colorMode,'#333'),
                 
                fontSize:14,
                fontWeight:'300'
            }}
            >
                Active
            </Text>
           
            </View> */}
           
    
    
    </View>
    
                </View>:
        
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}
            ><View
            style={{
                flexDirection:'column',
                alignItems:'flex-end',
                marginRight:10
            
            }}
            >


        <Image source={{uri:wrapUIMG(party_data.uimg_)}} style={{
    
        
            height:45,
            width:45,
            borderRadius:100
        }}/>
        
        </View>
        <View
        style={{
            flexDirection:'column'
        }}
        >
        <Text
        style={{
            color:color_scheme(colorMode,'#333'),
             
            fontSize:17,
            fontWeight:'500'
        }}
        >
            {party_data.name_}
        </Text>
        <View
        style={{
            flexDirection:'row',
            alignItems:'center'
        }}
        >
        <View
        style={{
            backgroundColor:'#00FF00',
            height:8,
            width:8,
            position:'relative',
            marginRight:5,
        
         
            borderRadius:100
        }}
        />
 <Text
        style={{
            color:color_scheme(colorMode,'#333'),
             
            fontSize:14,
            fontWeight:'300'
        }}
        >
            Active
        </Text>
       
        </View>
       


</View>

            </View>
                }
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
                <Video size="28" color={color_scheme(colorMode,'#333')} variant="Linear"/>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    marginRight:10
                }}
                >
                <Call size="28" color={color_scheme(colorMode,'#333')} variant="Linear"/>
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
                       <RenderMsg navigation={navigation} msg={msg} msg2={msg2} key={index} usershashmap={usersHashMap} receiver_type={receiver_type}/>
                    )
                })
            }
         
          
            {/* <TypingComponent/> */}

        </ScrollView>

<View
style={{
    flexDirection:'column'
}}
>


        {
            images.length >0 &&
            <RenderSendImages setImages={setImages} images={images}/>
        }

        <View
        style={{
            flexDirection:'row',
        
            backgroundColor:color_scheme(colorMode,'white'),
            alignItems:'center',
            
            width:Dimensions.get('screen').width-80,
      
        }}
        >
                 <Pressable
    

onPress={()=>{
    Haptics.impactAsync('medium');
    addImage()
}}
    style={{
        marginHorizontal:5,
        width:35,
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        //backgroundColor:'#333',
     

    }}
    >
        <PictureFrame color="#444" variant="Bold" size={33}/>

        </Pressable>
        <View
        style={{
            flexDirection:'column'
        }}
        >
    
    
             <View
        style={{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius:30,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:color_scheme(colorMode,'#eee'),
            paddingRight:20,
            paddingLeft:13,
            paddingVertical:10,
          
            
          
        }}
        >
              <TouchableWithoutFeedback onPress={()=> {setKeyboardStatus(false); Keyboard.dismiss}} 
                                accessible={false}>
          <TextInput
            // onBlur={()=>onKeyboardHide()}
            //  onPressIn={()=>onBoxTap()}
            autoCapitalize="none"
            keyboardAppearance={"dark"}
            autoCorrect={false}
         
             value={text}
             onPointerEnter={()=>setKeyboardStatus(true)}
             onPressIn={()=>setKeyboardStatus(true)}
            
             onChangeText={(t)=>setText(t)}
            multiline
            style={{
            
                flexDirection:'column',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                fontWeight:'200',
                fontSize:16,
                width:'90%',
                color:color_scheme(colorMode,'black')
                
                
            }}
            placeholder="Send a message"
            placeholderTextColor={color_scheme(colorMode,'gray')}
            clearButtonMode={'while-editing'}
            enablesReturnKeyAutomatically={true}
          />
          </TouchableWithoutFeedback>
          {
            text.length==0&&
        
          <TouchableOpacity
          style={{
            width:10
          }}
          onMagicTap={()=>alert('shit')}
          >

          
          <Microphone2
          color={color_scheme(colorMode,'#333')}
          size={20}
          />
          </TouchableOpacity>  }
        </View>
        </View>
        <Pressable
        onPress={()=>{
           SendMessage()
        }}
    


        style={{
            marginHorizontal:5,
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

        </KeyboardAvoidingView>
      
    )
}