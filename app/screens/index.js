import React from "react";
import { SafeAreaView } from "react-native";
import AuthScreen from "./auth";
import AppScreens from "./app";
import { NavigationContainer } from '@react-navigation/native';

function AuthScreens(){
    return (
        <NavigationContainer>
                        <AuthScreen/>
        </NavigationContainer>
    )
}
export default function Screens(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* <AppScreens /> */}
            <AuthScreens/>

        </SafeAreaView>
    )
}