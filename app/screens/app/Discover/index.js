import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from './Discover';
import ProfilesScreen from './Profiles';
const HomeStack = createStackNavigator();

function DiscoverStacks() {
  return (
    <HomeStack.Navigator
    screenOptions={
        {
            headerShown:false,
        }
    }
    >


      <HomeStack.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <HomeStack.Screen name="ProfilesScreen" component={ProfilesScreen}/>
    </HomeStack.Navigator>
 
 
  );
}



export default DiscoverStacks