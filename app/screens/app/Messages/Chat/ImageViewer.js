import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, Animated,    RefreshControl, Pressable, KeyboardAvoidingView, Dimensions, Keyboard, TouchableWithoutFeedback} from "react-native";
import React,{ useState,useEffect,useLayoutEffect,useRef,  useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { messagestyles } from '../../../../styles/messagestyles';
import { discoverstyles } from "../../../../styles";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,FontAwesome} from '@expo/vector-icons';
import { Add, ArrowUp, Call, ChartCircle, MessageAdd, MessageAdd1, Microphone2, PenAdd,PictureFrame,SearchNormal, Video } from "iconsax-react-native";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import { AppContext } from "../../../../context/appContext";
import Spinner from "../../../../components/Spinner";
import { formatTime, removeExcessWhitespace, wrapPostImg, wrapUIMG } from "../../../../utils/utils";
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics'
import io from 'socket.io-client';
import { serverhost, serverip } from "../../../../config/ip";
import { schedulePushNotification } from "../../../../config/setup";
import { color_scheme } from "../../../../config/color_scheme";
import * as ImagePicker from 'expo-image-picker';
function scaleImageToScreen(imageWidth, imageHeight) {

    const maxWidth = Dimensions.get('screen').width  
    const maxHeight =  Dimensions.get('screen').height  

    // Calculate the aspect ratio of the image
    const imageAspectRatio = imageWidth / imageHeight;

    // Calculate the scaled dimensions
    let scaledWidth = maxWidth;
    let scaledHeight = maxWidth / imageAspectRatio;

    // Check if the scaled height exceeds the maximum height
    if (scaledHeight > maxHeight) {
    scaledHeight = maxHeight;
    scaledWidth = maxHeight * imageAspectRatio;
    }

    // Return the scaled dimensions as an object
    return { width: scaledWidth, height: scaledHeight };
    }
export default function DMMessageViewer({navigation,route}){
    const {img} = route.params
    const {colorMode} = useContext(AppContext)
    const {width,height} = scaleImageToScreen(img.width,img.height)

    return (
        <View
        style={{
            flexDirection:'column',
            flex:1,
            justifyContent:'center',

            backgroundColor:color_scheme(colorMode,'white')
        }}
        >
            <TouchableOpacity onPress={()=>{
                       Haptics.impactAsync('medium')
                        navigation.goBack()}}
                    style={{
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'center',
                        height:33,
                        width:33,
                        backgroundColor:'#222',
                        borderRadius:100,
                        marginRight:10,
                        position:'absolute',
                        top:5,
                        left:15
                    }}
                    >
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
                 
        <Image 
        source={{uri:wrapPostImg(img.uri)}}
        style={{
            width:width,
            height:height
        }}
        />
            

        </View>
    )
}