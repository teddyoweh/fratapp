import React from "react";
import { StyleSheet } from "react-native";
 
const homestyles = StyleSheet.create({
 
    container:{
        flex:1,
        backgroundColor:'white',
    },
    toptop:{
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'space-between',
  
    },
    topleft:{
        flexDirection:'row',
        alignItems:'center',
    
        
    },
    topright:{
        flexDirection:'row',
        alignItems:'center',
    }
    ,
    topuserlogo:{
        width:15,
        height:15,
    },
    topusergroup:{
        marginTop:2,
        flexDirection:'row',
        alignItems:'center',
    },
    topusergroupname:{
        marginLeft:4,
        marginRight:2,
        fontSize:14,
        color:'#176938',
        fontWeight:'600',
    },
    msgicon:{
        flexDirection:'row',
    },
    msgicon1:{
        flexDirection:'row',
        marginRight:4,
    },
    msgiconnumb:{
        position:'relative',
        left:-5,
        top:-5,
        width:20,
        height:20,
        backgroundColor:'#a330d0',
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    },
    msgiconnum:{
        color:'white',
        fontSize:13,
    },
    topusername:{
        fontWeight:'bold',
        fontSize:20,
        color:'#181823',
        textTransform:'capitalize'
    },
    topuserimg:{
        width:50,
        height:50,
        marginRight:10,
        borderRadius:100,
 
        borderWidth:1,
        borderColor:'#ccc',
    },
    postcontainer:{
        paddingVertical:30,
        backgroundColor:'white',
 
        
     
    },
    post:{
        paddingHorizontal:6,

        marginBottom:10,
        borderStyle:'solid',
        borderBottomWidth:0.4,
        borderColor:'#aaa',
        paddingBottom:15,

    },
    posttop:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    posttopleft:{
        flexDirection:'row',
        alignItems:'center',

    },
    posttopimg:{

    },
    postuserimg:{
        width:40,
        height:40,
        marginRight:10,
        borderRadius:100,
    },
    postuserdetails:{
        flexDirection:'column',
        alignItems:'flex-start'
    },
    postusername:{
        marginLeft:4,
        fontSize:14,
        fontWeight:'400',
        color:'#828282',
    },
    postdate:{
        fontSize:13,
        fontWeight:'400',
        color:'#828282',
    },
    postname:{
        fontSize:16.5,
        fontWeight:'500',
        color:'#181823',
    },
    postuserrole:{
        fontSize:13.5,
        fontWeight:'200',
        color:'#47474f',
        fontStyle:'italic'


    },
    postcontent:{
       paddingHorizontal:10,
       paddingVertical:10
    },
    postcontenttext:{
        fontSize:16,
        fontWeight:'300'
    },
    filters:{
        paddingHorizontal:10,
      paddingVertical:22,
     
    },
    filter:{
        marginRight:10,
        borderStyle:'solid',
        borderColor:"grey",
        borderWidth:0.4,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    filtera:{
        marginRight:10,
        borderStyle:'solid',
        borderWidth:0.4,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:30,
        backgroundColor:'#a330d0',
        color:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
        
    },
    filtertext:{
        fontSize:15,
        fontWeight:'600',
        color:'#333',
    },
    filtertexta:{
        fontSize:15,
        fontWeight:'600',
        color:'#fff',
    },
    postinsights:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        paddingHorizontal:10,
    },
    postinsight:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
     
    },
    postinsighttext:{
        fontSize:16,
        marginRight:4,
        color:'#777777',
        fontWeight:'bold',
    },
    insightbtn:{
      paddingHorizontal:4,
      paddingVertical:5,
      
        backgroundColor:'white',
        // borderStyle:'solid',
        // // borderColor:'#aaa',
        // borderWidth:0.4,
        borderRadius:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

    },
    likebtna:{
        height:35,
        width:35,
        backgroundColor:'white',
        borderStyle:'solid',
        borderColor:'#a330d0',
        backgroundColor:'#a330d0',
        borderWidth:0.4,
        borderRadius:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

    },
    postcommentbox:{
        flexDirection:'row',
        borderRadius:30,
        paddingHorizontal:15,
        paddingVertical:13,
        borderStyle:'solid',
        borderColor:'#aaa',

        borderWidth:0.4,
        width:'100%'
    },
    postinsights1:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingBottom:10,
    },
    postinsights1text:{
        fontSize:22,
        marginLeft:4,
        fontWeight:'400',
        color:'#333',
    },
    postbtndiv:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingBottom:10,
        justifyContent:'flex-end',
        backgroundColor:'transparent',
        position:'absolute',
        bottom:0,
        right:0
    },
    postbtn:{
        backgroundColor:'#a330d0',
          flexDirection:'row',
          justifyContent:'center',
        alignItems:'center',
        
       height:60,
         width:60,
        borderRadius:100
        
        
        
    },
    postbtntext:{
        fontSize:16,
        paddingLeft:3,
        color:'white',
        fontWeight:'bold',

    }


})

export {homestyles}