import React,{useContext, useState,useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,authstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Notification1, Notification, Gallery, Location} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import { color_scheme } from "../../../config/color_scheme";
import * as Notifications from 'expo-notifications';
import * as Locationx from 'expo-location';  
import * as MediaLibrary from 'expo-media-library';


 
function AllowPage({ navigation, route }) {
    const { colorMode } = useContext(AppContext);
    const { type } = route.params;

    const handleAllow = async () => {
        switch (type) {
            case 'notification':
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Notification permission not granted');
                } else {
                    navigation.navigate('RegisterStack');
                }
                break;
            case 'location':
                const { status: locationStatus } = await Locationx.requestForegroundPermissionsAsync();
                if (locationStatus !== 'granted') {
                    console.log('Location permission not granted');
                } else {
                    try {
                        const { coords } = await Locationx.getCurrentPositionAsync({});
                        console.log('User location:', coords);
                        // Perform any necessary actions with user's location
                    } catch (error) {
                        console.log('Error getting user location:', error);
                    }
                }
                break;
            case 'gallery':
                const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
                if (mediaStatus !== 'granted') {
                    console.log('Gallery permission not granted');
                } else {
                    try {
                        const { status } = await MediaLibrary.getPermissionsAsync();
                        if (status === 'granted') {
                            // Perform actions using the MediaLibrary module
                            const mediaAssets = await MediaLibrary.getAssetsAsync();
                            console.log('Media assets:', mediaAssets);
                        }
                    } catch (error) {
                        console.log('Error getting gallery permissions:', error);
                    }
                }
                break;
            default:
                // Handle unknown type
                break;
        }
    };
    
    // Call the handleAllow function whenever needed
    handleAllow();
    

    const handleNotNow = () => {
        switch (type) {
            case 'notification':
                navigation.navigate('LoginStack');
                break;
            case 'location':
                // Handle not now for location access
                break;
            case 'gallery':
                // Handle not now for gallery access
                break;
            default:
                // Handle unknown type
                break;
        }
    }

    return (
        <View style={[authstyles.container, { backgroundColor: color_scheme(colorMode, 'white') }]}>
            <View style={authstyles.logobox}>
                {type === 'notification' && <Notification color="white" size={150} />}
                {type === 'gallery' && <Gallery color="white" variant="Bold" size={150} />}
                {type === 'location' && <Location color="white" variant="Bold" size={150} />}
                <Text
                    style={{
                        color: '#ddd',
                        marginHorizontal: 20,
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 50,
                    }}
                >
                    Enable to receive { type === 'location' ? 'location' :
  type === 'notifications' ? 'notifications' :
  'gallery'
} access
                </Text>
            </View>
            <View style={authstyles.btnsbox}>
                <TouchableOpacity style={authstyles.landingbtn} onPress={handleAllow}>
                    <Text style={authstyles.landingbtntxt}>Allow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={authstyles.landingbtn1} onPress={handleNotNow}>
                    <Text style={authstyles.landingbtntxt1}>Not Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
 


export default AllowPage;
