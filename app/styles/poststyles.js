import React from "react";
import { StyleSheet } from "react-native";
 
const poststyles = StyleSheet.create({
 
    container:{
        flex:1,
 
    },
    top:{
        paddingHorizontal:10,
        paddingBottom:20
    },
    commentssec:{
        flexDirection:'column'
    },
    commenthead:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingHorizontal:10,
        paddingBottom:10,
        borderStyle:'solid',
        borderBottomWidth:1,
     

    },
    commentheadtext:{
        marginLeft:4,
        fontSize:15,
        fontWeight:'600',
        color:'#aaa'
    }

})

export {poststyles}