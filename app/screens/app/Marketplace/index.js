import { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import { useRoute } from '@react-navigation/native';

import MarketPlaceScreen from './Marketplace';
const MarketPlaceStack = createStackNavigator()

function MarketPlaceStacks({navigation,route}) {

  return (
    <MarketPlaceStack.Navigator
    screenOptions={
        { 
            headerShown:false,
        }
    }
    
    >


      <MarketPlaceStack.Screen name="MarketplaceScreen" component={MarketPlaceScreen} />
 
    </MarketPlaceStack.Navigator>
 
 
  );
}



export default MarketPlaceStacks
 