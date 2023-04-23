import React,{useState,useContext,useMemo ,useCallback,useRef}from "react";
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
export default function MakePost({navigation, postBottomSheet}){
 const [postinput,setPostInput] = useState('')
 const posttypes = ['All','Announments','Events','Posts','Polls','Opportunities']
    const [userposttypes,setUserPostTypes] = useState([])
const [linkStore, setLinkStore] = useState([])
const snapPoints = useMemo(() => ['25%', '50%'], []);
const {user} = useContext(AppContext)
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
   await axios.post(endpoints['makepost'],{links:linkStore, content:postinput,isjob:opportunityOptionActive,isevent:eventOptionActive,isanouncement:announcementOptionActive,userid:user.id,repostid:null,isrepost:false,})
    .then((res)=>{
        console.log(res.data);
        postBottomSheet.current.close()
    })


}

function onSubmit(){
    axiosMakePost()
}
return (
    <BottomSheet hasDraggableIcon ref={postBottomSheet} height={850} >
        <KeyboardAvoidingView>


        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              >

<View style={{flexDirection:'column',height:480,justifyContent:'space-between'}}>



        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end',padding:10}}>
                <Button title="Cancel" onPress={()=>postBottomSheet.current.close()}></Button>
          
                {/* <Pressable style={{backgroundColor:'#a330d0',paddingVertical:10,paddingHorizontal:15,borderRadius:30}}><Text style={{color:'white'}}>Post</Text></Pressable> */}
            </View>
            <View style={{paddingHorizontal:10}}>
                <TextInput placeholder="Whats going on?"
                multiline={true}
                autoFocus={true}
                onChangeText={(text)=>setPostInput(text)}
                style={{
                    // backgroundColor:'#E8E8E8',
                    padding:10,
                    paddingTop:20,
                    borderRadius:10,
                    width:'99%',
                    fontWeight:'600',
                    fontSize:17,
                    // height:200,
             
                }}
                />

                {linkStore.length>0&& 
                <LinkBox links={linkStore} removeLinks={removeLinks}/>
                }
            </View>


          
      
        </View>
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
            <View style={{paddingHorizontal:10,flexDirection:'row',borderColor:'#b777d0',borderTopWidth:1, justifyContent:'space-between', paddingTop:8}}>
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
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
  </BottomSheet>
)
}

