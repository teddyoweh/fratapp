import React from "react";
import { StyleSheet } from "react-native";
 
const calendarstyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
    },
    top:{
        paddingHorizontal:6,
        paddingVertical:10,
        paddingBottom:40,
 
        backgroundColor: 'white',
        width:'100%',
        
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30

    },
    monthscroll:{
        paddingBottom:30,
        flexDirection:'row'
    },
    month: {
        paddingHorizontal:10
    },
    monthname:{
        fontSize:16,
        color:'#000',
        fontWeight:'bold'
    },
    monthname1:{
        fontSize:16,
        color:'grey',
    },
    dayscroll:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap'
    },
    day:{
        height:30,
        width:30,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        backgroundColor:'#537FE7'

    },
    day1:{
        height:30,
        width:30,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10

    },
    dayname:{
        fontSize:17,
        fontWeight:'bold',
        color:'white',
    },
    dayname1:{
        fontSize:17,
        fontWeight:'bold',
        color:'grey',
    }
 
    

})

export {calendarstyles}