import React,{useState}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';

import LikeBtn from "./LikeBtn";
export default function HomeScreen({navigation}){
    const filters = ['All','Announments','Events','Posts','Polls']
    const [activeFilter,setActiveFilter]=useState('All')

    function swapFeed(item){
        setActiveFilter(item)
    }
    return (
        <View style={homestyles.container}>
            <View style={homestyles.top}>
                <View style={homestyles.toptop}>
                   <View style={homestyles.topleft}>
                        <Image source={{uri:"https://www.teddyoweh.net/static/media/teddyoweh.0d737b82d1f21ff870f9.jpeg"}} style={homestyles.topuserimg}/>
                        <View style={homestyles.topuser}>
                            <Text style={homestyles.topusername}>Ifechukwudeni Oweh</Text>
                            <View style={homestyles.topusergroup}>
                           
                                <Image source={require('../../../assets/farmhouse.png')} style={homestyles.topuserlogo}/>
                                <Text style={homestyles.topusergroupname}>FarmHouse (FH)</Text>
                                <MaterialIcons name="verified" size={14} color="#0084b4" />
                            </View>
                           
                        </View>

                   
                    </View>
                    <View style={homestyles.topright}>
                
                        <TouchableOpacity style={homestyles.msgicon} onPress={()=>navigation.navigate('MessagesScreen')}>
                       
                            <Messages3 color="#537FE7" variant="Bulk" size={32} />
                            <View style={homestyles.msgiconnumb}>
                                <Text style={homestyles.msgiconnum}>
                                    3
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={homestyles.topContent}>

                </View>
            </View>
            <View style={homestyles.filters}>
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        filters.map((filter,i)=>{
                            return(
                                <TouchableOpacity key={i} style={activeFilter==filter?homestyles.filtera:homestyles.filter} onPress={()=>swapFeed(filter)}>
                                    <Text style={activeFilter==filter?homestyles.filtertexta:homestyles.filtertext}>{filter}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }


                </ScrollView>
            </View>
            <ScrollView  contentContainerStyle={homestyles.postcontainer}>
                {
                    [1,2,3,4,1,2,3,4].map((post,index)=>{
                        return (
                        <View style={homestyles.post} key={index}>
                            <View style={homestyles.posttop}>
                                <View style={homestyles.posttopleft}>
                                    <View style={homestyles.posttopimg}>
                                        <Image source={{uri:"https://www.teddyoweh.net/static/media/teddyoweh.0d737b82d1f21ff870f9.jpeg"}} style={homestyles.postuserimg}/>
                                        
                                    </View>
                                    <View style={homestyles.postuserdetails}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={homestyles.postname}>Teddy Oweh</Text>
                                            <Text style={homestyles.postusername}>@teddyoweh</Text>
                                        </View>

                        
                                        <Text style={homestyles.postuserrole}>Tarleton Computer Society President </Text>
                                    </View>
                                </View>
                                <View style={homestyles.posttopright}>
                                    <TouchableOpacity>
                                        <More color="grey" size={16}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={homestyles.postcontent}>
                                <Text style={homestyles.postcontenttext}>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quidem et dignissimos voluptas omnis praesentium consequuntur soluta est perspiciatis labore repudiandae necessitatibus at culpa eius dolore aliquid, cupiditate quia non?
                                </Text>
                            </View>
                            <View style={homestyles.postinsights1}>
                                <Text style={homestyles.postinsights1text}>
                                    10 Likes
                                </Text>
                                <Text style={homestyles.postinsights1text}>
                                 /
                                </Text>
                                <Text style={homestyles.postinsights1text}>
                                    0 Comments
                                </Text>
                            </View>
                            <View style={homestyles.postinsights}>
                                <View style={homestyles.postcommentbox}>
                                    <TextInput
                                    placeholder="Add Comment"
                                    />
                                </View>
                                <View style={homestyles.postinsight}>
                                 <LikeBtn/>
                                </View>

                            </View>
                        </View>
                        )
                    })
                }
          

            </ScrollView>
            <View style={homestyles.postbtndiv}>
                <TouchableOpacity style={homestyles.postbtn}>
                <AddCircle color="white" variant="Broken" size={32} />
                {/* <Text style={homestyles.postbtntext}>New Post</Text> */}
                </TouchableOpacity>

            </View>
        </View>
    )
}