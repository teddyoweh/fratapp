import React from "react";
import { View,Text, TextInput,Image } from "react-native";
import { discoverstyles } from "../../../styles/discoverstyles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,SearchNormal, SearchNormal1} from 'iconsax-react-native';

export default function DiscoverScreen(){
    return (
        <View style={discoverstyles.container}>
           <View style={discoverstyles.top}>
                <Text style={discoverstyles.title}>Discover</Text>
                <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search Universitys Organizations, Fratenities, Sororities"/>
                </View>
           </View>
           <View style={discoverstyles.content}>
            {/* <Text style={discoverstyles.contentheader}>
                Nearby
            </Text> */}
                <View style={discoverstyles.results}>
                    <View style={discoverstyles.result}>
                        <Image source={require('../../../assets/farmhouse.png')} style={discoverstyles.resultlogo}/>
                        <View style={discoverstyles.resultinfo}>
                            <Text style={discoverstyles.resultname}>FarmHouse (FH)</Text>
                            <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text>
                        </View> 
                    </View>
                    <View style={discoverstyles.result}>
                        <Image source={require('../../../assets/lambda.png')} style={discoverstyles.resultlogo}/>
                        <View style={discoverstyles.resultinfo}>
                            <Text style={discoverstyles.resultname}>Lambda Chi Alpha (AXA)</Text>
                            <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text>
                        </View> 
                    </View>
                    <View style={discoverstyles.result}>
                        <Image source={require('../../../assets/kappasigma.png')} style={discoverstyles.resultlogo}/>
                        <View style={discoverstyles.resultinfo}>
                            <Text style={discoverstyles.resultname}>Kappa Sigma (ΚΣ)</Text>
                            <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text>
                        </View> 
                    </View>
                    <View style={discoverstyles.result}>
                        <Image source={require('../../../assets/agr.png')} style={discoverstyles.resultlogo}/>
                        <View style={discoverstyles.resultinfo}>
                            <Text style={discoverstyles.resultname}>Alpha Gamma Rho (ΑΓΡ)</Text>
                            <Text style={discoverstyles.resultaddress}> - Tarleton State University</Text>
                        </View> 
                    </View>
                </View>

           </View>
        </View>
    )
}