import React from "react";
import { StyleSheet } from "react-native";
 
const discoverstyles = StyleSheet.create({
 
    container:{
        flex:1,
        backgroundColor:'white',
    },
    top:{
        paddingHorizontal:10,
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:10

    },
    searchbox:{
     
        borderRadius:12,
        paddingHorizontal:10,

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
        }
    ,search:{
        paddingHorizontal:10,
        paddingVertical:15,
        
    },
    resultlogo:{
        width:40,
        height:40,

    },
    content:{
        paddingTop:20,
        paddingHorizontal:10
    },
    results:{
        flexDirection:'column',
        
        height:'100%',
      

    }
,   result:{
        flexDirection:'row',
        alignItems:'center',
        
 
        borderBottomWidth:0.4,
        borderStyle:'solid',
        paddingVertical:16,
    },
resultname:{
    fontSize:16,
    marginLeft:10,
    fontWeight:'600',
    color:'black'
},
resultaddress:{
    fontSize:13,
    marginTop:2,
    marginLeft:3,
    fontWeight:'400',
    fontStyle:'italic',


},
contentheader:{
    fontWeight:600,
    fontSize:23,
    marginBottom:10,
    color:'grey',
}
    

})

export {discoverstyles}