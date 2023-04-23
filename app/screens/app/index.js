import React from "react";
import { View,Text,StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home,Home2,Home3,SafeHome,Discover,LocationDiscover,Calendar,Profile,Notification1} from 'iconsax-react-native';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeStacks from "./Home";
import DiscoverStacks from "./Discover";
import CalendarStacks from "./Calendar";
import ProfileStacks from "./Profile";
const AppTab = createBottomTabNavigator()  
export default function AppScreens(){
    return (
        <NavigationContainer>
        <AppTab.Navigator
        
          screenOptions={({ route }) => ({
            tabBarStyle:{
              backgroundColor:'white',
              borderStyle:'none',
              borderWidth:0,
              
            },
            tabBarBackground: () => (
                <BlurView tint="light" intensity={10} style={StyleSheet.absoluteFill} />
              ),
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ?<Home2 color="black" variant="Bulk" size={30} />

                  : <Home2 color="grey" variant="Linear" size={30} />
                  return   iconName

              } else if (route.name === 'Discover') {
                iconName = focused
                  ?<LocationDiscover color="black" variant="Bulk" size={30} />

                  : <LocationDiscover color="grey" variant="Broken" size={30} />
                  return   iconName
              }
              else if (route.name === 'Calendar') {
                iconName = focused
                  ?<Calendar color="black" variant="Bulk" size={30} />

                  : <Calendar color="grey" variant="Broken" size={30} />
                  return   iconName
              }
              else if (route.name === 'Profile') {
                iconName = focused
                  ?<Profile color="black" variant="Bulk" size={30} />

                  : <Profile color="grey" variant="Broken" size={30} />
                  return   iconName
              }
  
              else if (route.name === 'Notification') {
          

                iconName = focused
                  ?             <Notification1 color="black" variant="Bulk" size={30} />

                  : 
                  
                  <Notification1 color="grey" variant="Linear" size={30} />
                  return   iconName
                  
              }
              
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
   
            
          })}
        >
          <AppTab.Screen name="Home" component={HomeStacks} />
          <AppTab.Screen name="Discover" component={DiscoverStacks} />
          <AppTab.Screen name="Calendar" component={CalendarStacks} 
          options={{
            tabBarBadge:10,
            tabBarBadgeStyle:{
              backgroundColor:'#a330d0'
            }
          }}
          />
          <AppTab.Screen name="Notification" component={SafeHome} options={{
                  tabBarBadge:1,
                  tabBarBadgeStyle:{
                    backgroundColor:'#a330d0'
                  }

          }} />
          <AppTab.Screen name="Profile" component={ProfileStacks} />
         
        </AppTab.Navigator>
      </NavigationContainer>
    )
}
 

 
 