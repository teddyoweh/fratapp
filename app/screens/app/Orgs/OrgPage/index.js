import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
import OrgPage from './OrgPage';
import { HomeStack } from '../../Home';
import MembersPage from './MembersPage';
import OrgChannel from './OrgChannel';
import StudyHoursStacks from '../StudyHours';
import NewCohort from './NewCohort';
const OrgStack = HomeStack

function OrgPageStacks({navigation,route}) {
  const {org} = route.params

  return (
    <OrgStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >

        <OrgStack.Screen name='OrgPage' component={OrgPage}
        initialParams={{org:org}}
        />
        <OrgStack.Screen name='MembersScreen' component={MembersPage}/>
        <OrgStack.Screen name='OrgChannelScreen' component={OrgChannel}/>
        <OrgStack.Screen name='StudyHourStack' component={StudyHoursStacks}/>
        <OrgStack.Screen name='NewCohort' component={NewCohort}/>


       

    
    </OrgStack.Navigator>
 
 
  );
}
 


export default OrgPageStacks
