
import { useLayoutEffect,useState,useEffect,useRef,useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView,{Marker} from 'react-native-maps';

import { useRoute } from '@react-navigation/native';
import {View,Text,ScrollView,Modal, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet, Pressable} from 'react-native'
import { calendarstyles,discoverstyles } from '../../../styles';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { AppContext } from '../../../context/appContext';
import { Add, AddCircle, Calendar1, Calendar2, CalendarAdd,SearchNormal, } from 'iconsax-react-native'
import { Image } from 'react-native';
import { wrapUIMG } from '../../../utils/utils';
import axios from 'axios'
import {endpoints} from '../../../config/endpoints'
import DatePicker from 'react-native-modern-datepicker';

function DateBottomSheet({bottomSheet,setSelectedDate}){
    return(
        <BottomSheet hasDraggableIcon={false} ref={bottomSheet} height={450} >
        <View style={{backgroundColor:'white',flex:1}}>

       
        <DatePicker
onSelectedChange={date => setSelectedDate(date)}
mode="calendar"
maximumDate={Date()}
/>
</View>
</BottomSheet>
    )
}
function AddUserAccessSheet({bottomSheet}){

    return (
        <>

        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet} height={850}  >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1}}>


        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:"white"}}
              >

<View style={{flexDirection:'column', backgroundColor:'white', paddingHorizontal:10,paddingTop:10}}>
<View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search} placeholderTextColor={'#aaa'} placeholder="Search for Orgs, Groups and Users to give access"/>
                </View>
 



     
     
        </View>
        </ScrollView>
        
        </KeyboardAvoidingView>
  </BottomSheet>

  </>
    )
    
}
function LocationMapSheet({bottomSheet,location,setLocation,region}){
    const searchmapref = useRef()
    function showsearchmap(){
        searchmapref.current.show()
    }
    return (
        <>
        
        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet} height={850}  >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1}}>


        <MapView
        style={{width:'100%',height:'100%',borderRadius:10}}
        initialRegion={
            region 
            }
          >
          
          <Marker draggable
          style={{
              width: 50,
          }}
              coordinate={location}
              onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
            />
          </MapView>
<View
style={{
    position:'absolute',
    bottom:20,
    right:20,
}}
>
    <TouchableOpacity
    style={{
        backgroundColor:'white',
        borderRadius:100,
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    }}
    onPress={()=>showsearchmap()}
    >


    <SearchNormal 
    color='#333'
    variant='Bulk'
    size={30}
    />
        </TouchableOpacity>
</View>
        
        </KeyboardAvoidingView>
        <SearchMapSheet bottomSheet={searchmapref}/>
  </BottomSheet>
  
  </>
    )
    
}
function SearchMapSheet({bottomSheet}){

    return (
        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet}  

    height={840}
        >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1}}>


  
        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:"white"}}
              >

<View style={{flexDirection:'column', backgroundColor:'white', paddingHorizontal:10,paddingTop:10}}>
<View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search} placeholderTextColor={'#aaa'} placeholder="Search Location"/>
                </View>
 



     
     
        </View>
        </ScrollView>
        
        </KeyboardAvoidingView>
  </BottomSheet>
    )
    
}

export default function MakeEvent({navigation,route,eventBottomSheet}){
    const {user} = useContext(AppContext)
    const maprefsheet =useRef()
    const AddUserAccessSheetref = useRef()
    const datebottomsheet = useRef()
    function openUserAccessSheet(){
        AddUserAccessSheetref.current.show()
    }
    function openLocationSheet(){
        maprefsheet.current.show()
    }

    const eventtypes = [
        {
            name: 'General',
            icon: <CalendarAdd variant="Bulk" color="#a330d0" />
        },
        {
            name: 'Study Hours',
            //icon: <CalendarAdd variant="Bulk" color="#a330d0" />
        },
        {
            name: 'Sports',
            //icon: <SportsSoccer variant="Bulk" color="#f05d23" />
        },
        {
            name: 'Meetings',
            //icon: <PeopleOutline variant="Bulk" color="#2e8b57" />
        },
        {
            name: 'Workshops',
            //icon: <Build variant="Bulk" color="#ff7f50" />
        },
        {
            name: 'Conferences',
            //icon: <RecordVoiceOver variant="Bulk" color="#4682b4" />
        },
        {
            name: 'Social Events',
            //icon: <LocalBar variant="Bulk" color="#daa520" />
        },
        {
            name: 'Performances',
            //icon: <Theaters variant="Bulk" color="#db7093" />
        },
        {
            name: 'Fundraisers',
            //icon: <MonetizationOn variant="Bulk" color="#8b0000" />
        },
        {
            name: 'Volunteering',
            //icon: <Eco variant="Bulk" color="#006400" />
        },
        {
            name: 'Career Fairs',
            //icon: <Work variant="Bulk" color="#4b0082" />
        },
        {
            name: 'Exhibitions',
            //icon: <PhotoLibrary variant="Bulk" color="#dc143c" />
        },
    ]
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
 
    const [startdate,setStartDate] = useState('')
    const [enddate,setEndDate] = useState('')
    const [location,setLocation] = useState({
        "latitude":32.2214,"longitude":-98.2224,
    })

    async function getLocation(){
      await  axios.post('https://geolocation-db.com/json/').then(res=>{
            setLocation({
                "latitude":res.data.latitude,"longitude":res.data.longitude,
            })
        })
    }
 
    const getRegionWithRadius = (latitude, longitude) => {
        const radiusInDegrees = 1 / 69; 
        return {
          latitude,
          longitude,
          latitudeDelta: radiusInDegrees,
          longitudeDelta: radiusInDegrees,
        };
      };

    const region = getRegionWithRadius(location.latitude,location.longitude)
    const [activeEventType,setActiveEventType] = useState('General')
   
        // Geolocation.getCurrentPosition(
        //     (position) => {
        //       console.log(position);
        //     },
        //     (error) => {
        //       // See error code charts below.
        //       console.log(error.code, error.message);
        //     },
        //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        // );
    const accessHashMap = [user.userid]
    const [titleerror,setTitleError] = useState({
        'status':false,
        'text':null
    })
    const [startdateerror,setstartDateError] = useState({
        'status':false,
        'text':null
    })
    const [endateerror,setendDateError] = useState({
        'status':false,
        'text':null
    })
    const [descerror,setDescriptionError] = useState({
        'status':false,
        'text':null
    })
    const resetState =()=>{
        setTitle('')
        setDescription('')
        setStartDate('')
        setEndDate('')
        setLocation({
            "latitude":32.2214,"longitude":-98.2224,
        })
        setActiveEventType('General')
    }
    function validateErrors(){
        let error = false
        if(title==''){
            setTitleError({
                'status':true,
                'text':'Event Title is required'
            })
            error = true
        }else{
            setTitleError({
                'status':false,
                'text':null
            })
        }
        if(startdate==''){
            setstartDateError({
                'status':true,
                'text':'Start Date is required'
            })
            error = true
        }else{
            setstartDateError({
                'status':false,
                'text':null
            })
        }
        if(enddate==''){
            setendDateError({
                'status':true,
                'text':'End Date is required'
            })
            error = true
        }else{
            if(enddate<startdate){
                setendDateError({
                    'status':true,
                    'text':'End Date cannot be before Start Date'
                })
                error = true
            }else{
                setendDateError({
                    'status':false,
                    'text':null
                })
            }
        }
        if(description==''){
            setDescriptionError({
                'status':true,
                'text':'Description is required'
            })
            error = true
        }else{
            setDescriptionError({
                'status':false,
                'text':null
            })
        }
        return error

    }
    async function sendEvent(){
        if(!validateErrors()){

      
        const data = {
            startdate:startdate,
            enddate:enddate,
            access:accessHashMap,
            eventname:title,
            eventdescription:description,
            location:location,
            eventtype:activeEventType,
            createdby:user.userid
        }
        axios.post(endpoints['addcalendar'],data).then(res=>{
            console.log(res.data)
            resetState()
            eventBottomSheet.current.close()
        
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
    const [datetype,setDateType] = useState(null)
    function openDateSheet(type){
        if(type=='start'){
            setDateType(setStartDate)
            datebottomsheet.current.show()
        }else{
            setDateType(setEndDate)
            datebottomsheet.current.show()
        }
        
    }
    useEffect(() => {
        getLocation()
    },[])
    
    return (
        <BottomSheet  hasDraggableIcon={false} ref={eventBottomSheet} height={860}  >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1}}>


        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:"white"}}
              >

<View style={{flexDirection:'column', backgroundColor:'white', paddingHorizontal:10,paddingTop:10}}>
{/* <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search for Orgs, Groups and Users to give access"/>
                </View> */}
<View style={{paddingHorizontal:10,paddingVertical:3}}>
<ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center'}}>
<View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ddd',paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
    <Image source={{uri:wrapUIMG(user.uimg)}} style={makeeventstyles.accessuserimg}/>
    <Text style={makeeventstyles.accessusername}>@{user.username}</Text>
    <TouchableOpacity>
        <Text style={makeeventstyles.accessremove}>x</Text>
    </TouchableOpacity>
</View>
<View style={{paddingHorizontal:5}}>
    <Pressable onPress={()=>openUserAccessSheet()}>

  
    <AddCircle variant='Broken' size={22} color='#a330d0'/>
    </Pressable>
</View>
</ScrollView>
</View>
<View style={{paddingVertical:20,paddingHorizontal:10}}>
<Text style={{fontSize:23,fontWeight:'600',color:'#000'}}>Event Details</Text>
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Title</Text>
        <TextInput style={!titleerror.status?makeeventstyles.forminput:makeeventstyles.forminpute} placeholder="Enter event name" value={title} onChangeText={(text)=>setTitle(text)}/>
        {
            titleerror.status?<Text style={makeeventstyles.formerrortext}>{titleerror.text}</Text>:null
        }
       
    </View>
   
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Duration</Text>
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        
        <View style={!startdateerror.status?makeeventstyles.forminputdate:makeeventstyles.forminputdatee}>
        <TextInput style={{width:'87%'}} placeholder="Start Date" value={startdate} onChangeText={(text)=>setStartDate(text)}/>
        <TouchableOpacity onPress={()=>openDateSheet('start')}>
        <Calendar2 color='#a330d0'/>
        </TouchableOpacity>

        </View>
        <View style={!endateerror.status?makeeventstyles.forminputdate:makeeventstyles.forminputdatee}>
        <TextInput style={{width:'87%'}} placeholder="End Date" value={enddate} onChangeText={(text)=>setEndDate(text)}/>
        <TouchableOpacity onPress={()=>openDateSheet('end')}>
        <Calendar2 color='#a330d0'/>
        </TouchableOpacity>

        </View>
 
        </View>
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        {
            startdateerror.status?<Text style={makeeventstyles.formerrortext}>{startdateerror.text}</Text>:null
        }
        {
            endateerror.status?<Text style={makeeventstyles.formerrortext}>{endateerror.text}</Text>:null
        }
        </View>
       
       
    </View>
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Description</Text>
        <TextInput style={[!descerror.status?makeeventstyles.forminput:makeeventstyles.forminpute,{height:200}]} multiline={true} placeholder="Enter Event Description" value={description} onChangeText={(text)=>setDescription(text)}/>
       {
            descerror.status?<Text style={makeeventstyles.formerrortext}>{descerror.text}</Text>:null
       }
    </View>
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Event Type</Text>
        <ScrollView horizontal={true} contentContainerStyle={{paddingVertical:5}} showsHorizontalScrollIndicator={false}>


        <View style={{flexDirection:"row",flexWrap:'wrap'}}>

            {
                eventtypes.map((eventtype,index)=>{
                    return (

                  
                    <TouchableOpacity key={index} style={activeEventType==eventtype.name?makeeventstyles.eventtypea:makeeventstyles.eventtype} onPress={()=>setActiveEventType(eventtype.name)}>
                        <Text style={activeEventType==eventtype.name?makeeventstyles.eventtypetexta:makeeventstyles.eventtypetext}>{eventtype.name}</Text>
                    </TouchableOpacity>
                      )
                })
            }
      
        </View>
        </ScrollView>

       
       
    </View>
 
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Location</Text>
        <TouchableOpacity
        onPress={()=>openLocationSheet()}
        >


        <MapView
        style={{width:'100%',height:200,borderRadius:10}}
  initialRegion={
    region 
  }
>

<Marker draggable
style={{
    width: 50,
}}
    coordinate={location}
    onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
  />
</MapView>
</TouchableOpacity>
        {/* <TextInput style={makeeventstyles.forminput} placeholder="Enter location"/> */}
       
    </View>
    <AddUserAccessSheet bottomSheet={AddUserAccessSheetref}/>
    <LocationMapSheet bottomSheet={maprefsheet} location={location} setLocation={setLocation} region={region}/>
    <DateBottomSheet bottomSheet={datebottomsheet} setSelectedDate={setDateType}/>
 

</View>




     
     
        </View>
        </ScrollView>
        <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn} onPress={()=>sendEvent()}>
                <Text style={makeeventstyles.createeventbtntext}>Create Event</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
  </BottomSheet>
    )

}

const makeeventstyles = StyleSheet.create({
    formgrp:{
        paddingVertical:10,
     
        
    },
    formtext:{
        fontSize:16,
        fontWeight:'400',
        color:'#000',
        marginBottom:10
    },
    forminput:{
        fontSize:16,
        fontWeight:'300',
        backgroundColor:'#eee',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ccc'

    },
    forminpute:{
        fontSize:16,
        fontWeight:'300',
        backgroundColor:'#eee',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        borderStyle:'solid',
        borderWidth:0.5,
        borderColor:'#FF0000'

    },
    forminputdate:{
        fontSize:16,
        fontWeight:'300',
        backgroundColor:'#eee',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'48%',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ccc'

    },
    forminputdatee:{
        fontSize:16,
        fontWeight:'300',
        backgroundColor:'#eee',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'48%',
        borderStyle:'solid',
        borderWidth:0.5,
        borderColor:'#FF0000'

    },
    formerrortext:{
        color:'#FF0000',
        fontSize:12,
        marginTop:3
    },
    accessuserimg:{

        width:20,
        height:20,
        borderRadius:100
    },
    accessusername:{
        fontSize:13,
        fontWeight:'400',
        marginLeft:5,
        color:'#333'

    },
    accessremove:{
        fontSize:12,
        fontWeight:'600',
        marginLeft:8,
        color:'#aaa'
    },
    eventtypetext:{
        fontSize:16,
        fontWeight:'500',
        color:'#a330d0'
    

    },
    eventtypetexta:{
        fontSize:16,
        fontWeight:'500',
        color:'white'
    

    },
    eventtype:{
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:30,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#a330d0',
        marginRight:6,
        marginBottom:10


    }
    ,eventtypea:{
        backgroundColor:'#a330d0',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:30,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#a330d0',
        marginRight:6,
        marginBottom:10
    },
    createeventbtn:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#a330d0',
        borderRadius:30,
        width:'80%'
    },
    createeventbtntext:{
        color:'white',
        fontSize:16,
        fontWeight:600
    }, 

})


export { makeeventstyles}