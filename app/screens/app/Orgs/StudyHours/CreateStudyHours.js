
import { View,Text, Image,TouchableOpacity,Keyboard, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button, Pressable, Vibration, Dimensions} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, PictureFrame,Chart,Link21,VoiceCricle,Calendar,VolumeHigh,Briefcase,Send2, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add, DirectUp, ArrowUp, Microphone, Microphone2, Hashtag, ArrowRight2, Box2, Celo, Command, Notepad2, People, UserAdd, CalendarAdd, ArchiveBook, InfoCircle, More2, NoteAdd, ArrowLeft2} from 'iconsax-react-native';
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
import CircleProgress from "../../../../components/CIrcleProgress";
import * as Haptics from 'expo-haptics';
import { useHashMap } from "../../../../hooks/useHashMap";
import {Picker} from '@react-native-picker/picker';

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
        const dayOfWeek = new Date(year, month - 1, day).getDay();
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
export default function CreateStudyHours({navigation,route}){
    
    const {user,colorMode} = useContext(AppContext)
    const {orgid,orgdt,orgdata} = route.params
    const [users2, addToHashMap, removeFromHashMap] = useHashMap();
    const [access,setAcceess] = useState([])
    const [startdate,setStartDate] = useState('')
    const [enddate,setEndDate] = useState('')
    const [description,setDescription] =useState('')
    const [acceptedlocations,setAcceptedLocations] = useState([])
    const [activeDateType,setActiveDateType] = useState('start')
    const dateBottomSheet = useRef()
      
    function openDateSheet(type){
      
            Haptics.impactAsync('medium')
            setActiveDateType(type)
            dateBottomSheet.current.show()

    }
    async function makeStudyHours(){
        Haptics.impactAsync('medium')
        await axios.post(endpoints['create_studyhours'],{
          startdate,
          enddate  ,
          acceptedlocations,
          description,
          access,
          createdby:user.userid

        }).then()
    }
    function openAddUsersSheet(){
      
    }
    function openLocationSheet(){

    }
    return (
        <View
        style={{
            backgroundColor:color_scheme(colorMode,'white'),
            flex:1
        }}
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
            <ScrollView
            contentContainerStyle={{
                paddingHorizontal:10,
                paddingVertical:20
            }}
            >

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
                        <View style={makeeventstyles.formgrp
                        }>

                            
                             
<Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Members</Text>
                            <TouchableOpacity
                            onPress={()=>opeAddMemberSheet()}
                                  keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{   color:color_scheme(colorMode,'black'),  justifyContent:'space-between',flexDirection:'row',alignItems:'center',      backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} >
                                <Text
                                style={{
                                    color:color_scheme(colorMode,"gray"),
                                    fontSize:16,
                                    fontWeight:'300',
                                }}
                                >
                                    Add Members 
                                </Text>
                                <View
                                style={{
                                  flexDirection:'row',
                                  alignItems:'center'
                                }}
                                >
                                <View
                                style={{
                                  backgroundColor:'#a330d0',
                                  height:25,
                                  width:25,
                                  borderRadius:100,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'center'
                                }}
                                >
                                  <Text
                                  style={{
                                    color:color_scheme(colorMode,'black'),
                                    fontWeight:'600'
                                  }}
                                  >
                                    {access.length}
                                  </Text>
                                </View>
                                
                                <ArrowRight2 size="20" color={color_scheme(colorMode,"gray")}/>
                                </View>
                            </TouchableOpacity>
                           
                            <ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center',paddingVertical:3}}>
            {
                Object.values(users2).map((userx,index)=>{
                    
                    return (
<View key={index} style={{flexDirection:'row',alignItems:'center', backgroundColor:color_scheme(colorMode,'#eee'),marginRight:10,paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
    <Image source={{uri:wrapUIMG(userx.uimg)}} style={makeeventstyles.accessuserimg}/>
    <Text style={[makeeventstyles.accessusername,{color:color_scheme(colorMode,'black')}]}>@{userx.username}</Text>
    {
        userx.userid != user.userid &&
   
    <TouchableOpacity
    onPress={()=>removeUser(userx._id)}
    >
        <Text style={makeeventstyles.accessremove}>x</Text>
    </TouchableOpacity>
     }
</View>
                    )
                })
            }

 
</ScrollView>
                        </View>
                        <View style={makeeventstyles.formgrp
                        }>

                            
                             
<Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Approved Locations</Text>
                            <TouchableOpacity
                            onPress={()=>opeAddMemberSheet()}
                                  keyboardAppearance={colorMode}
                            style={[makeeventstyles.forminput,{    color:color_scheme(colorMode,'black'),  justifyContent:'space-between',flexDirection:'row',alignItems:'center',      backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} >
                                <Text
                                style={{
                                    color:color_scheme(colorMode,"gray"),
                                    fontSize:16,
                                    fontWeight:'300',
                                }}
                                >
                                Approved Locations
                                </Text>
                                <View
                                style={{
                                  flexDirection:'row',
                                  alignItems:'center'
                                }}
                                >
                                <View
                                style={{
                                  backgroundColor:'#a330d0',
                                  height:25,
                                  width:25,
                                  borderRadius:100,
                                  flexDirection:'row',
                                  alignItems:'center',
                                  justifyContent:'center'
                                }}
                                >
                                  <Text
                                  style={{
                                    color:color_scheme(colorMode,'black'),
                                    fontWeight:'600'
                                  }}
                                  >
                                    {access.length}
                                  </Text>
                                </View>
                                
                                <ArrowRight2 size="20" color={color_scheme(colorMode,"gray")}/>
                                </View>
                            </TouchableOpacity>
                           
                            <ScrollView horizontal={true} contentContainerStyle={{flexDirection:'row',alignItems:'center',paddingVertical:3}}>
            {
                Object.values(users2).map((userx,index)=>{
                    
                    return (
<View key={index} style={{flexDirection:'row',alignItems:'center', backgroundColor:color_scheme(colorMode,'#eee'),marginRight:10,paddingHorizontal:7,borderRadius:10,paddingVertical:5}}>
    <Image source={{uri:wrapUIMG(userx.uimg)}} style={makeeventstyles.accessuserimg}/>
    <Text style={[makeeventstyles.accessusername,{color:color_scheme(colorMode,'black')}]}>@{userx.username}</Text>
    {
        userx.userid != user.userid &&
   
    <TouchableOpacity
    onPress={()=>removeUser(userx._id)}
    >
        <Text style={makeeventstyles.accessremove}>x</Text>
    </TouchableOpacity>
     }
</View>
                    )
                })
            }

 
</ScrollView>
                        </View>
            </ScrollView>
            <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn} onPress={()=>makeStudyHours()}>
                <Text style={makeeventstyles.createeventbtntext}>Create StudyHours</Text>
            </TouchableOpacity>
            </View>
            <RenderDateBottomSheet dateBottomSheet={dateBottomSheet} type={activeDateType} setstartDate={setStartDate} startdate={startdate} setendDate={setEndDate} enddate={enddate} />
        </View>
    )
}