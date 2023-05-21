import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
import OrgPage from './OrgPage';
import { HomeStack } from '../../Home';

 
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
      

       

    
    </OrgStack.Navigator>
 
 
  );
}
 


export default OrgPageStacks