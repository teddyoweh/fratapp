import React,{useState,useContext}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,ActionSheetIOS, Alert} from "react-native";
import { homestyles,profilestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, Category2} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../components/PostsList";
import ProfileActionbtn from "../../../components/ProfileActionbtn";
import { AppContext } from "../../../context/appContext";
import ProfilePosts from "../../../components/ProfilePosts";
import { wrapUIMG } from "../../../utils/utils";
import { color_scheme } from "../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
import { endpoints } from "../../../config/endpoints";
import { clearData } from "../../../utils/storage";

import axios from "axios";
import { AuthContext } from "../../../context/authContext";
export default function ProfileScreen({navigation}){
    const {user,colorMode} = useContext(AppContext)
    const {setIsAuth} = useContext(AuthContext)
    const [filters,setFilters]=useState(['All','Posts','Polls','Media','Info','Tagged'])
    const [activeFilter,setActiveFilter]=useState('All')
    async function logtfout(){

        await clearData()
        setIsAuth(false)
    }
    function logOuT(){
        Alert.alert('Logout', `Are you sure you want to log out of  @${user.username}`, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Logout', 
            style:'destructive',
            onPress: () => logtfout()
            
        
        },
          ]);
      
    }
    function del_account(){
        Alert.alert('Delete Account', `Are you sure you want to delete your account?`, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Delete', 
            style:'destructive',
            onPress: () => delete_account()
            
        
        },
          ]);
    }
    async function delete_account(){
        await axios.post(endpoints['delete_account'],{
            userid:user.userid
        }).then( res=>{
 logtfout()
        })
    }
    const onSettingsPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Log Out","Delete Account", "Cancel"],

        cancelButtonIndex: 2,
        userInterfaceStyle: "dark",
        tintColor:'red',
        
        cancelButtonTintColor:"#fff"
      },
      buttonIndex => {
          if (buttonIndex === 0) {
            logOuT()
          }   
            else if (buttonIndex === 1) {
                del_account()
            } 
        else{
            return
        }
      },
    );
    return (
        <View style={[profilestyles.container,{
            backgroundColor:color_scheme(colorMode,'white')
        }]}>
            <View style={profilestyles.settingstop}>
                <TouchableOpacity style={profilestyles.settingstopitem} onPress={()=>{
                    onSettingsPress()
                }} >
                <EvilIcons name="gear" size={30} color={color_scheme(colorMode,'black')} />
                </TouchableOpacity>
            </View>
            <ScrollView>

    
                <View style={profilestyles.profilebox}>
                    <View style={profilestyles.profileboxtop}>
                        <View style={profilestyles.profileimagesec}> 
                        <Image source={{uri:wrapUIMG(user.uimg)}} style={profilestyles.profileimage}/>


                        </View>
                        <View style={profilestyles.profiledetailssec}>
                            <View
                            style={{
                                flexDirection:'column',
                       
                            }}
                            >

                            
                            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={[profilestyles.profilename,{
                                color:color_scheme(colorMode,'black')
                            }]}>{`${user.firstname} ${user.lastname}`}</Text>
                        <Text style={profilestyles.profileusername}>{`@${user.username}`}</Text></View>
                        <View style={profilestyles.profilebio}>
                        <Text style={[profilestyles.profilebiotxt,{
                            color:color_scheme(colorMode,'black')
                        }]}>
                          {user.bio}
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
                                <Category2 variant="Bulk" color="#a330d0"/>
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={profilestyles.profilecontent}>

                <View style={profilestyles.postfilters}>
                    {
                        filters.map((filter,index)=>{
                            return(
                                <TouchableOpacity key={index}style={activeFilter==filter?[profilestyles.postfiltera,{borderColor:color_scheme(colorMode,'black')}]:profilestyles.postfilter} onPress={()=>setActiveFilter(filter)}>
                                <Text style={activeFilter==filter?[profilestyles.postfiltertxta,{
                                    color:color_scheme(colorMode,'black')
                                }]:[profilestyles.postfiltertxt]}>
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