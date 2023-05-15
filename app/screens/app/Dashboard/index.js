import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './Profile';
import PostPage from '../../../components/PostPage';
import EditProfile from './EditProfile';
import { useRoute } from '@react-navigation/native';
const ProfileStack = HomeStack

function ProfileStacks({navigation,route}) {

  return (
    <ProfileStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >
  
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="PostPage" component={PostPage}/>
      <ProfileStack.Screen name="EditProfile" component={EditProfile}/>
      <ProfileStack.Screen name='Settings' component={Settings}/>

    
    </ProfileStack.Navigator>
 
 
  );
}
 


export default ProfileStacks