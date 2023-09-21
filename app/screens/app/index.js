import React, { useContext } from "react";
import { View,Text,StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home,Home2,Home3,SafeHome,Discover,Activity, LocationDiscover,Calendar,Profile,Notification1, Global, Bubble, Calendar2, SearchStatus, SearchNormal, SearchNormal1} from 'iconsax-react-native';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeStacks from "./Home";
import DiscoverStacks from "./Discover";
import CalendarStacks from "./Calendar";
import ProfileStacks from "./Profile";
import MessageStacks from "./Messages";
import OrgStacks from "./Orgs";
import OrgPageStacks from "./Orgs/OrgPage";
import { setupNotifications } from "../../config/setup";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { color_scheme } from "../../config/color_scheme";
import { AppContext } from "../../context/appContext";
import NotificationStacks from "./Notification";

const AppTab = createBottomTabNavigator()  
const AppStack = createStackNavigator()

 function AppScreen(){
  const {colorMode} = useContext(AppContext)

    return (
       
        <AppTab.Navigator
        
          screenOptions={({ route }) => ({
            tabBarStyle:{
              backgroundColor:  color_scheme(colorMode,'white'),
              borderStyle:'none',
          
             borderTopColor:color_scheme(colorMode,'#ddd'),
              borderWidth:0,
              
            },
            tabBarShowLabel: false,
           
            tabBarBackground: () => (
                <BlurView tint="dark" intensity={100}   />
              ),
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ?<Home2 color={  color_scheme(colorMode,'black')} variant="Bold" size={25} />

                  : <Home2  color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
                  return   iconName

              } else if (route.name === 'Discover') {
                iconName = focused
                  ?<SearchNormal1 color={  color_scheme(colorMode,'black')}variant="Bold" size={25} />

                  : <SearchNormal1 color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
                  return   iconName
              }
              else if (route.name === 'Calendar') {
                iconName = focused
                  ?<Calendar2 color={  color_scheme(colorMode,'black')}variant="Bold" size={25} />

                  : <Calendar2  color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
                  return   iconName
              }
              else if (route.name === 'Profile') {
                iconName = focused
                  ?<Profile color={  color_scheme(colorMode,'black')}variant="Bulk" size={25} />

                  : <Profile  color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
                  return   iconName
              }
  
              else if (route.name === 'Notification') {
          

                iconName = focused
                  ?             <Activity color={  color_scheme(colorMode,'black')}variant="Bulk" size={25} />

                  : 
                  
                  <Activity  color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
                  return   iconName
                  
              }
              else if (route.name === 'Orgs') {
          

                iconName = focused
                  ?             <Bubble color={  color_scheme(colorMode,'black')}variant="Bulk" size={25} />

                  : 
                  
                  <Bubble  color={color_scheme(colorMode,'#aaa')} variant="Bold" size={25} />
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
              backgroundColor:'#a330d0',
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
    <AppStack.Screen name='MessagesScreen' component={MessageStacks}/>
    <AppStack.Screen name='NotificationStacks' component={NotificationStacks}/>
    <AppStack.Screen name='OrgPageStacks' component={OrgPageStacks}/>

    </AppStack.Navigator>
  </NavigationContainer>
  )

}