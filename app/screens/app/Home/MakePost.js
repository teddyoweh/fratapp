import React,{useState,useContext,useMemo ,useCallback,useRef,useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView,   Vibration,    TextInput, Pressable, Button, KeyboardAvoidingView} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle,PictureFrame,Chart, Link, Link1, Link21, VoiceCricle, Calendar, VolumeHigh, Volume,Briefcase, Send, Send2, Link2, Xd, Minus, MinusCirlce, MinusSquare, BoxRemove, NoteRemove} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import LikeBtn from "../../../components/LikeBtn";
import PostsList from "../../../components/PostsList";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { isLink } from "../../../utils/utils";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import * as ImagePicker from 'expo-image-picker';
import {Dimensions} from 'react-native';
import { color_scheme } from "../../../config/color_scheme";


function LinkInputBox({addLinks}){
    const [link,setLink] = useState('')
    function add(){
        if(isLink(link)){
            addLinks(link)
            setLink('')
        }else{
            Vibration.vibrate()
        }
    }
  
    return(
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginVertical:8,marginHorizontal:10,backgroundColor:'#e8e8e8',paddingHorizontal:10,borderRadius:30,paddingVertical:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>


            <Link2 variant="Broken" color="grey" />
            <TextInput style={{marginLeft:5,width:'85%'}}placeholder="Paste a link"
            autoCapitalize="none"
            autoCorrect={false}
            value={link}
            multiline={true}
            onChangeText={(text)=>setLink(text)}
            autoFocus={true}
            />
            </View>
            <TouchableOpacity onPress={()=>add()}>


            <AddCircle color="grey" variant="Broken"/>
            </TouchableOpacity>
        </View>
    )
}
function LinkBox({links,removeLinks}){
    function remove(link){
        removeLinks(link)

    }
    return(
        <View style={{flexDirection:'column',marginVertical:8,paddingHorizontal:10,borderRadius:30,paddingVertical:5}}>
        {
            links.map((link,index)=>{
                return(
                    <View style={{flexDirection:'row',justifyContent
                    :'space-between',alignItems:'center'}}>
                    
                    <View key={index}style={{flexDirection:'row',alignItems:'center'}}>
                    <Link2 variant="Broken" color="blue" size={20}  />
                    <Text style={{marginLeft:5,color:'blue',width:'90%'}}>{link}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>remove(link)}>
                    <MaterialIcons name="cancel" size={15} color="blue" />
                    </TouchableOpacity>
                    </View>
                )
            })
        }
        </View>
    )
}

function RenderImages({images,setImages}){
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const windowScale = Dimensions.get('window').scale;
 
    function scaleImageToScreen(imageWidth, imageHeight) {

    const maxWidth = windowWidth  
    const maxHeight = windowHeight  

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
    return (
        <View
        style={{
        width:'100%'
        }}
        >
            <ScrollView showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                flexDirection:'row',
                flexWrap:'wrap',
                flex:0
            }}
            >
                {images.length>0 &&
                    images.map((image,index)=>{
                        const {width,height} = scaleImageToScreen(image.width,image.height)
                        return(
                            <View key={index} style={{marginHorizontal:5, marginBottom:5, flexDirection:'row'}}>
                                <Image source={{uri:image.uri}} style={{width:width/2,height:height/2,borderRadius:6}}/>
                                <TouchableOpacity onPress={()=>setImages((prevImages)=>prevImages.filter((img)=>img!==image))}
                                style={{
                                    position:'absolute',
                                    top:5,
                                    right:4
                                }}
                                >
                                    <MaterialIcons name="cancel" size={15} color="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )
                }
            </ScrollView>
        </View>
    )
}
export default function MakePost({navigation, postBottomSheet,setPost,postd}){
 const [postinput,setPostInput] = useState('')
    const [images,setImages] = useState([])
 
 const posttypes = ['All','Announments','Events','Posts','Polls','Opportunities']
    const [userposttypes,setUserPostTypes] = useState([])
const [linkStore, setLinkStore] = useState([])
const snapPoints = useMemo(() => ['25%', '50%'], []);
const {user} = useContext(AppContext)
 
function randomNumberString() {
    var min = 10000; // Minimum 5-digit number (10,000)
    var max = 99999; // Maximum 5-digit number (99,999)
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }
const uploadImages = async (random) =>{

   images.map(async (image,index)=>{
    const data = new FormData();
    data.append('name', 'avatar');
    data.append('email',user.username)
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
 
const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const updateUserPostType = (type) => {
    console.log(type);
    
    if (userposttypes.includes(type)) {
      setUserPostTypes((prevUserPostTypes) => prevUserPostTypes.filter((t) => t !== type));
    } else {
      setUserPostTypes((prevUserPostTypes) => [...prevUserPostTypes, type]);
    }
    
 
  };
  const [mediaOptionActive, setMediaOptionActive] = useState(false)
  const [pollOptionActive, setPollOptionActive] = useState(false)
    const [eventOptionActive, setEventOptionActive] = useState(false)
    const [opportunityOptionActive, setOpportunityOptionActive] = useState(false)
    const [announcementOptionActive, setAnnouncementOptionActive] = useState(false)
    const [voiceOptionActive, setVoiceOptionActive] = useState(false)
    const [linkOptionActive, setLinkOptionActive] = useState(false)
 


 function tapOptions(option){
    switch (option) {
        case 'media':
          setMediaOptionActive(!mediaOptionActive);
          addImage()
          break;
        case 'poll':
          setPollOptionActive(!pollOptionActive);
          break;
        case 'event':
          setEventOptionActive(!eventOptionActive);
          break;
        case 'opportunity':
          setOpportunityOptionActive(!opportunityOptionActive);
          break;
        case 'announcement':
          setAnnouncementOptionActive(!announcementOptionActive);
          break;
        case 'voice':
          setVoiceOptionActive(!voiceOptionActive);
          break;
        case 'link':
          setLinkOptionActive(!linkOptionActive);
          break;
        default:
          break;
      }
       

 } 

 function addLinks(link){
    setLinkStore((prevLinkStore)=>[...prevLinkStore,link])


 }
 function removeLinks(link){
    setLinkStore((prevLinkStore)=>prevLinkStore.filter((l)=>l!==link))
 }


async function axiosMakePost(){
    const random = randomNumberString()
  
   await axios.post(endpoints['makepost'],{links:linkStore, random:random, email:user.username,content:postinput,isjob:opportunityOptionActive,isevent:eventOptionActive,isanouncement:announcementOptionActive,userid:user.userid,repostid:null,isrepost:false,images:images})
    .then(async (res)=>{
        console.log(res.data);
  
        await uploadImages(random).then(res=>{
            postBottomSheet.current.close()
            setImages([])
        })
        // setPost([...postd,res.data])
   
    })
    


}

function onSubmit(){
    axiosMakePost()
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
            console.log(_image)
            setImages((prevImages) => [...prevImages, img]);
        }
    })
  
  };
  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      console.log('Media Permissions are granted')
    }
}
// useEffect(() => {
//     checkForCameraRollPermission()
//   }, []);
const {colorMode} = useContext(AppContext)
return (
    <BottomSheet   ref={postBottomSheet} height={Dimensions.get('screen').height-150}
    
    >
        <KeyboardAvoidingView
        style={{
            backgroundColor:color_scheme(colorMode,'white'),
            height:'100%'
        }}
        >


        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                style={{
                  height:'100%'
                }}
              >

<View style={{flexDirection:'column',flex:1}}>



        <View style={{flexDirection:'column',paddingBottom:0}}>
        <View style={{paddingHorizontal:10,flexDirection:'row', justifyContent:'space-between', paddingTop:8}}>
                <View style={{paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',width:'78%'}}>

          
                <Pressable onPress={()=>tapOptions('media')}>
                    <PictureFrame color="#a330d0" variant={mediaOptionActive?"Bulk":'Broken'}/>
                </Pressable>
                <Pressable  onPress={()=>tapOptions('poll')} style={{marginLeft:10}} >
                    <Chart color="#a330d0" variant={pollOptionActive?"Bulk":'Broken'}/>
                </Pressable>
                <Pressable onPress={()=>tapOptions('link')}  style={{marginLeft:10}} >
                    <Link21 color="#a330d0"  variant={linkOptionActive?"Bulk":'Broken'}/>
                </Pressable>
                <Pressable onPress={()=>tapOptions('voice')}  style={{marginLeft:10}}>
                    <VoiceCricle color="#a330d0" variant={voiceOptionActive?"Bulk":'Broken'}/>
                </Pressable>
                <Pressable onPress={()=>tapOptions('event')}  style={{marginLeft:10}}>
                    <Calendar color="#a330d0" variant={eventOptionActive?"Bulk":'Broken'} />
                </Pressable>
                <Pressable onPress={()=>tapOptions('announcement')}  style={{marginLeft:10}}>
                    <VolumeHigh color="#a330d0" variant={announcementOptionActive?"Bulk":'Broken'} />
                </Pressable>
                <Pressable onPress={()=>tapOptions('opportunity')}  style={{marginLeft:10}}>
                    <Briefcase color="#a330d0" variant={opportunityOptionActive?"Bulk":'Broken'}/>
                </Pressable>

                <View style={{backgroundColor:'#b777d0',width:1}}>

                </View>
                </View>
                <View style={{width:'22%'}}>
                <Pressable onPress={()=>onSubmit()
                } style={{marginLeft:10,flexDirection:'row',alignItems:'center',backgroundColor:'#a330d0',borderRadius:30,paddingHorizontal:10,paddingVertical:3}}>
                    
            
            
                    <Text style={{marginRight:5,fontWeight:'600',color:'white',fontSize:16}}>
                        Post
                    </Text>
                    <Send2 variant="Bulk" color="white"/>
            </Pressable>
                </View>
            </View>
            <View style={{paddingHorizontal:10}}>
                <TextInput placeholder="Share your thoughts"
                multiline={true}
                autoFocus={true}
                onChangeText={(text)=>setPostInput(text)}
                placeholderTextColor={color_scheme(colorMode,'black')}
                style={{
                    // backgroundColor:'#E8E8E8',
                    padding:10,
                    paddingTop:20,
                    borderRadius:10,
                    width:'99%',
                    fontWeight:'400',
                    fontSize:17,
                    // height:200,
                    color:color_scheme(colorMode,'black')
             
                }}
                />

                {linkStore.length>0&& 
                <LinkBox links={linkStore} removeLinks={removeLinks}/>
                }
            </View>
            <View style={{paddingHorizontal:10}}>
                <RenderImages images={images} setImages={setImages}/>
            </View>


          
      
        </View>
        </View>
        </ScrollView>
        <View>


        {/* <View style={{paddingHorizontal:10}}>
            <ScrollView                keyboardShouldPersistTaps="always" horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        posttypes.map((posttype,i)=>{
                            return(
                                <TouchableOpacity key={i} style={userposttypes.includes(posttype)==true?homestyles.filtera:homestyles.filter} onPress={()=>updateUserPostType(posttype)}>
                                    <Text style={userposttypes.includes(posttype)?homestyles.filtertexta:homestyles.filtertext}>{posttype}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }


                </ScrollView>

            </View> */}
        {linkOptionActive&& <LinkInputBox addLinks={addLinks}/>}
         
            </View>
      
        </KeyboardAvoidingView>
  </BottomSheet>
)
}

