import { createStackNavigator } from '@react-navigation/stack';
import   OrgProfilesScreen from './OrgProfiles';
import { HomeStack } from '..'; 

const OrgProfileStack = HomeStack

function OrgProfileStacks({route}) {
  return (
    <OrgProfileStack.Navigator
    screenOptions={
        {
            headerShown:false,
        }
    }
    >


      <OrgProfileStack.Screen name="OrgProfilesScreen" initialParams={{...route.params}} component={OrgProfilesScreen} />
 
    </OrgProfileStack.Navigator>
 
 
  );
}



export default OrgProfileStacks