import React from "react";
import { SafeAreaView } from "react-native";
import AuthScreens from "./auth";
import AppScreens from "./app";
export default function Screens(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <AppScreens />
        </SafeAreaView>
    )
}