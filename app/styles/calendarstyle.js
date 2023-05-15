import React from "react";
import { StyleSheet } from "react-native";
 
const calendarstyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    top:{
        paddingHorizontal:16,
        paddingVertical:10,
      borderStyle:'solid',
      borderBottomWidth:1,
      borderColor:'#eee',
 
        backgroundColor: 'white',
        width:'100%',
        elevation: 10,
                 shadowColor: '#777',
                 shadowOffset: { width: 0, height: 1 },
                 shadowOpacity: 0.35,
                 marginBottom:30,shadowRadius: 13,
        
     

    },
    monthscroll:{
        paddingBottom:30,
        flexDirection:'row',
        
    
 
        
    },
    
    dayscroll:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap'
    },
    day:{
        marginVertical:10,
        height:40,
        width:40,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
   
        backgroundColor:'#a330d0'

    },
    daytext:{
        fontSize:14,
        color:'white',
        fontWeight:700
      
    },
    day1:{
        marginTop:10,
        height:40,
        marginVertical:10,
        width:40,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderStyle:'solid',
        borderColor:'#ccc',
        borderWidth:1

    },
    daytext1:{
        fontSize:14,
        color:'#a330d0',
        fontWeight:700
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
    },
    startdot:{height:5,width:5,borderRadius:10,backgroundColor:'#a330d0'},
    enddot:{height:5,width:5,borderRadius:10,backgroundColor:'#ef9766'},
line:{
    height:15,
    width:1,
    backgroundColor:'#ddd',
    marginHorizontal:5

}
    

})

export {calendarstyles}