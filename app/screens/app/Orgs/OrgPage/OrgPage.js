import { View,Text,Image,TouchableOpacity, ScrollView, TextInput,  RefreshControl,KeyboardAvoidingView, Button} from "react-native";
import { homestyles,discoverstyles } from "../../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus, UserCirlceAdd, Add} from 'iconsax-react-native';
import { FontAwesome5,Feather, Ionicons,AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import { useContext, useEffect,useRef, useState,useCallback } from "react";
import { AppContext } from "../../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../../config/endpoints";
import Spinner from '../../../../components/Spinner'
import { makeeventstyles } from "../../Calendar/MakeEvent";
import { wrapUIMG } from "../../../../utils/utils";
import BottomSheet from "react-native-gesture-bottom-sheet";

function AddUserAccessSheet({bottomSheet}){
    const {user} = useContext(AppContext)
    const [users,setUsers] = useState(null)
    const [selectedUsers,setSelectedUsers] = useState([])
    const [input,setInput] = useState('')
    async function searchUsers(input){
        setInput(input)
        await axios.post(endpoints['searchuser'],{
            search:input.toLowerCase(),
            userid:user.userid
        }).then(res=>{
            console.log(res.data)
            setUsers(res.data)
        })
    }
    const addUser = (uid) => {
        if(!selectedUsers.includes(uid)){
            setSelectedUsers([...selectedUsers,uid])
        }else{
            removeUser(uid)
        }
        console.log(selectedUsers)
    }
    const removeUser = (uid) =>{
        setSelectedUsers(selectedUsers.filter(u=>u!==uid))
    }
        
        

    return (
        <>

        <BottomSheet  hasDraggableIcon={false} ref={bottomSheet} height={850}  >
        <KeyboardAvoidingView style={{backgroundColor:"white",flex:1,
    paddingTop:20}}>

        <View style={[discoverstyles.searchbox,{marginHorizontal:10}]}>
                    <SearchNormal variant="Broken" color="grey" />
                    <TextInput style={discoverstyles.search}    autoCapitalize="none"  placeholderTextColor={'#aaa'} placeholder="Search Username, Firstname, Lastname" value={input} onChangeText={(text)=>searchUsers(text)}/>
                </View>
        <ScrollView
              keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={{backgroundColor:"white",flex:1}}
              >

<View style={{flexDirection:'column', backgroundColor:'white', height:"100%",paddingTop:10}}>

 
{
    users!=null?
    
    users.length==0?
    <View
    style={{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:'90%'
    }}
    >
        <Text
        style={{
            fontSize: 18,
            color:'#333',
            fontWeight:'700'
        }}
        >
           No Users Found
        </Text>
    </View>
    :
    <View
    style={{
        flexDirection:"column",
        justifyContent:'flex-start'

    }}
    >
        <View
        style={{
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:20
        }}
        >
            <Text
            style={{
                fontSize: 15,
                fontWeight:600
            }}
            >
            Selected Users ({selectedUsers.length}) 
            </Text>
        <Button title="Add"/>
        </View>
        {
            users.map((suser,index)=>{
                const bgcolor = selectedUsers.includes(suser._id)?'#f5f5f5':'transparent'
                const isSelected = selectedUsers.includes(suser._id)
                return (
                    <TouchableOpacity
                    key={index}
                    onPress={()=>{
                        addUser(suser._id)}}
                    style={{

                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                     
                        borderStyle:'solid',
                        borderColor:'#f5f5f5',
                        borderBottomWidth:2.4,
                        paddingHorizontal:10,
                        paddingVertical:10,
                        backgroundColor:bgcolor
                        
                    }}
                    >
                    <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start'
                    }}
                    >
                        <Image source={{uri:wrapUIMG(suser.uimg)}} style={{
                            width:50,
                            height:50,
                            borderRadius:100,
                            marginRight:10
                        }}/>
                        <View
                        style={{
                            flexDirection:'column'
                        }}
                        >
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                color:'#333'
                            
                            }}>
                                {suser.firstname+' '+suser.lastname}
                            </Text>
                            <Text
                            style={{
                                fontSize:14,
                                color:'#888'
                            }}
                            >
                                @{suser.username}
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        {isSelected==true &&
                        <View>
                            <Feather name="check" size={24} color="blue" />
                        </View>
                        }
                    </View>
                        
                    </TouchableOpacity>
                )
            })
        }

        </View>:

        <View
        style={{
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:'center',
            height:'90%'
        }}
        >
            <Text
            style={{
                fontSize: 18,
                color:'#333',
                fontWeight:'700'
            }}
            >
                Search for Users
            </Text>
        </View>
}


     
     
        </View>
        </ScrollView>
        
        </KeyboardAvoidingView>
  </BottomSheet>

  </>
    )
    
}

function RenderMembers({members,memberSheet}){
    let margin;
    return (
        <View
        style={{
            paddingHorizontal:20,
            flexDirection:'column'
        }}
        >
<Text
style={{
    marginBottom:4,
    color:'#333',
    fontSize:13,
    fontWeight:'bold'
}}
>

    Members (2)
</Text>

<View 
style={{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
}}
>


            <View
            style={{
                width:"70%",
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'flex-start'
                
       
            }}
            >
                {[members[0],members[0],members[0],members[0],members[0]].map((member,index) => {
                    
                    return(
                        <>
                 
                        <View key={index}>
                            <Image
                            source={{uri:wrapUIMG(member.uimg)}}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 25,
                                position:'relative',
                                left:index*-15,
                                borderColor:'#bbb',
                                borderWidth:0.5

                            }}
                            >

                            </Image>
                        </View>

                        </>
                    )
                }
                )}
               
                </View>
                <View
                style={{
                    marginLeft:margin
                }}
                >
                    <TouchableOpacity

                    onPress={()=>memberSheet()}
                    style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ddd',paddingHorizontal:7,borderRadius:10,paddingVertical:5,marginRight:10}}
                    >
                        
                    <Text
                    style={{
                        marginRight:4,
                        fontSize:13,
                        fontWeight:'400',
                  
                        color:'#333'
                    }}
                    >
                        Add Member
                    </Text>
                    <AddCircle
                    size={15}
                    color="#333"
                    variant="Broken"
                    />
                          </TouchableOpacity>

                </View>
            </View>

            </View>
    )
}

export default function OrgPage({navigation,route}){
    const {org} = route.params
    console.log(org._id)
    const [orgData,setOrgData] = useState(null)
    async function getOrg(){
       await axios.post(endpoints['getorg'],{
                org_id:org._id
        })
        .then(res=>{
            setOrgData(res.data)
        })
    }
    const AddUserAccessSheetref = useRef()

    useEffect(() => {
   
        getOrg()
    }, [])
    function opeAddMemberSheet(){
        AddUserAccessSheetref.current.show()
    }
    return (

 
    <View
    style={{
        height:'100%',
        backgroundColor:'white',
        flex:1,
        width:'100%',
        flexDirection:'column'
    }}
    >
        <View
        style={{
            paddingHorizontal:10,
            paddingBottom:5,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderBottomWidth:1,
            borderStyle:'solid',
            borderColor:'#eee'

        }}
        >
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>

            <TouchableOpacity>

            <Entypo name="dots-three-horizontal" size={20} color="#333" />
            </TouchableOpacity>

        </View>
        <View
        style={{
            flex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'white'
        }}
        >



        <ScrollView
        contentContainerStyle={{
            flex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'white'
        }}
        >
        <View>
            <View
            style={{
            flexDirection:'row',
            paddingHorizontal:15,
            paddingVertical:20
            }}
            >
                <View
                style={{
 
                    flexDirection:'row',
                    alignItems:'flex-start',
            
                }}
                >
                    {
                        org.org_logo!=null?<Image>

                        </Image>:
                      <View
                      style={{
                          height:80,
                      width:80,
                          borderRadius:10,
                          backgroundColor:'#eee', 
                          marginRight:10,
                          flexDirection:'row',
                          justifyContent:'center',
                          alignItems:'center',
                          borderStyle:'solid',
                          borderWidth:1,
                          borderColor:'#ccc',
                          paddingHorizontal:5
                      }}
                      >
                          <Text
                          style={{
                              color:'#333',
                              fontSize:20,
                              fontWeight:500
                          }}
                          >
                              {org.org_shortname}
                          </Text>
                      </View>
                                                                                                                                                                                   }
                </View>
                <View
                style={{
                    flexDirection:'column',
                    alignItems:'flex-start',
                    justifyContent:'center'
                }}
                >
                    <Text
                    style={{
                        fontSize:20,
                        flexWrap:'wrap',
                        color:'#333',
                        fontWeight:700
                    }}
                    >
                        {org.org_name}
                    </Text>
                    <Text
                    style={{
                        fontSize:16,
                        color:'#333',
                        fontWeight:500,
                        marginTop:5
                    }}
                    >
                        {org.org_description}
                    </Text>
                </View>
            </View>

            {

                orgData &&
            <View>

   
            <View>
                    <RenderMembers members={orgData.members} memberSheet={opeAddMemberSheet}/>
            </View>
            </View>
              }
        </View>

        </ScrollView>
              <AddUserAccessSheet bottomSheet={AddUserAccessSheetref}/>
        </View>
    </View>
       )

}