import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
import OrgHome from './Org';
import CreateOrgs from './CreateOrg';
import OrgPageStacks from './OrgPage';
import { HomeStack } from '../Home';

 
const OrgStack = HomeStack

function OrgStacks({navigation,route}) {

  return (
    <OrgStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >

        <OrgStack.Screen name="OrgHome" component={OrgHome} />
        <OrgStack.Screen name="CreateOrgs" component={CreateOrgs}/>
        {/* <OrgStack.Screen name='OrgStack' component={OrgPageStacks}/> */}

       

    
    </OrgStack.Navigator>
 
 
  );
}
 


export default OrgStacks