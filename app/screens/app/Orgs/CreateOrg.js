import { useContext, useState } from "react";
import { View,Text,Image,TouchableOpacity,Vibration,  StyleSheet,ScrollView,Modal, TextInput,  RefreshControl} from "react-native";
import { homestyles,discoverstyles } from "../../../styles";
import { Message, Messages1,Message2, Messages2, SearchNormal, Messages3, MessageSquare,More,Like, Like1,AddCircle, ElementPlus} from 'iconsax-react-native';
import { FontAwesome5,Ionicons,AntDesign, MaterialIcons} from '@expo/vector-icons';
import { makeeventstyles } from "../Calendar/MakeEvent"; 
import { AppContext } from "../../../context/appContext";
import axios from "axios";
import { endpoints } from "../../../config/endpoints";
import Spinner from "../../../components/Spinner";
import successgif from '../../../assets/successorg.gif'
import * as ImagePicker from 'expo-image-picker';
import { color_scheme } from "../../../config/color_scheme";
const LoadingModal = ({ isVisible, onClose,success }) => {
    const {colorMode} = useContext(AppContext)
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={{paddingHorizontal:10, borderStyle:'solid',borderWidth:1,bordercolor:color_scheme(colorMode,'#eee'),borderColor:color_scheme(colorMode,'#aaa'), width:250,backgroundcolor:color_scheme(colorMode,'white'),height:200,borderRadius:10,flexDirection:'column',alignContent:'space-around',alignItems:'center',justifyContent:'center'}}>
            {
                success==false?
           <>
    
            <Spinner/>
            <Text
            style={{
                marginTop:20,
                fontSize:16,
                cocolor:color_scheme(colorMode,'#eee'),
                fontWeight:'700'
            }}
            >
                Creating New Organization
            </Text>
            </>
                 :
                <Image source={successgif} style={{
                    width:200,
                    height:200
                }}>

                </Image>
                }
          </View>
        </View>
      </Modal>
    );
  };
function RenderGroupInput({group,setGroup,name}){
    const {colorMode} = useContext(AppContext)
    function addToGroup(item){
        setGroup([...group,item])
        setText('')
    }
    function removeFromGroup(item){
        setGroup(group.filter((i)=>i!==item))
    }
    function addMethod(item){
        if(group.includes(item)){
            Vibration.vibrate()
        }else{
            addToGroup(item)
        }

    }
    const [text,setText] = useState('')
    return (
        <View style={makeeventstyles.formgrp}> 
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            marginBottom:10,
        }}>  
             <Text style={[makeeventstyles.formtext,{marginBottom:0,color:color_scheme(colorMode,'#333')}]}>Organization {name}</Text>
                {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
              
     
        </View>
                 <View style={[makeeventstyles.forminput,{justifyContent:'space-between', backgroundColor:color_scheme(colorMode,'#eeee')}]} >
                 <TextInput placeholder={`Add ${name}`}  value={text} onChangeText={(tex)=>setText(tex)}
                            placeholderTextColor={color_scheme(colorMode,'gray')}
                 />
                <TouchableOpacity
                onPress={()=>addMethod(text)}
                >
                <Text
                style={{
                    color:'#a330d0',
                    fontSize:14,
                    fontWeight:'700'
                }}
                >
                    Add
                </Text>    
                </TouchableOpacity>    
                </View>     
                <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                    marginTop:10
                }}
                >
                    {
                        group.map((item,index)=>{
                            return (
                                <View key={index} style={{flexDirection:'row',alignItems:'center', backgroundColor:color_scheme(colorMode,'#ddd'),paddingHorizontal:7,borderRadius:10,paddingVertical:5,marginRight:10}}>
    
                                <Text style={[makeeventstyles.accessusername,{
                                    color:color_scheme(colorMode,'#333')
                                }]}>{item}</Text>
                                <TouchableOpacity onPress={()=>removeFromGroup(item)}>
                                    <Text style={makeeventstyles.accessremove}>x</Text>
                                </TouchableOpacity>
                            </View>   
                            )})
                    }
     
                </ScrollView>       

                             
                            </View>
    )
}
export default function CreateOrgs({navigation}){
    const orgstypes = ['General', 'Fraternity', 'Sorority', 'Academic', 'Club', 'Honorary Society', 'STEM','Cultural', 'Religious', 'Service', 'Sports', 'Political', 'Media', 'Performing Arts', 'Special Interest'];

    const [orgType,setOrgType] = useState('General')
    const [orgName,setOrgName] = useState('')
    const [orgSymbol,setOrgSymbol] = useState('')
    const [orgDescription,setOrgDescription] = useState('')
    const [orgWebsite,setOrgWebsite] = useState('')
    const [orgEmail,setOrgEmail] = useState('')
    const [orgPhone,setOrgPhone] = useState('')
    const [orgSchool,setOrgSchool] = useState('')
    const [orgImage,setOrgImage] = useState(null)
    
    const [teams,setTeams] = useState(['Executive','Finance','Media'])
 
    const [positions,setPositions] = useState(['President','Vice President','Secretary'])
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          selectionLimit:1,
        
          quality: 1,
          allowsMultipleSelection:false
        });
   
 
       
        setOrgImage(_image.assets[0]);

      };
      function randomNumberString() {
        var min = 10000; // Minimum 5-digit number (10,000)
        var max = 99999; // Maximum 5-digit number (99,999)
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
      }
    function resetState(){
        setOrgType('General')
        setOrgName('')
        setOrgSymbol('')
        setOrgDescription('')
        setOrgWebsite('')
        setOrgEmail('')
        setOrgPhone('')
        setOrgSchool('')
        setTeams(['Executive','Finance','Media'])
        setPositions(['President','Vice President','Secretary'])
    }

    const {user,colorMode} = useContext(AppContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [success,setSuccess] = useState(false)
    const showModal = () => {
      setModalVisible(true);
    };
  
    const hideModal = () => {
      setModalVisible(false);
    };
    async function uploadImages(random){
        const data = new FormData()
       
        data.append('name','avatar')
        data.append('email',user.username)
        data.append('random',`${random}`)
        data.append('uri',orgImage.uri)
        data.append('file',{
            uri:orgImage.uri,
       
            name:'profile.jpg'
        },)
        console.log(data)
        await axios.post(endpoints['uploadprofile'],data)
        // .then(res=>{
        //     navigation.goBack()
        // })
    }
    async function createOrgMethod(){
        const random = `${randomNumberString()}`
        let primg
        if(orgImage){
            primg = {
                uri:orgImage.uri,
                random:random,
            email:user.username
    
            }
        }
        const body ={
            name:orgName,
            description:orgDescription,
            uid:user.userid,
            type:orgType,
            org_school:orgSchool,
            logo:null,
            shortname:orgSymbol,
            positions:positions,
            teams:teams,
            email:orgEmail,
            phone:orgPhone,
            website:orgWebsite,
            primg:primg

        }
        console.log(body,'trying to upload')

        showModal()
 
            await axios.post(endpoints['createorg'],body).then(async(res)=>{
                if(orgImage){
                    const uploadedimg = await uploadImages(random)
         
                
                }
                
                resetState()
                setSuccess(true)
                setTimeout(()=>{
                    hideModal()
                    navigation.goBack()
                }
                ,1880)
            })
        
      
      
    
         

 

    }
    
    return (
        <View style={{backgroundColor:color_scheme(colorMode,'white'),flex:1,height:'100%'}}>
             <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:10,
                borderBottomWidth:1,
                borderColor:color_scheme(colorMode,'#ddd'),
                borderStyle:"solid",
                paddingBottom:10,
            
            }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={color_scheme(colorMode,'black')} />
                </TouchableOpacity>
                <Text 
                style={{
                    marginLeft:5,
                    fontSize:23,
                    fontWeight:'700',
                    color:color_scheme(colorMode,'#333')
                }}
                >
                    New Organization
                </Text>
                
            </View>
            <View style={{paddingHorizontal:15,height:'85%',paddingVertical:15}}>
                <ScrollView
                
                showsVerticalScrollIndicator={false}
                >
                    <View>
                    <View style={[makeeventstyles.formgrp,{
                        alignItems:'center'
                    }]}>
                        <View
                        style={{
                            flexDirection:'column',
                            alignItems:'flex-end',
                            marginBottom:-4,

                        }}
                        >

              
                                {
                                  orgImage?
                                  <Image
                                  source={{uri:orgImage.uri}}
  
                                  style={{
                                      height:108,
                                      width:108,
                                      borderRadius:100
                                  }}
                                  />:
                            <View
                            style={{
                                borderWidth:1,
                                borderColor:'#bbb',
                                backgroundColor:'#ddd',
                                borderStyle:'solid',
                                borderRadius:100,
                                padding:18

                                
                            }}
                            >
                                  <Image
                                  source={require('../../../assets/orgusers.png')}
  
                                  style={{
                                      height:90,
                                      width:90
                                  }}
                                  />  
                             
                              
                            </View>
                               }
                            <TouchableOpacity
                            onPress={()=>addImage()}
                            style={{
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:6,
                                backgroundCocolor:color_scheme(colorMode,'#eee'),borderColor:color_scheme(colorMode,'#333'),
                                position:'relative',
                                top:-22,
                                left:-5
                                
                            }}
                            >
                                <Text
                                style={{
                                    color:color_scheme(colorMode,'white'),
                                    fontWeight:'700',
                                    fontSize:11,
                                }}
                                >
                                   {orgImage?"Update": 'Upload'}
                                </Text>
                            </TouchableOpacity>
                            </View>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization Picture</Text>
                        </View>
                        <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization Name</Text>
                            <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}
                            style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Name" value={orgName} onChangeText={(text)=>setOrgName(text)}/>
                        </View>
                        <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization Shortname / Symbol</Text>
                            <TextInput
                                placeholderTextColor={color_scheme(colorMode,'gray')}
                             style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Symbol" value={orgSymbol} onChangeText={(text)=>setOrgSymbol(text)}/>
                        </View>
                        <View style={makeeventstyles.formgrp}>
        <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization Cohorts</Text>
        <ScrollView horizontal={true} contentContainerStyle={{paddingVertical:5}} showsHorizontalScrollIndicator={false}>


        <View style={{flexDirection:"row",flexWrap:'wrap'}}>

            {
                orgstypes.map((org,index)=>{
                    return (

                  
                    <TouchableOpacity key={index} style={orgType==org?makeeventstyles.eventtypea:[makeeventstyles.eventtype,{backgroundColor:color_scheme(colorMode,'#eee'),borderColor:color_scheme(colorMode,'#eeee')}]} onPress={()=>setOrgType(org)}>
                        <Text style={orgType==org?makeeventstyles.eventtypetexta:[makeeventstyles.eventtypetext,{color:color_scheme(colorMode,'black'),fontWeight:'300'}]}>{org}</Text>
                    </TouchableOpacity>
                      )
                })
            }
      
        </View>
        </ScrollView>

       
       
                        </View>
                        <View style={makeeventstyles.formgrp}>
                            <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization School</Text>
                            <TextInput
                                       placeholderTextColor={color_scheme(colorMode,'gray')}
                            style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Name" value={orgSchool} onChangeText={(text)=>setOrgSchool(text)}/>
                        </View>
                        <RenderGroupInput group={positions} setGroup={setPositions} name={'Positions'}/>
                        <RenderGroupInput group={teams} setGroup={setTeams} name={'Teams'}/>
                        <View style={makeeventstyles.formgrp}>
        <Text style={[makeeventstyles.formtext,{color:color_scheme(colorMode,'#333')}]}>Organization Description</Text>
        <TextInput style={[makeeventstyles.forminput,{height:200, backgroundColor:color_scheme(colorMode,'#eeee')}]}
                   placeholderTextColor={color_scheme(colorMode,'gray')}
        multiline={true} placeholder="Organization Description" value={orgDescription} onChangeText={(text)=>setOrgDescription(text)}/>
    </View>
    <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0,color:color_scheme(colorMode,'#333')}]}>Organization Website</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{

                color:color_scheme(colorMode,'gray'),
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Website" value={orgWebsite} onChangeText={(text)=>setOrgWebsite(text)}
                            
                            placeholderTextColor={color_scheme(colorMode,'gray')}
                            />
                        </View>
    <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0,color:color_scheme(colorMode,'#333')}]}>Organization Email</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{

    
                color:color_scheme(colorMode,'gray'),
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Email" value={orgEmail} onChangeText={(text)=>setOrgEmail(text)}/>
                        </View>

                        <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0,color:color_scheme(colorMode,'#333')}]}>Organization Phone</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{


                color:color_scheme(colorMode,'gray'),
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={[makeeventstyles.forminput,{        backgroundColor:color_scheme(colorMode,'#eeee'),borderColor:color_scheme(colorMode,'#ccc')}]} placeholder="Organization Phone" value={orgPhone} onChangeText={(text)=>setOrgPhone(text)}/>
                        </View>

                    </View>

                </ScrollView>
            </View>
            <LoadingModal isVisible={modalVisible} onClose={hideModal} success={success} />
            <View style={{paddingVertical:10,flexDirection:"row",alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
            <TouchableOpacity style={makeeventstyles.createeventbtn} onPress={()=>createOrgMethod()}>
                <Text style={makeeventstyles.createeventbtntext}>Create Organization</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });