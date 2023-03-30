import React from "react";
import { StyleSheet } from "react-native";
 
const poststyles = StyleSheet.create({
 
    container:{
        flex:1,
        backgroundColor:'white'
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
        paddingHorizontal:10,
        paddingBottom:10,
        borderStyle:'solid',
        borderBottomWidth:0.4,
        borderColor:'#777777',

    },
    commentheadtext:{
        marginLeft:4,
        fontSize:15,
        fontWeight:'600',
        color:'#D030D0'
    }

})

export {poststyles}