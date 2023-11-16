import React,{useState,useContext, useEffect}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,StyleSheet} from "react-native";
import { homestyles,profilestyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Profile, MessageText1, CloudLightning, MessageAdd, MessageQuestion, MessageText, DirectInbox} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons,EvilIcons,Entypo} from '@expo/vector-icons';

import PostsList from "../../../../components/PostsList";
import ProfileActionbtn from "../../../../components/ProfileActionbtn";
import { AppContext } from "../../../../context/appContext";
import ProfilePosts from "../../../../components/ProfilePosts";
import { wrapUIMG } from "../../../../utils/utils";
import { color_scheme } from "../../../../config/color_scheme";
import * as Haptics from 'expo-haptics'
import JoinActionbtn from "../../../../components/JoinActionbtn";
import FollowingOrgBtn from "../../../../components/FollowingOrg";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import * as Animatable from 'react-native-animatable';
import { RefreshControl } from "react-native-gesture-handler";

const LoadingSkeleton = () => {
    return (
      <Animatable.View
        animation="fadeIn"
     
        duration={800}
        style={[styles.loadingBtn, styles.loadingBtnSkeleton]}
      >
        <Animatable.View animation="fadeIn" duration={800} style={styles.loadingBubble} />
        <Animatable.View animation="fadeIn" duration={800} style={styles.loadingText} />
      </Animatable.View>
    );
  };
export default function OrgProfilesScreen({navigation,route}){
    const {user,colorMode} = useContext(AppContext)
    const [filters,setFilters]=useState(['All','Posts','Polls','Media','Info','Tagged'])
    const [activeFilter,setActiveFilter]=useState('All')
    const [orgDetails,setOrgDetails]=useState(null)
    const {userdetails} = route.params
    async function getOrgDetails(){
        await axios.post(endpoints['get_org_profile'],{
            userid:user.userid,
            orgid:userdetails._id
        }).then(res=>{
            console.log(res.data,'org details')
            setOrgDetails(res.data)
        })
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getOrgDetails()
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    useEffect(()=>{
        getOrgDetails()},[])
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
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

    
                <View style={profilestyles.profilebox}>
                    <View style={profilestyles.profileboxtop}>
                        <View style={profilestyles.profileimagesec}> 
                        <Image source={{uri:wrapUIMG(userdetails.org_logo)}} style={{ width:70,
        height:70,
        borderRadius:10}}/>


                        </View>
                        <View style={profilestyles.profiledetailssec}>
                            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={[profilestyles.profilename,{
                                              color:color_scheme(colorMode,'black')
                            }]}>{`${userdetails.org_name} `}</Text>
                        <Text style={profilestyles.profileusername}>{`(${userdetails.org_shortname})`}</Text></View>
                        
                       
                        
                            {/* <View style={profilestyles.profilefollowers}>
                                <Text style={profilestyles.profilefollowersno}>
                                1,200 Links
                                </Text>
                                 
                  
                            
                        </View> */}
                            <View style={profilestyles.profilebio}>
                        <Text style={[profilestyles.profilebiotxt,{
                            color:"#ccc"
                        }]}>
                          {userdetails.org_description}
                        </Text>
                    </View>
                        </View>


                    </View>
                {
               orgDetails &&
             <View
             style={{
                flexDirection:'row',
                alignContent:'center',
                paddingHorizontal:10,
                paddingVertical:2,
                paddingTop:7
             }}
             >
                <View>
                <Text
                style={{
                    color:color_scheme(colorMode,'#aaa'),
                    fontSize:14,
                    fontWeight:'600'
                }}
                >
                    {orgDetails.members.length} {orgDetails.members.length>1?'Members':'Member'}
                </Text>
                </View>
                <Text
                    style={{
                        marginHorizontal:10,
                        color:color_scheme(colorMode,'#aaa'),
                        fontSize:20,
                        fontSize:16,
                        fontWeight:'900'
                    }}
                    >
                    •
                    </Text>
                <View>

                <Text
                style={{
                    color:color_scheme(colorMode,'#aaa'),
                    fontSize:14,
                    fontWeight:'600'
                }}
                >
             {orgDetails.links.length} {orgDetails.links.length>1?'Followers':'Follower'}
                </Text>
                </View>
             </View>
              }
               
                    <View style={profilestyles.profilebtns}>
                    {orgDetails? <JoinActionbtn action={getOrgDetails} state={orgDetails} userid={user.userid} orgid={userdetails._id }/>:<LoadingSkeleton/>}
                        {orgDetails?<FollowingOrgBtn action={getOrgDetails} state={orgDetails} orgid={userdetails._id} navigation={navigation} />:
    <TouchableOpacity style={profilestyles.profilemsgbtn}>
        <View
        style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#333',
            marginRight: 5,
        }}
        >

        </View>
        </TouchableOpacity>}
                        
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

const styles = StyleSheet.create({
    loadingBtn: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 30,
      width: '84%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingBtnSkeleton: {
      backgroundColor: '#222',
    },
    loadingBubble: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#333',
      marginRight: 5,
    },
    loadingText: {
      flex: 1,
      height: 19,
      borderRadius: 34,
      backgroundColor: '#333',
    },
  });
  
  
 