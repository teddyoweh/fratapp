import React,{useState,useContext,useMemo ,useCallback,useRef,useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView,   Vibration,    TextInput, Pressable, Button, KeyboardAvoidingView} from "react-native";
import { authstyles, homestyles } from "../../../../styles";
import { Feather } from '@expo/vector-icons'; 

import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle,PictureFrame,Chart, Link, Link1, Link21, VoiceCricle, Calendar, VolumeHigh, Volume,Briefcase, Send, Send2, Link2, Xd, Minus, MinusCirlce, MinusSquare, BoxRemove, NoteRemove} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../../context/appContext";
import LikeBtn from "../../../../components/LikeBtn";
import PostsList from "../../../../components/PostsList";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { isLink, wrapUIMG } from "../../../../utils/utils";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import * as ImagePicker from 'expo-image-picker';
import {Dimensions} from 'react-native';
import { color_scheme } from "../../../../config/color_scheme";
import AudioRecorderPlayerComponent from "../../../../components/Audio";
import MapView from 'react-native-maps';
import * as Haptics from 'expo-haptics'
import { makeeventstyles } from "../../Calendar/MakeEvent";
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
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
function RenderDateBottomSheet({dateBottomSheet,type,setstartDate,startdate,setendDate, enddate}){
    const {colorMode} = useContext(AppContext)
    function getAllYearsFrom1999ToNow() {
        const currentYear = new Date().getFullYear();
        const startYear = 1999;
        const yearsArray = [];
      
        for (let year = startYear; year <= currentYear; year++) {
          yearsArray.push(year);
        }
      
        return yearsArray;
      }
      const getYears = (currentYear, range) => {
        const years = [];
        for (let i = 1; i <= Math.abs(range); i++) {
          const year = currentYear + (range > 0 ? i : -i);
          years.push(year);
        }
        return years;
      };
    
 
    
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      const options = ['Date','Time']

      const currentYear = new Date().getFullYear();
 
      const [yearslist,setYearsList] = useState([...Array(41).keys()].map(i => currentYear - 20 + i))
      console.log(yearslist)
 
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth,setSelectMonth] = useState(monthNames[new Date().getMonth()])
    const [activeDay,setActiveDay] = useState(new Date().getDate())
    const [selectedHour,setSelectedHour] = useState((new Date().getHours()% 12) || 12)
    const [selectedMinute,setSelectedMinute] = useState(new Date().getMinutes())
    const [selectedAMPM,setSelectedAMPM] = useState(new Date().getHours()>=12?'PM':'AM')
 
    const [activeOption,setActiveOption] = useState(options[0])
  
    const hoursarr = Array.from({ length: 59 }, (_, index) => {
        const number = index + 1;
        return number < 10 ? `0${number}` : `${number}`;
      });
      
      const getDayOfWeek = (year, month, day) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
          ];
        const dayOfWeek = new Date(year, monthNames.indexOf(month), day).getDay();
  
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[dayOfWeek];
      };

 
  const updateDate = () => {
   
    const formattedDate = `${getDayOfWeek(selectedYear,selectedMonth,activeDay)} ${selectedMonth} ${activeDay}, ${selectedYear} ${selectedHour}:${selectedMinute} ${selectedAMPM}`;
    
    if(type=='start'){
        setstartDate(formattedDate)
    }else{
        setendDate(formattedDate)
    }

  };

  
  useEffect(() => {
    updateDate();
  }, [selectedYear, selectedMonth, activeDay, selectedHour, selectedMinute, selectedAMPM]);

    
    return (
        <BottomSheet    ref={dateBottomSheet} height={Dimensions.get('screen').height-550}
        >
      
            <KeyboardAvoidingView
            style={{
                backgroundColor:color_scheme(colorMode,'white'),
                height:'100%'
            }}
            >
                
     
            <View
            style={{
                padding:10
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:20,
                justifyContent:'space-around'
            }}
            >
                {options.map((option,index)=>{
                    return (
                        <TouchableOpacity
                        key={index}
                        onPress={()=>{
                            Haptics.impactAsync('medium');
                            setActiveOption(option)
                        }}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            paddingHorizontal:20,
                            paddingVertical:10,
                            borderRadius:10,
                            backgroundColor:activeOption==option?color_scheme(colorMode,'black'):color_scheme(colorMode,'#eee')
                        }}
                        >
                            <Text
                            style={{
                                color:activeOption==option?color_scheme(colorMode,'white'):color_scheme(colorMode,'black'),
                                fontSize:17,
                                fontWeight:600
                            }}
                            >

                                {option}
                            </Text>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            {
                activeOption=='Date' &&
         
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            
                justifyContent:'center',
                paddingTop:20
            }}
            >
        
              
                <Picker
        selectedValue={`${activeDay}`}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 90 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setActiveDay(`${itemValue}`)}
      >
        {Array.from({ length: 31 }, (_, index) => index + 1).map((d,index)=>{
            return (
                <Picker.Item key={index} label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={selectedMonth}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 150 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setSelectMonth(itemValue)}
      >
        {monthNames.map((m,index)=>{
            return (
                <Picker.Item key={index} label={m}  value={m} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedYear}`}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 150 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setSelectedYear(`${itemValue}`)}
      >
        {Array.from({ length: 41 }, (_, index) => new Date().getFullYear() - 20 + index).map((year,index)=>{
            return (
                <Picker.Item label={`${year}`}  key={index} value={`${year}`} />
            )
        })
        }
       
        
      </Picker>
        
            </View>   }
            {
                activeOption=='Time' &&
         
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            
                justifyContent:'center',
                paddingTop:20
            }}
            >
        
              
                <Picker
        selectedValue={`${selectedHour}`}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 100 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setSelectedHour(`${itemValue}`)}
      >
        {Array.from({ length: 12 }, (_, index) => index + 1).map((d,index)=>{
            return (
                <Picker.Item key={index} label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedMinute}`}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 100 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setSelectedMinute(`${itemValue}`)}
      >
        {hoursarr.map((d,index)=>{
            return (
                <Picker.Item key={index}  label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedAMPM}`}
        itemStyle={{
            color:color_scheme(colorMode,'black')
        }}
        style={{ height: 0, width: 100 ,backgroundColor:color_scheme(colorMode,'white')}}
        onValueChange={(itemValue, itemIndex) => setSelectedAMPM(`${itemValue}`)}
      >
        {['AM','PM'].map((year,index)=>{
            return (
                <Picker.Item key={index} label={`${year}`}  value={`${year}`} />
            )
        })
        }
       
        
      </Picker>
        
            </View>   }
           
     
             
                </View>
          
            </KeyboardAvoidingView>
      </BottomSheet>
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
                    <View key={index}style={{flexDirection:'row',justifyContent
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
function RenderPoll({polls,setPolls,startdate,setStartDate,postinput,setPostInput}){

    const dateBottomSheet = useRef()
    const [activeDateType,setActiveDateType] = useState('start')
 
 
    const {colorMode} = useContext(AppContext)
    function openDateSheet(type){
      
        Haptics.impactAsync('medium')
        setActiveDateType(type)
        dateBottomSheet.current.show()
    
    }
    function removePoll(index) {
        const updatedPolls = [...polls];
        updatedPolls.splice(index, 1);
        setPolls(updatedPolls);
      }
    
      function updatePolls(text, index) {
        const updatedPolls = [...polls];
        updatedPolls[index] = text;
        setPolls(updatedPolls);
      }
    return (
        <View>


        <TextInput placeholder="Poll Question"
        multiline={true}
        autoFocus={true}
        value={[postinput]}
        onChangeText={(text)=>setPostInput(text)}
        placeholderTextColor="#444"
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
      <View
      style={{
        paddingTop:17
      }}
      >
        {
            polls.map((poll,index)=>{
                return (
                    <Animatable.View
                    animation="slideInRight" // The animation type
                    duration={1500}  
                    style={{
                        width: '100%',
                
                      justifyContent: 'center',
                      alignItems: 'center',
              
                      left:0  
                    }}
                  >
                    <View style={[makeeventstyles.formgrp,{flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between',    width:'100%',}]}>
        
                            <TextInput placeholder={`Poll Option ${index+1}`}
                                  autoFocus={true}
                            style={{
            
                             backgroundColor:'#222',
                            padding:10,   
                            borderRadius:10,
                            fontSize:19,
                            width:        index>1?'90%':'100%',
                            fontWeight:'300',
                            color:'white',
                            borderStyle:'solid',
                            borderWidth:1,
                            borderColor:'#222'
                            }}
                            value={polls[index]}
                            onChangeText={(text) => updatePolls(text, index)}
                            />

                            {
                                index>1 &&
                       
                            <TouchableOpacity onPress={()=>removePoll(index)}>
                            <Minus color="white"/>
                            </TouchableOpacity>
                                 }
                            </View>

                </Animatable.View>
                )
            })

        }
        <TouchableOpacity style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:color_scheme(colorMode,'black'),
            borderRadius:10,
            padding:10,
            marginVertical:10
        }}
        onPress={()=>setPolls((prevPolls)=>[...prevPolls,''])}
        >
            <Text style={{
                color:color_scheme(colorMode,'white'),
                fontSize:17,
                fontWeight:'500'
            }}>
                Add Poll
            </Text>
        </TouchableOpacity>
        <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Deadline</Text>
                            <TouchableOpacity
                        onPress={()=>openDateSheet('start')}
                        style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]}  
                        >

<Text
style={{
    color:color_scheme(colorMode,'gray')

}}
>
{startdate==''?'Start Date':startdate}
</Text>
                            {/* <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Start Datee"    /> */}
                                                    </TouchableOpacity>
                        </View>

                     
                        <View style={makeeventstyles.formgrp}>

                     </View>
      </View>
      <RenderDateBottomSheet dateBottomSheet={dateBottomSheet} type={activeDateType} setstartDate={setStartDate} startdate={startdate}   />

    </View>
    )
}
function RenderLocationSheet({locationBottomSheet,setEventLocation,eventlocation}){
    const handleMapPress = (e) => {
        // Get the new latitude and longitude from the event
        const newLocation = {
          lat: e.nativeEvent.coordinate.latitude,
          long: e.nativeEvent.coordinate.longitude,
        };
 
        setEventLocation(newLocation);
    } 
    return (
        <BottomSheet  ref={locationBottomSheet} height={Dimensions.get('screen').height-150} draggable={false}  >
                  <MapView
                   onPress={handleMapPress}
                   initialRegion={{
                    latitude: eventlocation.lat, // Default latitude
                    longitude: eventlocation.long, // Default longitude
                    latitudeDelta: 0.02, // Controls the zoom level
                    longitudeDelta: 0.02, // Controls the zoom level
                  }}
                   onPoiClick={()=>locationBottomSheet.current.show()}
            tintColor="#444"
            style={{
        
                height:"100%",
             
       
                width:'100%',
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#222'
            }}
            />
        </BottomSheet>
    )
}
function RenderMakeEvent({startdate,enddate,setStartDate,setEndDate,eventtype, setEventType, eventlocation, setEventLocation,eventname, setEventName,  eventdescription, setEventDescription}){
    const dateBottomSheet = useRef()
    const locationBottomSheet = useRef()
    const [activeDateType,setActiveDateType] = useState('start')
    const [eventOthertype,setEventOtherType] = useState('')
    const {colorMode} = useContext(AppContext)
    const eventtypes = [
        "Club Meeting",
        "Workshop",
        "Seminar",
        "Guest Speaker",
        "Community Service",
        "Sports",
        "Networking Event",
        "Career Fair",
        "Diversity and Inclusion",
        "Competition",
   
      ];
      
      const handleMapPress = (e) => {
        // Get the new latitude and longitude from the event
        const newLocation = {
          lat: e.nativeEvent.coordinate.latitude,
          long: e.nativeEvent.coordinate.longitude,
        };
        alert(JSON.stringify(newLocation));
        setEventLocation(newLocation);
    }    
    function openDateSheet(type){
      
        Haptics.impactAsync('medium')
        setActiveDateType(type)
        dateBottomSheet.current.show()
    
    }
    useEffect(()=>{
        setEventType(eventtypes[0])
    },[])
    return (
        <View
        style={{
            paddingHorizontal:10
        }}
        >

    
      
            <View
            style={{
                marginTop:10,
                width:'100%'
            }}
            >
                                    <View style={makeeventstyles.formgrp}>
        <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Title</Text>
                <TextInput placeholder="Title"
                      autoFocus={true}
                      onChangeText={(text)=>setEventName(text)}
                      value={eventname}
                style={{

                 backgroundColor:'#222',
                padding:10,   
                borderRadius:10,
                fontSize:19,
                width:'100%',
                fontWeight:'300',
                color:'white',
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#222'
                }}
                />
                </View>
                                    <View style={makeeventstyles.formgrp}>
        <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Description</Text>
                  <TextInput placeholder="Description"
                        autoFocus={true}
                        onChangeText={(text)=>setEventDescription(text)}
                        value={eventdescription}
                  placeholderTextColor="#555"
                multiline={true}
                style={{
                    marginTop:15,
                 backgroundColor:'#222',
                padding:10,  
                height:150,
                borderRadius:10,
                fontSize:19,
                width:'100%',
                fontWeight:'300',
                color:'white',
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#222'
                }}
                />
                </View>
                    <View style={makeeventstyles.formgrp}>
        <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Event Type</Text>
        <ScrollView horizontal={true} contentContainerStyle={{paddingVertical:5}} showsHorizontalScrollIndicator={false}>


 

            {
                eventtypes.map((event,index)=>{
                    return (

                  
                    <TouchableOpacity key={index} style={eventtype==event?makeeventstyles.eventtypea:[makeeventstyles.eventtype,{backgroundColor:color_scheme(colorMode,'#eee'),borderColor:color_scheme(colorMode,'#eeee')}]} onPress={()=>setEventType(event)}>
                        <Text style={eventtype==event?makeeventstyles.eventtypetexta:[makeeventstyles.eventtypetext,{color:color_scheme(colorMode,'black'),fontWeight:'300'}]}>{event}</Text>
                    </TouchableOpacity>
                      )
                })
            }
                 <TouchableOpacity style={eventtype=='Other'?makeeventstyles.eventtypea:[makeeventstyles.eventtype,{backgroundColor:color_scheme(colorMode,'#eee'),borderStyle:'dashed',borderColor:'#666',borderWidth:1}]} onPress={()=>setEventType('Other')}>
                                    <Text style={eventtype=='Other'?makeeventstyles.eventtypetexta:[homestyles.filtertext,{color:"#666"}]}>Other</Text>
                                </TouchableOpacity>
      
   
        </ScrollView>
        {
            eventtype=='Other' &&
            <View style={makeeventstyles.formgrp}>
            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Event Type (Other)</Text>
                    <TextInput placeholder="Event Type"
                    onChangeText={(text)=>setEventOtherType(text)}
                          autoFocus={true}
                    style={{
    
                     backgroundColor:'#222',
                    padding:10,   
                    borderRadius:10,
                    fontSize:19,
                    width:'100%',
                    fontWeight:'300',
                    color:'white',
                    borderStyle:'solid',
                    borderWidth:1,
                    borderColor:'#222'
                    }}
                    />
                    </View>
        }

       
       
                        </View>
                        <View style={makeeventstyles.formgrp}>

<Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Location</Text>

                  <MapView
                   onPress={()=>locationBottomSheet.current.show()}
                   onPoiClick={()=>locationBottomSheet.current.show()}
                   initialRegion={{
                    latitude: eventlocation.lat, // Default latitude
                    longitude: eventlocation.long, // Default longitude
                    latitudeDelta: 0.02, // Controls the zoom level
                    longitudeDelta: 0.02, // Controls the zoom level
                  }}
            tintColor="#444"
            style={{
        
                height:150,
             
                borderRadius:15,
                width:'99%',
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'#222'
            }}
            />
               <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Start Date</Text>
                            <TouchableOpacity
                        onPress={()=>openDateSheet('start')}
                        style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]}  
                        >

<Text
style={{
    color:color_scheme(colorMode,'gray')

}}
>
{startdate==''?'Start Date':startdate}
</Text>
                            {/* <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Start Datee"    /> */}
                                                    </TouchableOpacity>
                        </View>

                     
                        <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>End Date</Text>
                            <TouchableOpacity
                        onPress={()=>openDateSheet('end')}
                        style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]}  
                        >

<Text
style={{
    color:color_scheme(colorMode,'gray')

}}
>
{enddate==''?'End Date':enddate}
</Text>
                            {/* <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}    keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Start Datee"    /> */}
                                                    </TouchableOpacity>
                        </View>
       </View>
            </View>
          
 
        <View
        
        >
          
        </View>
        <RenderDateBottomSheet dateBottomSheet={dateBottomSheet} type={activeDateType} setstartDate={setStartDate} startdate={startdate} setendDate={setEndDate} enddate={enddate} />
        <RenderLocationSheet locationBottomSheet={locationBottomSheet} setEventLocation={setEventLocation} eventlocation={eventlocation}/>
        </View>
    )
    
}
export default function MakePost({navigation,route}){
const {setPost,postd,org,cohort} = route.params

 const [postinput,setPostInput] = useState('')
    const [images,setImages] = useState([])
  
 const posttypes = ['All','Announments','Events','Posts','Polls','Opportunities']
    const [userposttypes,setUserPostTypes] = useState([])
const [linkStore, setLinkStore] = useState([])
const snapPoints = useMemo(() => ['25%', '50%'], []);
 
 
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
    const tabfilters = ['Thoughts','Poll','Event','Announcement']
    const [selectedTab,setSelectedTab] = useState(tabfilters[0].toLowerCase())
  
 function tapOptions(option1){
    
    const option = option1.toLowerCase()
 
    setSelectedTab(option)
    switch (option) {
        case 'media':
          setMediaOptionActive(!mediaOptionActive);
          addImage()
          setSelectedTab('thoughts')
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
        // case 'voice':
        //   setVoiceOptionActive(!voiceOptionActive);
        //   break;
   
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
 const {user} = useContext(AppContext)
 const [polldate,setPollDate] = useState('')
 const [polls,setPolls] = useState(['',''])
 const [eventstartdate,setEventStartDate] = useState('')
 const [eventenddate,setEventEndDate] = useState('')
 const [eventname,setEventName] = useState('')
 const [eventdescription,setEventDescription] = useState('')
 const [eventtype,setEventType] = useState('')
 const [eventlocation,setEventLocation] = useState({
    lat: 37.78825,
    long: -122.4324,
 })
async function axiosMakePost(){
    const random = randomNumberString()
  
   await axios.post(endpoints['makepost'],{eventstartdate:eventstartdate,eventenddate:eventenddate, eventdescription:eventdescription,eventname:eventname,eventlocation:eventlocation, links:linkStore, random:random, email:user.username,content:postinput,isjob:opportunityOptionActive,isevent:eventOptionActive,isanouncement:announcementOptionActive,userid:user.userid,repostid:null,isrepost:false,images:images,posttype:selectedTab.toLowerCase(),pollsoptions:polls,pollsdeadline:polldate,isorgpriv:true,orgid:org._id,userid:user.userid})
    .then(async (res)=>{
        console.log(res.data);
  
        await uploadImages(random).then(res=>{
            navigation.goBack()
            setImages([])
        })
        // setPost([...postd,res.data])
   
    })
    


}

  function onSubmit(){
    Haptics.impactAsync('medium')
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
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{
      backgroundColor:color_scheme(colorMode,'white'),
      flexDirection:'column',
      justifyContent:'space-between',
      height:'100%',
      flex:1,
  }}
  keyboardVerticalOffset={80}
  >
    <View
    style={{
        flexDirection:'column',
        flex:1
    }}
    >
    <View
            style={{
              flexDirection:'column',
              alignItems:'center',   paddingVertical:10,      paddingHorizontal:8,
              borderStyle:'solid',
              borderBottomWidth:1,
              borderColor:color_scheme(colorMode,'#ddd')
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                width:'100%',
                justifyContent:'space-between',
          
             
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
            <View
            style={{
                flexDirection:'row',
                alignItems:'center'
            }}
            >
            <Image source={{uri:wrapUIMG(org.org_logo)}} style={{
                height:40,
                width:40,
                borderRadius:100,
                marginRight:10
            }}/>
            <Text
            style={{
                fontSize:17,
                fontWeight:'600',
                color:color_scheme(colorMode,'black')
        
            }}
            >
                {org.org_name}
            </Text>
            </View>
            <TouchableOpacity>
                <More color={color_scheme(colorMode,'#333')} variant="Broken"/>
            </TouchableOpacity>

            </View>
            <View>
                <Text
                style={{
                    color:color_scheme(colorMode,'#aaa'),
                    fontWeight:'700',
                    fontSize:16,
                }}
                >
                    # {cohort.channel_name}
                </Text>
            </View>
            </View>

    <View
    style={{
        flexDirection:'column',
        flex:1,
        height:'100%',
        backgroundColor:color_scheme(colorMode,'white'),
 

    }}
    >


       
<KeyboardAvoidingView
    
style={{
    backgroundColor:color_scheme(colorMode,'white'),
    flexDirection:'column',
    justifyContent:'space-between',
    height:'92.5%'
 
}}
 >

<ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                style={{
            
                  
                }}
                contentContainerStyle={{
                  
                }}
        >


        <View style={{flexDirection:'column',paddingBottom:0}}>
      
            <View style={{paddingHorizontal:10,flexDirection:'row',paddingVertical:10,
        alignItems:"flex-start"}}>
                <View style={{flexDirection:'row',alignItems:"center",paddingTop:10}}>
                    <Image source={{uri:wrapUIMG(user.uimg)}} style={{
                        height:40,
                        width:40,
                        borderRadius:100
                    }}/>
                </View>
                <View
                style={{
                    flexDirection:'column',
                    width:'90%'
                }}
                >
                    {
                        selectedTab.toLowerCase()=='announcement'   &&
                  <View
                  style={{
                    flex:1,
                    flexDirection:'column',
                    width:'auto',
                    paddingHorizontal:5,
                  }}
                  >
                    <View
                    style={{
                        paddingHorizontal:14,
                        paddingVertical:8,
                        borderWidth:1,
                        borderColor:'white',
                        borderRadius:20,
                        width:"40%",
                        justifyContent:"space-between",
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                    >
                        <FontAwesome name="bullhorn" size={20} color="white" />
                    <Text style={{
                        color:'white'
                    }}>
                        Announcement
                    </Text>
                    </View>
                       <TextInput placeholder="Share your Announcement"
                multiline={true}
                autoFocus={true}
                onChangeText={(text)=>setPostInput(text)}
                placeholderTextColor="#444"
                style={{
                    // backgroundColor:'#E8E8E8',
                    padding:10,
                    paddingTop:15,
                    borderRadius:10,
                    width:'99%',
                    fontWeight:'400',
                    fontSize:17,
                    // height:200,
                    color:color_scheme(colorMode,'black')
             
                }}
                />
                </View>
             }
                      {
                        selectedTab.toLowerCase()=='thoughts' &&
                  
                <TextInput placeholder="Share your thoughts"
                multiline={true}
                autoFocus={true}
                onChangeText={(text)=>setPostInput(text)}
                placeholderTextColor="#444"
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
                />}
                        {
                        selectedTab.toLowerCase()=='poll'  &&
                  
               <RenderPoll setPolls={setPolls} polls={polls} setStartDate={setPollDate} startdate={polldate} postinput={postinput} setPostInput={setPostInput}/>}
                {
                      selectedTab.toLowerCase()=='event' && 
 
 
                <RenderMakeEvent  eventtype={eventtype} setEventType={setEventType} eventlocation={eventlocation}  setEventLocation={setEventLocation} eventname={eventname } setEventName={setEventName}  eventdescription={eventdescription} setEventDescription={setEventDescription}    setEndDate={setEventEndDate} setStartDate={setEventStartDate} startdate={eventstartdate} enddate={eventenddate}/>
            }
                </View>
               
         

                {linkStore.length>0&& 
                <LinkBox links={linkStore} removeLinks={removeLinks}/>
                }
            </View>
        
            <View style={{paddingHorizontal:10}}>
                <RenderImages images={images} setImages={setImages}/>
            </View>
            <View
style={{
    paddingTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor:color_scheme(colorMode,'white'),
    paddingHorizontal:10
}}
>
 
            <Pressable onPress={()=>onSubmit()
                } style={{marginLeft:10,flexDirection:'row',alignItems:'center',backgroundColor:'#a330d0',borderRadius:30,paddingHorizontal:16,paddingVertical:8}}>
                    
            
            
                    <Text style={{marginRight:5,fontWeight:'300',color:'white',fontSize:18}}>
                        Post
                    </Text>
                    <Send2 variant="Bold" color="#eee"/>
            </Pressable>
</View>

      


          
      
        </View>

        </ScrollView>
   
           
        <View style={{paddingHorizontal:10,flexDirection:'row'}}
 showsHorizontalScrollIndicator={false}
 horizontal
        contentContainerStyle={{
            flex:1
        }}
        >
             
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
       alignItems:"center",
       paddingTop:10
        }}
        >

 <Pressable onPress={()=>tapOptions('media')}
 style={{
    marginRight:10
 }}
 >
                    <PictureFrame color="white" variant={'Bulk'} size={35}/>
                </Pressable>
                {
                    tabfilters.map((tab,index)=>{
                        return (
                            <Pressable
                            onPress={()=>tapOptions(tab)}
                            style={{
                                backgroundColor:selectedTab==tab.toLowerCase()?"white":'transparent',
                                borderStyle:'solid',
                                borderWidth:1,
                                borderColor:'#555',
                                borderRadius:40,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                marginRight:10
                                
                            }}
                            key={index}
                            >
                                <Text
                                style={{
                                    color:selectedTab==tab.toLowerCase()?'black':'#555'
                                }}
                                >
                                    {tab}
                                </Text>
                            </Pressable>
                        )
                    })
                }
                        </ScrollView>
                {/* <Pressable onPress={()=>tapOptions('media')}>
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
                </Pressable> */}

            
             
             
            </View>
          
</KeyboardAvoidingView>

        </View>
        </View>
        
        </KeyboardAvoidingView>
)
}

