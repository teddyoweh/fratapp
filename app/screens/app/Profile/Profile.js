import React,{useState,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import ProfilePosts from "../../../components/ProfilePosts";
import { wrapUIMG } from "../../../utils/utils";
export default function ProfileScreen({navigation}){
    const {user} = useContext(AppContext)
    const [filters,setFilters]=useState(['All','Posts','Polls','Media','Info','Tagged'])
    const [activeFilter,setActiveFilter]=useState('All')
    return (
        <View style={profilestyles.container}>
            <View style={profilestyles.settingstop}>
                <TouchableOpacity style={profilestyles.settingstopitem} >
                <EvilIcons name="gear" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>

    
                <View style={profilestyles.profilebox}>
                    <View style={profilestyles.profileboxtop}>
                        <View style={profilestyles.profileimagesec}> 
                        <Image source={{uri:wrapUIMG(user.uimg)}} style={profilestyles.profileimage}/>


                        </View>
                        <View style={profilestyles.profiledetailssec}>
                            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={profilestyles.profilename}>{`${user.firstname} ${user.lastname}`}</Text>
                        <Text style={profilestyles.profileusername}>{`@${user.username}`}</Text></View>
                        <View style={profilestyles.profilebio}>
                        <Text style={profilestyles.profilebiotxt}>
                          Software Engineer.
                        </Text>
                    </View>
                       
                        
                            {/* <View style={profilestyles.profilefollowers}>
                                <Text style={profilestyles.profilefollowersno}>
                                1,200 Links
                                </Text>
                                 
                  
                            
                        </View> */}
                        </View>


                    </View>
                   
                    <View style={profilestyles.profileorgs}>
                    <View style={profilestyles.profileorg}>
                            <Image source={require('../../../assets/tcs.png')} style={profilestyles. profileorglogo}/>
                                    <Text style={[profilestyles.profileorgtxt,{color:'#502d81'}]}>Tarleton Computer Society (TCS)</Text>
                        </View>
                        <View style={profilestyles.profileorg}>
                            <Image source={require('../../../assets/farmhouse.png')} style={profilestyles. profileorglogo}/>
                                    <Text style={profilestyles.profileorgtxt}>FarmHouse (FH)</Text>
                        </View>
                       
                    </View>
                    
                    
                    {/* <View style={profilestyles.profilesocials}>
                    <View style={profilestyles.profilesocial}>
                    <Entypo name="twitter" size={14} color="grey" />
                    <Text style={profilestyles.profilesocialtxt}>@teddyoweh</Text>
                    </View>
                    <View style={profilestyles.profilesocial}>
                    <Entypo name="instagram"  size={14} color="grey" />
                    <Text style={profilestyles.profilesocialtxt}>@teddyoweh</Text>
                    </View>
                    <View style={profilestyles.profilesocial}>
                    <Entypo name="linkedin"  size={14} color="grey" />
                    <Text style={profilestyles.profilesocialtxt}>Teddy Oweh</Text>
                    </View>
                    <View style={profilestyles.profilesocial}>
                    <Entypo name="link"  size={14} color="grey" />
                    <Text style={profilestyles.profilesocialtxt}>teddyoweh.net</Text>
                    </View>
                    <View style={profilestyles.profilesocial}>
                    <Ionicons name="ios-document-text" size={14} color="grey" />
                    <Text style={profilestyles.profilesocialtxt}>Resume</Text>
                    </View>
 
                    
                
        
                    </View> */}
                    <View style={profilestyles.profilebtns}>
                    <TouchableOpacity style={profilestyles.profilebtn} onPress={()=>navigation.navigate('EditProfile')}>
                                <Text style={profilestyles.profilebtntxt}>Edit Profile</Text>
            </TouchableOpacity>
                            <TouchableOpacity style={profilestyles.profilemsgbtn}>
                                <MessageText1 variant="Broken" color="#a330d0"/>
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={profilestyles.profilecontent}>

                <View style={profilestyles.postfilters}>
                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity key={index} style={activeFilter==filter?profilestyles.postfiltera:profilestyles.postfilter} onPress={()=>setActiveFilter(filter)}>
                                <Text style={activeFilter==filter?profilestyles.postfiltertxta:profilestyles.postfiltertxt}>
                                   {filter}</Text>
                               </TouchableOpacity>
                            )
                        })
                    }
                  
                     
                </View>
                    <View style={profilestyles.profileposts}>
                    <ProfilePosts  navigation={navigation}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}