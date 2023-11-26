import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecorderPlayerComponent = () => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
 
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingOptions = {
        android: {
          extension: '.3gp',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
 
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playSound = async () => {
    try {
      console.log('Loading sound...');
      const { sound } = await Audio.Sound.createAsync(
        { uri: recording.getURI() },
        { shouldPlay: true }
      );
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          sound.unloadAsync();
          setSound(null);
        }
      });
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={startRecording}>
        <Text>Start Recording</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={stopRecording}>
        <Text>Stop Recording</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={playSound} disabled={!recording}>
        <Text>Play Sound</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioRecorderPlayerComponent;
