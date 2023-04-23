import React from "react";
import { StyleSheet } from "react-native";
 
const profilestyles = StyleSheet.create({
 
    
    container:{
        flex:1,
        backgroundColor:'white',
        width:'100%'

    },
    settingstop:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        alignContent:'flex-end',
        paddingHorizontal:10,
        paddingVertical:10,
        width:'100%'
    },
    settingstopitem:{
        flexDirection:'row',
        alignItems:'flex-end',
 
    },
    profileboxtop:{
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
    },
    profileimagesec:{

    },
    profileimage:{
        width:70,
        height:70,
        borderRadius:100
    },
    profiledetailssec:{
 
        paddingHorizontal:10
    },
    profilename:{
        fontSize:20,
        fontWeight:'bold',
    },
    profileusername:{
        marginLeft:5,
        fontSize:15,
        fontWeight:'600',
        color:'#8a8a8a', //#343434 - black
    },
    profilebtns:{
        flexDirection:'row',
        alignItems:'center',
        alignContent:'space-between',
        width:'100%',
        paddingHorizontal:10,
        justifyContent:'space-between',
        marginTop:10
    },
    profilebtn:{
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:30,
        width:'84%',
        backgroundColor:'#a330d0'
    },
    profilebtnu:{
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:30,
        width:'84%',
        backgroundColor:'#F5DAF5',
        borderColor:'#a330d0',
        borderStyle:'solid',
        borderWidth:1,
    },
    profilebtntxt:{
        fontSize:19,
        color:'#fff',
        fontWeight:'500',
        textAlign:'center'
    },
    profilebtntxtu:{
        fontSize:19,
        color:    '#a330d0',
        fontWeight:'500',
        textAlign:'center'
    },

    profilemsgbtn:{
        paddingVertical:15,
        paddingHorizontal:15,
        borderColor:'#a330d0',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:100


    },
    profilebio:{
        //paddingHorizontal:10,
        paddingVertical:3
    },
    
    profilebiotxt:{
        fontSize:14,
        color:'#525252',
        
    },
    profileorgs:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        paddingHorizontal:10,
        paddingBottom:10,
        paddingTop:10,
    },
    profileorg:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
    },
    profileorglogo:{
        width:15,
        height:15,
    },
    profileorgtxt:{
        marginLeft:4,
        marginRight:2,
        fontSize:14,
        color:'#176938',
        fontWeight:'600',
    },
    profilesocials:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        paddingHorizontal:10
    },
    profilesocial:{
        borderColor:'#d9d9d9',
        borderStyle:'solid',
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:13,
        paddingVertical:5,
        borderRadius:30,
        marginRight:10,
        marginBottom:10



    },
    
    profilesocialtxt:{
        fontSize:13,
        marginLeft:6,
        color:'grey'
    },
    profilecontent:{
        paddingVertical:10
    },
    profileposts:{
        paddingVertical:10
    },
    postfilters:{
        paddingTop:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:20,
        borderStyle:'solid',
        borderBottomWidth:0.4,
        borderColor:'#777777',
    },
    postfilter:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:10,
        paddingHorizontal:10,
        marginRight:10,
    },
    postfiltertxt:{
        fontSize:14,
        color:'grey'
    },
    postfiltera:{
        paddingHorizontal:10,
        marginRight:10,
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:10,
        borderStyle:'solid',
        borderBottomWidth:1.4,
        borderColor:'black',
    },
    postfiltertxta:{
        fontSize:14,
        color:'black',
        fontWeight:600

    },
    profileuserfol:{
        paddingTop:9,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    profilefollowers:{
        flexDirection:'column',
        alignItems:'center',
    },
    profilefollowersno:{
        fontSize:15,
        fontWeight:'600',
        color:'#a330d0'
    },
    profilefollowerstxt:{
        fontSize:14,
        fontWeight:'400'
    }

})

export {profilestyles}