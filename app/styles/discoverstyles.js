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
        backgroundColor:'#eee',
        borderRadius:30,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
        }
    ,search:{
        paddingHorizontal:10
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

    }
,   result:{
        flexDirection:'row',
        alignItems:'center',
        
        borderColor:'#ccc',
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
    fontWeight:'600',
    fontStyle:'italic',
    color:'#c3c3c3'

},
contentheader:{
    fontWeight:600,
    fontSize:23,
    marginBottom:10,
    color:'grey',
}
    

})

export {discoverstyles}