import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { homestyles, globalstyles, discoverstyles, authstyles,profilestyle } from './styles';
import Screens from './screens';
export default function App() {
 
  return (
    <Screens/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
