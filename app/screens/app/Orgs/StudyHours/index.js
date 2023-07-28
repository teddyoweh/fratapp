import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
 
import { HomeStack } from '../../Home';
import StudyHours from './StudyHours';
import CreateStudyHours from './CreateStudyHours';
const StudyHourStack = HomeStack

function StudyHoursStacks({navigation,route}) {
  const {orgid,orgdt,orgdata,org} = route.params

  return (
    <StudyHourStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >

        <StudyHourStack.Screen name='StudyHoursScreen' component={StudyHours}
        initialParams={{orgid,orgdt,orgdata,org}}
        />
        <StudyHourStack.Screen name='CreateStudyHours' component={CreateStudyHours}/>
 

       

    
    </StudyHourStack.Navigator>
 
 
  );
}
 


export default StudyHoursStacks
