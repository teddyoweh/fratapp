import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from './Discover';
import ProfilesScreen from '../Home/Profiles';
import { HomeStack } from '../Home';
const DiscoverStack = HomeStack

function DiscoverStacks() {
  return (
    <DiscoverStack.Navigator
    screenOptions={
        {
            headerShown:false,
        }
    }
    >


      <DiscoverStack.Screen name="DiscoverScreen" component={DiscoverScreen} />
 
    </DiscoverStack.Navigator>
 
 
  );
}



export default DiscoverStacks