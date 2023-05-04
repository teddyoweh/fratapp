import { useLayoutEffect,useState,useEffect,useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import { useRoute } from '@react-navigation/native';
import {View,Text,ScrollView, TouchableOpacity} from 'react-native'
import { calendarstyles } from '../../../styles';
import { CalendarAdd } from 'iconsax-react-native';
import MakeEvent from './MakeEvent';
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
  const daysn1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30]
  const daysn  =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30,31]
  const daysopt = {
    '30':daysn1,
    '31':daysn
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

  
  export default function CalendarScreen() {
    const eventBottomSheet = useRef()
    function showEventMaker(){
      eventBottomSheet.current.show()
    }
    const [months, setMonths] = useState(Object.keys(monthsvar));
    const [activeDates, setActiveDates] = useState(getCurrentDate());
    const [activeMonth, setActiveMonth] = useState(getCurrentDate()['month']);

    const [days,setDays] = useState(daysopt[`${monthsvar[activeMonth]}`])
    const [activeDay, setActiveDay] = useState(getCurrentDate()['day']);
    const monthscrollRef = useRef();
    const dayscrollRef = useRef();
   
    useEffect(() => {
      const activeMonthIndex = months.findIndex((month) => month === activeMonth);
      if (monthscrollRef.current && activeMonthIndex >= 0) {
        monthscrollRef.current.scrollTo({ x: activeMonthIndex * 200, y: 0, animated: true });
      }
    
    }, [activeMonth]);
 
  
    return (
      <View style={calendarstyles.container}>
        <View style={calendarstyles.top}>
          <View style={{flexDirection:'row',justifyContent:'flex-end',paddingBottom:10}}>
            <TouchableOpacity onPress={()=>showEventMaker()}>

  
            <CalendarAdd/>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={calendarstyles.monthscroll}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={monthscrollRef}
          >
            {months.map((month, i) => (
              <TouchableOpacity key={i} style={calendarstyles.month} onPress={()=>{setActiveMonth(month);setDays(daysopt[`${monthsvar[month]}`]);}}>
                <Text style={month === activeMonth ? calendarstyles.monthname : calendarstyles.monthname1}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View
 
            style={calendarstyles.dayscroll}
     
          >
            {days.map((day, i) => {
                return(
            
              <TouchableOpacity key={i} style={day === activeDay ? calendarstyles.day:calendarstyles.day1} onPress={()=>setActiveDay(day)}>
                <Text style={ day === activeDay ? calendarstyles.dayname : calendarstyles.dayname1}>
                  {day}
                </Text>
              </TouchableOpacity>
            )})}
          </View>
        </View>
        <View style={calendarstyles.bottom}>
          
        </View>
        <MakeEvent eventBottomSheet={eventBottomSheet} />
      </View>
    );
  }