import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles,discoverstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion,SearchNormal} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

export default function DiscoverScreen(){
    const [filters,setFilters]=useState(['All','Universities','Organizations','Fraternities','Sororities','People'])
    const [activeFilter,setActiveFilter]=useState('All')
    return (
        <View style={discoverstyles.container}>
           <View style={discoverstyles.top}>
                <Text style={discoverstyles.title}>Discover</Text>
                <View style={discoverstyles.searchbox}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}placeholder="Search Universitys Organizations, Fratenities, Sororities"/>
                </View>
           </View>
           <View style={[profilestyles.postfilters,{marginTop:4, marginBottom:0}]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>


                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity style={activeFilter==filter?profilestyles.postfiltera:profilestyles.postfilter} onPress={()=>setActiveFilter(filter)}>
                                <Text style={activeFilter==filter?profilestyles.postfiltertxta:profilestyles.postfiltertxt}>
                                   {filter}</Text>
                               </TouchableOpacity>
                            )
                        })
                    }
                  
                  </ScrollView>
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