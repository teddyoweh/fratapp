import React from "react";
import { StyleSheet } from "react-native";
 
const authstyles = StyleSheet.create({
 
    container:{
        flex: 1,
 
        flexDirection:'column',
        justifyContent:'space-between'
    },
    logobox:{
        alignItems:'center',
        justifyContent:'center',
       
        height:'80%',

    },

    
    btnsbox:{
        height:'20%',
        alignItems:'center',
        justifyContent:'center',
 
    },
    landingbtn:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#a330d0',
        borderRadius:30,
        width:'80%'
    },
    landingbtntxt:{
        color:'white',
        fontSize:16,
        fontWeight:600
    }, 
    landingbtn1:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        paddingHorizontal:20,
        paddingVertical:20,
 
        borderRadius:30,
        width:'70%'


    },
    landingbtntxt1:{
        color:'#a330d0',
        fontSize:16,
        fontWeight:600
    },
    authcontainer:{
        flex:1,
        flexDirection:'column',
       
    },
    // authlogobx:{
    //     height:'60%'
    // },
    authlogo:{
        width:400,
        height:200,
        alignItems:'center',
        justifyContent:'center',
    },
    authlogobx:{
        alignItems:'center',
        justifyContent:'center',
    },
    formbx:{
        paddingHorizontal:20,
        marginBottom:40
    },
    formgrp:{
        marginBottom:20,
    },
    forminput:{
        marginTop:5,
        paddingHorizontal:10,
        paddingVertical:12,
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:10,
 
    },
    formtxt:{
        color:'#666',
        fontSize:15,
        fontWeight:600,
    },
    formtxth1:{
        color:'#666',
        fontSize:20,
        fontWeight:600,
    },
    actionbtn:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#a330d0',
        borderRadius:30,
        width:'80%'
    }
    

})

export {authstyles}