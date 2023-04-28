import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from './Discover';
import ProfilesScreen from '../Home/Profiles';
const DiscoverStack = createStackNavigator();

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