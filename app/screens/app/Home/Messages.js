import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { useRoute } from '@react-navigation/native';
import {View,Text} from 'react-native'
export default function MessagesScreen({navigation,route}){
    const rou = useRoute()
    useLayoutEffect(() => {
      // const routeName = getFocusedRouteNameFromRoute(route);
      console.log(rou)
      if (rou.name === "MessagesScreen"){
        console.log('ss')
          navigation.setOptions({     tabBarBadge:1,} );

      }else {
          navigation.setOptions({     tabBarBadge:1,});
      }
  }, [navigation, route]);
    return (
        <View>
            <Text>
                {'This is the Auth Screens'}
            </Text>
        </View>
    )
}