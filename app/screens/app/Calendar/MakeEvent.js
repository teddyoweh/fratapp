
import { useLayoutEffect,useState,useEffect,useRef,useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import { useRoute } from '@react-navigation/native';
import {View,Text,ScrollView, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet, Pressable} from 'react-native'
import { calendarstyles,discoverstyles } from '../../../styles';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { AppContext } from '../../../context/appContext';
import { Add, AddCircle, CalendarAdd,SearchNormal, } from 'iconsax-react-native'
import { Image } from 'react-native';
import { wrapUIMG } from '../../../utils/utils';

function AddUserAccessSheet({bottomSheet}){

    return (
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
    )
    
}
export default function MakeEvent({navigation,route,eventBottomSheet}){
    const {user} = useContext(AppContext)
    const AddUserAccessSheetref = useRef()
    function openUserAccessSheet(){
        AddUserAccessSheetref.current.show()
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
    
    const [activeEventType,setActiveEventType] = useState(null)
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
        <TextInput style={makeeventstyles.forminput} placeholder="Enter event name"/>
       
    </View>
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Location</Text>
        <TextInput style={makeeventstyles.forminput} placeholder="Enter event name"/>
       
    </View>
    <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Duration</Text>
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        <TextInput style={makeeventstyles.forminputdate} placeholder="Start Date"/>
        <TextInput style={makeeventstyles.forminputdate} placeholder="End Date"/>
        </View>
       
       
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
        <Text style={makeeventstyles.formtext}>Description</Text>
        <TextInput style={[makeeventstyles.forminput,{height:200}]} multiline={true} placeholder="Enter Event Descript"/>
       
    </View>
    <AddUserAccessSheet bottomSheet={AddUserAccessSheetref}/>

</View>




     
     
        </View>
        </ScrollView>
        <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn}>
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