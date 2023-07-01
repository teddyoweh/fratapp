import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { useRoute } from '@react-navigation/native';
import ProfilesScreen from './Profiles'
import ProfileStacks from '../Profile';
import PostPage from '../../../components/PostPage';
const HomeStack = createStackNavigator()

function HomeStacks({navigation,route}) {

  return (
    <HomeStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >


      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="PostPage" component={PostPage}/>
    
      <HomeStack.Screen name='ProfileStacks' component={ProfileStacks}/>
      <HomeStack.Screen  name="ProfilesScreen" component={ProfilesScreen}/>
    </HomeStack.Navigator>
 
 
  );
}



export default HomeStacks
export {HomeStack}