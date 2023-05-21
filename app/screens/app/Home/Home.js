import React,{useState,useContext,useRef}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl} from "react-native";
import { homestyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, Messages3, MessageSquare,More,Like, Like1,AddCircle, Add, Send2} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { AppContext } from "../../../context/appContext";
import LikeBtn from "../../../components/LikeBtn";
import PostsList from "../../../components/PostsList";
import MakePost from "./MakePost";
import Feed from "./Feed";
import { wrapUIMG } from "../../../utils/utils";
export default function HomeScreen({navigation}){
    const filters = ['All','Announments','Events','Posts','Polls','Opportunities']
    const [activeFilter,setActiveFilter]=useState('All')
    const {user} = useContext(AppContext)
    const postBottomSheet = useRef()
    function swapFeed(item) {
        setActiveFilter(item);
        navigateToFeed(item);
      }
      
      function navigateToFeed(filter) {
        switch (filter) {
          case 'All':
            navigation.navigate('AllFeed');
            break;
          case 'Announments':
            navigation.navigate('AnnouncementFeed');
            break;
          case 'Events':
            navigation.navigate('EventFeed');
            break;
          case 'Posts':
            navigation.navigate('PostFeed');
            break;
          case 'Polls':
            navigation.navigate('PollsFeed');
            break;
          case 'Opportunities':
            navigation.navigate('OpportunitiesFeed');
            break;
          default:
            navigation.navigate('AllFeed');
            break;
        }
      }
 
      
      
      
 
    return (
        <View style={homestyles.container}>
            <View style={homestyles.top}>
                <View style={homestyles.toptop}>
                   <View style={homestyles.topleft}>
                        <Image source={{uri:wrapUIMG(user.uimg)}} style={homestyles.topuserimg}/>
                        <View style={homestyles.topuser}>
                            <Text style={homestyles.topusername}>{`${user.firstname} ${user.lastname}`}</Text>
                            <View style={homestyles.topusergroup}>
                           
                                <Image source={require('../../../assets/farmhouse.png')} style={homestyles.topuserlogo}/>
                                <Text style={homestyles.topusergroupname}>FarmHouse (FH)</Text>
                                <MaterialIcons name="verified" size={14} color="#0084b4" />
                            </View>
                           
                        </View>

                   
                    </View>
                    <View style={homestyles.topright}>
                
                        <TouchableOpacity style={homestyles.msgicon} onPress={()=>navigation.navigate('MessagesScreen')}>
                       
                            <Send2 color="#a330d0" variant="Outline" size={32} />
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
        <View>
            
        </View>
      

  
        <Feed navigation={navigation}/>
   
            <View style={homestyles.postbtndiv}>
                <TouchableOpacity style={homestyles.postbtn} onPress={()=>postBottomSheet.current.show()}> 
                <Add color="white" variant="Broken" size={42} />
                {/* <Text style={homestyles.postbtntext}>New Post</Text> */}
                </TouchableOpacity>

            </View>

            <MakePost navigation={navigation}  postBottomSheet={ postBottomSheet}/>
        </View>
    )
}