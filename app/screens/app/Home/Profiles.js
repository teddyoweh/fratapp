import React,{useState,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, MessageText, DirectInbox} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import ProfilePosts from "../../../components/ProfilePosts";
import { wrapUIMG } from "../../../utils/utils";
import { color_scheme } from "../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
export default function ProfilesScreen({navigation,route}){
    const {user,colorMode} = useContext(AppContext)
    const [filters,setFilters]=useState(['All','Posts','Polls','Media','Info','Tagged'])
    const [activeFilter,setActiveFilter]=useState('All')
    const {userdetails} = route.params
    

    console.log(userdetails)
    return (
        <View style={[profilestyles.container,{
            backgroundColor:color_scheme(colorMode,'white')
        }]}>
            <View style={{
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                alignContent:'flex-start',
                paddingHorizontal:10,
                paddingVertical:10,
                paddingBottom:15,
                width:'100%'
            }}>
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
                        marginRight:10
                    }}
                    >
            <Ionicons name="chevron-back-outline" size={24} color={color_scheme(colorMode,'black')} />
            </TouchableOpacity>
        
            </View>
            <ScrollView>

    
                <View style={profilestyles.profilebox}>
                <View style={profilestyles.profileboxtop}>
                        <View style={profilestyles.profileimagesec}> 
                        <Image source={{uri:wrapUIMG(userdetails.uimg)}} style={profilestyles.profileimage}/>


                        </View>
                        <View style={profilestyles.profiledetailssec}>
                            <View
                            style={{
                                flexDirection:'column',
                       
                            }}
                            >

                            
                            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={[profilestyles.profilename,{
                                color:color_scheme(colorMode,'black')
                            }]}>{`${userdetails.firstname} ${userdetails.lastname}`}</Text>
                        <Text style={profilestyles.profileusername}>{`@${userdetails.username}`}</Text></View>
                        <View style={profilestyles.profilebio}>
                        <Text style={[profilestyles.profilebiotxt,{
                            color:color_scheme(colorMode,'black')
                        }]}>
                          {userdetails.bio}
                        </Text>
                    </View>
                        </View>
                        
                            {/* <View style={profilestyles.profilefollowers}>
                                <Text style={profilestyles.profilefollowersno}>
                                1,200 Links
                                </Text>
                                 
                  
                            
                        </View> */}
                        </View>


                    </View>
               
                    {/* <View style={profilestyles.profilebio}>
                        <Text style={[profilestyles.profilebiotxt,{
                            color:color_scheme(colorMode,'black')
                        }]}>
                          {userdetails.bio}
                        </Text>
                    </View>
              */}
                    
                    
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
                        <ProfileActionbtn userid={user.userid} partyid={userdetails.userid }/>

                 
                            <TouchableOpacity style={profilestyles.profilemsgbtn}
                            
                            onPress={()=>{
                                navigation.navigate('MessagesScreen',{
                        
                                    screen:'ChatStacks',
                                    params:{
                                        party_data:userdetails,
                                    }
                                })
                            }}
                            >
                                <DirectInbox variant="Bulk" color="#777"/>
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={profilestyles.profilecontent}>

                <View style={profilestyles.postfilters}>
                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity key={index}style={activeFilter==filter?[profilestyles.postfiltera,{borderColor:color_scheme(colorMode,'black')}]:profilestyles.postfilter} onPress={()=>setActiveFilter(filter)}>
                                <Text style={activeFilter==filter?[profilestyles.postfiltertxta,{color:color_scheme(colorMode,'black')}]:profilestyles.postfiltertxt}>
                                   {filter}</Text>
                               </TouchableOpacity>
                            )
                        })
                    }
                  
                     
                </View>
                    <View style={profilestyles.profileposts}>
                    <ProfilePosts  navigation={navigation} userid={userdetails.userid }/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}