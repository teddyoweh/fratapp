import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { useRoute } from '@react-navigation/native';

import MessagesScreen from './Messages';
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
      <HomeStack.Screen name="MessagesScreen" component={MessagesScreen}

           options={{ navigationBarHidden:true,hideNavigationBar:false }}
      />

      <HomeStack.Screen name="PostPage" component={PostPage}/>
    </HomeStack.Navigator>
 
 
  );
}



export default HomeStacks