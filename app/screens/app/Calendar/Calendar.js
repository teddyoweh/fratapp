import { useLayoutEffect,useState,useEffect,useRef, useContext,useCallback} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import { useRoute } from '@react-navigation/native';
import {View,Text,Image,FlatList,ScrollView,Dimensions ,RefreshControl, TouchableOpacity, Pressable} from 'react-native'
import { calendarstyles } from '../../../styles';
import { CalendarAdd, CalendarTick, Clock } from 'iconsax-react-native';
import MakeEvent from './MakeEvent';
import axios from 'axios';
import MapView,{Marker} from 'react-native-maps';
import { wrapUIMG } from '../../../utils/utils';
import { endpoints } from '../../../config/endpoints';
import { AppContext } from '../../../context/appContext';
import { color_scheme } from '../../../config/color_scheme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const RenderDateStatus = ({ calendardata, month, currentDay }) => {
  const hasStarts = calendardata[month] && calendardata[month][currentDay] && calendardata[month][currentDay].no_starts > 0;
  const hasEnds = calendardata[month] && calendardata[month][currentDay] && calendardata[month][currentDay].no_ends > 0;

  if (hasStarts && hasEnds) {
    return <ActiveBothEvent />;
  } else if (hasStarts && !hasEnds) {
    return <ActiveStartEvent />;
  } else if (!hasStarts && hasEnds) {
    return <ActiveEndEvent />;
  } else {
    return <View />;
  }
};

const monthsvar = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  const monthMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };
  function getNumberSuffix(number) {
    var suffix = "th";
    var lastTwoDigits = number % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      suffix = "th";
    } else {
      var lastDigit = number % 10;
  
      switch (lastDigit) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
      }
    }
  
    return suffix;
  }
  
  function getCurrentDate() {
    const date = new Date();
    const currentDate = {
      day: date.getDate(),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
    };
    return currentDate;
  }
  function convertToDateTime(currentDate) {
   
    const { day, month, year } = currentDate;
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };
    const monthNumber = monthMap[month];
    const date = new Date(year, monthNumber - 1, day);
 
    return date;
  }
  
  function ActiveStartEvent(){
    return(
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{height:6,width:6,borderRadius:10,backgroundColor:'#a330d0'}}></View>
 
      </View>
    )
  }
  function ActiveEndEvent(){
    return(
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{height:6,width:6,borderRadius:10,backgroundColor:'#ef9766'}}></View>
 
      </View>
    )
  }
  function ActiveBothEvent(){
    return(
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{height:6,width:6,borderRadius:10,backgroundColor:'#a330d0'}}></View>
        <View style={{height:6,width:6,borderRadius:10,backgroundColor:'#ef9766'}}></View>
 
      </View>
    )
  }

  export default function CalendarScreen() {

    const [refreshing, setRefreshing] =useState(false);

    const eventBottomSheet = useRef()
    function showEventMaker(){
      eventBottomSheet.current.show()
    }
    const currentDate = getCurrentDate();

    const [months, setMonths] = useState(Object.keys(monthsvar));
    const [activeDates, setActiveDates] = useState(getCurrentDate());
    const [activeMonth, setActiveMonth] = useState(getCurrentDate()['month']);
    const [activeDay, setActiveDay] = useState(getCurrentDate()['day']);
    const [activeYear,setActiveYear] = useState(getCurrentDate().year)

    const monthscrollRef = useRef();
 
    const {user,colorMode}= useContext(AppContext)
    const scrollToCurrentMonth = () => {
      const currentMonthIndex = Object.keys(monthsvar).indexOf(activeMonth);
      monthscrollRef.current.scrollToIndex({ index: currentMonthIndex });
    };
    const isCurrentMonth = (month) => {
      return month === activeMonth;
    };
  
    function getDayOfWeek(month, year, day) {
      const date = new Date(year, month - 1, day); // Months are zero-based in JavaScript (0-11)
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
      const dayOfWeek = daysOfWeek[date.getDay()];
    
      return dayOfWeek;
    }
    function getDayOfWeekfull(month, year, day) {
      const date = new Date(year, month - 1, day); // Months are zero-based in JavaScript (0-11)
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[date.getDay()];
    
      return dayOfWeek;
    }
 
    const [calendardata,setCalendarData] =useState(null)

    async function getCalendar(){
      await axios.post(endpoints['getcalendar'],{userid:user.userid}).then(res=>{
        setCalendarData(res.data)
      })
    }
    const isactiveday = (day,month,year) =>{
      if(month == activeDates.month &&  year == activeDates.year && day== activeDates.day){
        return true
      }
      else{
        return false
      }
    }
    
    const scrollRef = useRef(null);
    useEffect(() => {
      const scrollToActiveMonth = () => {
        if (scrollRef.current) {
          const activeMonthIndex = months.indexOf(activeMonth);
          const scrollX = activeMonthIndex * (SCREEN_WIDTH -300);
          scrollRef.current.scrollTo({ x: scrollX, animated: false });
        }
      };
  
      scrollToActiveMonth();
    }, [activeMonth, scrollRef]);
    const LoadCalender=()=>{
      getCalendar()
      getCalendarEvents(activeDates)

    }
    const onRefresh = useCallback(() => {
      setRefreshing(true);
   LoadCalender()
      setTimeout(() => {
        setRefreshing(false);
    
      }, 2000);
    }, []);

    const [calendarevents,setCalendarEvent] = useState(null)

    async function getCalendarEvents(date){
      await axios.post(endpoints['getcalendarevents'],{userid:user.userid,date:convertToDateTime(date)}).then(res=>{
        setCalendarEvent(res.data)
      })
    }
  
    useEffect(()=>{
      LoadCalender()
    
 
    },[])
    function changeDay(currentDay,month,dayOfWeek,year){
      setActiveDay(currentDay)
      setActiveMonth(month)
      setActiveYear(year)
      setActiveDates({day:currentDay,month:month,year:year})
      getCalendarEvents({day:currentDay,month:month,year:year})
    }
    return (
      calendardata &&
      <View
      style={[calendarstyles.container,{
        backgroundColor:color_scheme(colorMode,'white')
      }]}
    >
  
        <View style={calendarstyles.top}>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:30,alignItems:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={{fontSize:26,fontWeight:'bold',color:color_scheme(colorMode,'black')}}>{activeMonth}</Text>
              <Text style={{marginLeft:3, fontSize:24,color:'grey',fontWeight:'bold'}}>{activeDates['year']}</Text>
            </View>
            <TouchableOpacity onPress={()=>showEventMaker()}>

  
            <CalendarAdd variant='Bulk' color='#a330d0'/>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={calendarstyles.monthscroll}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={scrollRef}

          >
        {[currentDate.month].map((month) => {
  const monthIndex = Object.keys(monthsvar).indexOf(month) + 1;
  const monthDays = monthsvar[month];
  //Object.keys(monthsvar)[Object.keys(monthsvar).indexOf(currentDate.month)+1]

  return Array.from({ length: monthDays }, (_, day) => {
    const currentDay = day + 1;
    const dayOfWeek = getDayOfWeek(monthIndex, 2023, currentDay);
    const isActive = isactiveday(currentDay, month, activeYear);
    const dayStyle = isActive ? calendarstyles.day : calendarstyles.day1;
    const dayTextStyle = isActive ? calendarstyles.daytext : calendarstyles.daytext1;
 
    return (
      <TouchableOpacity>
        <View style={[dayStyle,{ marginHorizontal: 10, flexDirection: 'column', alignItems: 'center' }]}>
          <Text style={{ fontSize: 12, fontWeight: 500,color:color_scheme(colorMode,'gray') }}>
            {dayOfWeek[0]}
          </Text>
          <Pressable
            // style={dayStyle}
            onPress={() => {
              changeDay(currentDay,month,dayOfWeek,activeDates['year'])
          
            }}
          >
            <Text style={dayTextStyle}>
              {currentDay}
            </Text>
          </Pressable>
         <RenderDateStatus  calendardata={calendardata} month={month} currentDay={currentDay} />

        </View>
      </TouchableOpacity>
    );
  });
})
}
        
          </ScrollView>
         

     
 
     
        </View>
        <View style={{height:'100%',flex:1}}>

  
        <ScrollView
      contentContainerStyle={{paddingVertical:35,backgroundColor:color_scheme(colorMode,'white')}}
      
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={{paddingHorizontal:10,paddingBottom:15}}>
          <Text style={{fontSize:16,fontWeight:600, color:color_scheme(colorMode,'#333')}}>
          {getDayOfWeekfull(Object.keys(monthsvar).indexOf(activeMonth) + 1,2023,activeDay) } {activeDay}<Text style={{fontSize:13}}>
          {getNumberSuffix(activeDay)}
            </Text> {activeMonth} {activeYear}
          </Text>
        </View>
        {
         calendarevents && calendarevents.length ==0?
          <View style={{height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{
              flexDirection:'row',
              alignItems:'center'
            }}
          
            >
              <CalendarTick color='#a330d0' variant='Bulk' size={23} />
<Text style={{fontSize:24,fontWeight:'bold', marginLeft:10, color:'#a330d0',textAlign:'center'}}>No Events</Text>
</View>
          </View>:
       
          <View>
            {
              calendarevents && calendarevents.map((item,index)=>{
                function getColor(currentDate, startDate1, endDate1) {
                  
                  const startDate = new Date(startDate1);
                  const endDate = new Date(endDate1);
                  const currentDateFormatted = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                  const startDateFormatted = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`;
                  const endDateFormatted = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
                
                  if (currentDateFormatted === startDateFormatted && currentDateFormatted === endDateFormatted) {
              
                    return '#b0f3ab';  
                  } 
                 
                  if (currentDateFormatted === startDateFormatted) {
                   
                  
                    
                    return '#f4d7ff8a';  
                 
                  }
                  if (currentDateFormatted === endDateFormatted) {
                  
                    return '#fededed4'; 
                  }
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
                
              const region = getRegionWithRadius(item.eventlocation.latitude,item.eventlocation.longitude)
                const bodycolor = getColor(convertToDateTime(activeDates), item.startdate,item.enddate)
                return (
                  <>
                     <View style={{width:'100%', borderTopLeftRadius:20,borderBottomLeftRadius:20,paddingHorizontal:20,paddingVertical:5,marginBottom:20, borderStyle:'solid',borderColor:'#ccc', 
                //  ,elevation: 10,
                //  shadowColor: '#777',
                //  shadowOffset: { width: 0, height: 12 },
                //  shadowOpacity: 0.35,
                //  shadowRadius: 18,
                 flexDirection:'column',
                 justifyContent:'space-between',
                 //backgroundColor:'white'
                }}>
                  <View style={{width:'100%', 
                //  ,elevation: 10,
                //  shadowColor: '#777',
                //  shadowOffset: { width: 0, height: 12 },
                //  shadowOpacity: 0.35,
                //  shadowRadius: 18,
                 flexDirection:'row',
                 justifyContent:'space-between',
                 //backgroundColor:'white'
                }}> 
                <View style={{width:'72%'}}>

             
                    <Text style={{fontSize:20,fontWeight:500,color:'#a330d0',textTransform:"capitalize"}}>
                      {
                        item.eventname
                      }
                      
                    </Text>
                    <View style={{paddingTop:5,flexDirection:'row', flex:1,alignItems:'center'}}>
                      <View style={{flexDirection:'column',alignItems:'center',marginBottom:10}}>
                        <View style={calendarstyles.startdot}/>
                        <View style={calendarstyles.line}/>
                        <View style={calendarstyles.enddot}/>
                      </View>
                      <View style={{flexDirection:'column',alignItems:'center',marginBottom:10}}>
                  
                        <Text style={{color:'#aaa',paddingLeft:5,fontSize:13,marginBottom:4}}>
                          {/*item.startdate*/}
                          5th May 2023 | 9am

                        </Text>
                        <Text style={{color:'#aaa',paddingLeft:5,fontSize:13}}>
                          {/*item.startdate*/}
                          5th May 2023 | 9am

                        </Text>
                      </View>
               
                      </View>
                   
                      
                    </View>
          <View style={{paddingRight:15}}>


        <MapView
        style={{width:90,height:90,borderRadius:10,borderStyle:'solid',borderColor:'#ccc',borderWidth:0.3 }}
        initialRegion={
            region 
            }
          >
          
          <Marker draggable
          style={{
              width: 50,
          }}
              coordinate={item.eventlocation}
              
            />
          </MapView>
          </View>
                    </View>
                    <View style={{paddingTop:10}}>
                      
                      <Text style={{fontSize:15,fontWeight:400,color:'#333',width:'100%'}}>
                        {
                          item.eventdescription
                        }
                      </Text>
                    </View>
                    <View
                    style={{width:'100%',alignItems:'flex-end'}}>


                    <View style= {{paddingTop:10,flexDirection:'row'}}>
                        {[1,4,3].map((keys,index)=>{
                          return (
                            <Image key={index} source={{uri:wrapUIMG(user.uimg)}} style={{height:20,width:20,borderRadius:100,position:'relative',right:9*index}}/>

                          )
                        }) }
 

                    </View>
                    </View>
                    </View>
                        {
                          
                          <View style={{width:'100%',height:1.6,backgroundColor:'#eee',marginBottom:20}}></View>
                        }
                    </>

                )
            })}
          </View>
           }
        </ScrollView>
        </View>
        <MakeEvent eventBottomSheet={eventBottomSheet} />
      </View>
    );
  }