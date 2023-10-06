
import React,{useState,useContext,useRef,useEffect,useCallback}from "react";
import { View,Text,Image,TouchableOpacity, ScrollView, TextInput, StyleSheet, RefreshControl, Dimensions, Animated} from "react-native";
 
import * as Animatable from 'react-native-animatable';
export default function PostSkeleton(){
    return (
        <Animatable.View 
        style={styles.skeletonContainer}
        animation={{
          0: {
            opacity: 1,
          },
          0.25: {
            opacity: 0.75,
          },
          0.5: {
            opacity: 0.5,
          },
          0.75: {
            opacity: 0.75,
          },
          1: {
            opacity: 1,
          },
        }}
        duration={2000}
        iterationCount="infinite"
      >
        <View style={styles.skeletonHeader}>
          <View style={styles.skeletonAvatar}></View>
          <View style={styles.skeletonHeaderContent}>
            <View style={styles.skeletonLineShort}></View>
            <View style={styles.skeletonLine}></View>
          </View>
        </View>
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonLine}></View>
          <View style={styles.skeletonLine}></View>
          <View style={styles.skeletonLine}></View>
        </View>
        <View style={styles.skeletonFooter}>
          <View style={styles.skeletonIcon}></View>
          <View style={styles.skeletonIcon}></View>
          <View style={styles.skeletonIcon}></View>
        </View>
        <View
        style={{
            flexDirection:'row',
            alignItems:'center',
        }}
        >
        <View style={styles.skeletonLineComments}></View>
        <View style={styles.skeletonLineComments}></View>
        </View>
      </Animatable.View>
    );
  }
const styles = StyleSheet.create({
    skeletonContainer: {
      backgroundColor: '#1a1a1a',
      marginHorizontal: 10,
      borderRadius: 15,
      paddingVertical: 19,
      paddingHorizontal: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderBottomWidth: 0.4,
      paddingBottom: 15,
    },
    skeletonHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    skeletonAvatar: {
      backgroundColor: '#2a2a2a',
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    skeletonHeaderContent: {
      flex: 1,
    },
    skeletonLine: {
      backgroundColor: '#2a2a2a',
      height: 8,
      borderRadius: 4,
      marginBottom: 6,
      width: '100%',
    },
    skeletonLineShort: {
      backgroundColor: '#3a3a3a',
      height: 8,
      borderRadius: 4,
      marginBottom: 6,
      width: '60%',
    },
    skeletonContent: {
      marginBottom: 10,
    },
    skeletonFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    skeletonIcon: {
      backgroundColor: '#3a3a3a',
      width: 15,
      height: 15,
      borderRadius: 12,
      marginRight: 10,
    },
    skeletonLineComments:{
        backgroundColor: '#2a2a2a',
        height: 5,
        borderRadius: 4,
        marginBottom: 6,
        marginRight:10,
        width: '15%',
        marginTop:10
    }
  });