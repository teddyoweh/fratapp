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
const LoadingModal = ({ isVisible, onClose,success }) => {
 
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={{paddingHorizontal:10, borderStyle:'solid',borderWidth:1,borderColor:'#aaa', width:250,backgroundColor:'white',height:200,borderRadius:10,flexDirection:'column',alignContent:'space-around',alignItems:'center',justifyContent:'center'}}>
            {
                success==false?
           <>
    
            <Spinner/>
            <Text
            style={{
                marginTop:20,
                fontSize:16,
                color:'#333',
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
             <Text style={[makeeventstyles.formtext,{marginBottom:0}]}>Organization {name}</Text>
                {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
              
     
        </View>
                 <View style={[makeeventstyles.forminput,{justifyContent:'space-between'}]} >
                 <TextInput placeholder={`Add ${name}`}  value={text} onChangeText={(tex)=>setText(tex)}/>
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
                                <View key={index} style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ddd',paddingHorizontal:7,borderRadius:10,paddingVertical:5,marginRight:10}}>
    
                                <Text style={makeeventstyles.accessusername}>{item}</Text>
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
 
    const [teams,setTeams] = useState(['Executive','Finance','Media'])
 
    const [positions,setPositions] = useState(['President','Vice President','Secretary'])
 
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

    const {user} = useContext(AppContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [success,setSuccess] = useState(false)
    const showModal = () => {
      setModalVisible(true);
    };
  
    const hideModal = () => {
      setModalVisible(false);
    };
    async function createOrgMethod(){
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

        }

        showModal()
   
        await axios.post(endpoints['createorg'],body).then(res=>{
       
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
        <View style={{backgroundColor:'white',flex:1,height:'100%'}}>
             <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:10,
                borderBottomWidth:1,
                borderColor:'#ddd',
                borderStyle:"solid",
                paddingBottom:10,
            
            }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text 
                style={{
                    marginLeft:5,
                    fontSize:23,
                    fontWeight:'700',
                    color:'#333'
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
                        <View style={makeeventstyles.formgrp}>
                            <Text style={makeeventstyles.formtext}>Organization Name</Text>
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Name" value={orgName} onChangeText={(text)=>setOrgName(text)}/>
                        </View>
                        <View style={makeeventstyles.formgrp}>
                            <Text style={makeeventstyles.formtext}>Organization Shortname / Symbol</Text>
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Symbol" value={orgSymbol} onChangeText={(text)=>setOrgSymbol(text)}/>
                        </View>
                        <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Organization Type</Text>
        <ScrollView horizontal={true} contentContainerStyle={{paddingVertical:5}} showsHorizontalScrollIndicator={false}>


        <View style={{flexDirection:"row",flexWrap:'wrap'}}>

            {
                orgstypes.map((org,index)=>{
                    return (

                  
                    <TouchableOpacity key={index} style={orgType==org?makeeventstyles.eventtypea:makeeventstyles.eventtype} onPress={()=>setOrgType(org)}>
                        <Text style={orgType==org?makeeventstyles.eventtypetexta:makeeventstyles.eventtypetext}>{org}</Text>
                    </TouchableOpacity>
                      )
                })
            }
      
        </View>
        </ScrollView>

       
       
                        </View>
                        <View style={makeeventstyles.formgrp}>
                            <Text style={makeeventstyles.formtext}>Organization School</Text>
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Name" value={orgSchool} onChangeText={(text)=>setOrgSchool(text)}/>
                        </View>
                        <RenderGroupInput group={positions} setGroup={setPositions} name={'Positions'}/>
                        <RenderGroupInput group={teams} setGroup={setTeams} name={'Teams'}/>
                        <View style={makeeventstyles.formgrp}>
        <Text style={makeeventstyles.formtext}>Organization Description</Text>
        <TextInput style={[makeeventstyles.forminput,{height:200}]} multiline={true} placeholder="Organization Description" value={orgDescription} onChangeText={(text)=>setOrgDescription(text)}/>
    </View>
    <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0}]}>Organization Website</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{

                color:'#aaa',
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Website" value={orgWebsite} onChangeText={(text)=>setOrgWebsite(text)}/>
                        </View>
    <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0}]}>Organization Email</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{

                color:'#aaa',
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Email" value={orgEmail} onChangeText={(text)=>setOrgEmail(text)}/>
                        </View>

                        <View style={makeeventstyles.formgrp}> 
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }}>  
         <Text style={[makeeventstyles.formtext,{marginBottom:0}]}>Organization Phone</Text>
            {/* <Text style={{color:'red',paddingLeft:5}}>*</Text> */}
            <Text
            style={{

                color:'#aaa',
                marginLeft:5,
                fontSize:13

            }}
            >(Optional)</Text>
 
    </View>
                         
                            <TextInput style={makeeventstyles.forminput} placeholder="Organization Phone" value={orgPhone} onChangeText={(text)=>setOrgPhone(text)}/>
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