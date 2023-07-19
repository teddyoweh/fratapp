import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const CircleProgress = ({ progress, radius }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000, // You can adjust the duration as per your preference
      useNativeDriver: true,
    }).start();
  }, [progress, animatedValue]);

  const circumference = 2 * Math.PI * radius;
  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderRadius: radius }]}>
        <Animated.View
          style={[
            styles.progress,
            { borderRadius: radius, width: circumference },
            { transform: [{ rotate: '-90deg' }] },
            // { strokeDashoffset: animatedStrokeDashoffset },
          ]}
        />
        <Text style={styles.progressText}>{`${progress}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ccc',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#ff6b6b',
    overflow: 'hidden',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default CircleProgress;
