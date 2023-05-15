import React from "react";
import { View,Text,StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home,Home2,Home3,SafeHome,Discover,Activity, LocationDiscover,Calendar,Profile,Notification1, Global, Bubble, Calendar2} from 'iconsax-react-native';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeStacks from "./Home";
import DiscoverStacks from "./Discover";
import CalendarStacks from "./Calendar";
import ProfileStacks from "./Profile";
import MessagesScreen from "./Messages";
import OrgStacks from "./Orgs";
const AppTab = createBottomTabNavigator()  
const AppStack = createStackNavigator()

 function AppScreen(){
    return (
       
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
                  ?<Global color="black" variant="Bold" size={30} />

                  : <Global color="grey" variant="Broken" size={30} />
                  return   iconName

              } else if (route.name === 'Discover') {
                iconName = focused
                  ?<LocationDiscover color="black" variant="Bold" size={30} />

                  : <LocationDiscover color="grey" variant="Broken" size={30} />
                  return   iconName
              }
              else if (route.name === 'Calendar') {
                iconName = focused
                  ?<Calendar2 color="black" variant="Bold" size={30} />

                  : <Calendar2 color="grey" variant="Broken" size={30} />
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
                  ?             <Activity color="black" variant="Bulk" size={30} />

                  : 
                  
                  <Activity color="grey" variant="Linear" size={30} />
                  return   iconName
                  
              }
              else if (route.name === 'Orgs') {
          

                iconName = focused
                  ?             <Bubble color="black" variant="Bulk" size={30} />

                  : 
                  
                  <Bubble color="grey" variant="Linear" size={30} />
                  return   iconName
                  
              }
              
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
   
            
          })}
        >
          <AppTab.Screen name="Home" component={HomeStacks} />
          <AppTab.Screen name="Discover" component={DiscoverStacks} />
          <AppTab.Screen name="Orgs" component={OrgStacks} />
          <AppTab.Screen name="Calendar" component={CalendarStacks} 
          options={{
            tabBarBadge:10,
            tabBarBadgeStyle:{
              backgroundColor:'#a330d0'
            }
          }}
          />
                  
          {/* <AppTab.Screen name="Notification" component={SafeHome} options={{
                  tabBarBadge:1,
                  tabBarBadgeStyle:{
                    backgroundColor:'#a330d0'
                  }

          }} /> */}

          <AppTab.Screen name="Profile" component={ProfileStacks} />
         
        </AppTab.Navigator>
 
    )
}
 

 
 
export default function AppScreens(){
  return (


  <NavigationContainer>
      <AppStack.Navigator
      
      screenOptions={
        { 
            headerShown:false,
        }
    }>


    <AppStack.Screen name='AppScreen' component={AppScreen}/>
    <AppStack.Screen name='MessagesScreen' component={MessagesScreen}/>
    </AppStack.Navigator>
  </NavigationContainer>
  )

}