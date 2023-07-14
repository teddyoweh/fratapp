import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
 
import { HomeStack } from '../../Home';
import StudyHours from './StudyHours';
const StudyHourStack = HomeStack

function StudyHoursStacks({navigation,route}) {
  const {org} = route.params

  return (
    <StudyHourStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >

        <StudyHourStack.Screen name='StudyHoursScreen' component={OrgPage}
        initialParams={{org:org}}
        />
        <StudyHourStack.Screen name='MembersScreen' component={MembersPage}/>
        <StudyHourStack.Screen name='OrgChannelScreen' component={OrgChannel}/>

       

    
    </StudyHourStack.Navigator>
 
 
  );
}
 


export default StudyHoursStacks
