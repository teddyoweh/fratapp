import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './Calendar';
import { useRoute } from '@react-navigation/native';


const Calendar = createStackNavigator()

function CalendarStacks({navigation,route}) {

  return (
    <Calendar.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >


      <Calendar.Screen name="CalendarScreen" component={CalendarScreen} />
   
 
    </Calendar.Navigator>
 
 
  );
}



export default CalendarStacks