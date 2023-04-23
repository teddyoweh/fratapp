import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        
    }
  }

  const storeJSONData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
 
    }
  } 


const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      console.log(value)
      if(value !== null) {
 
      }
      return value
    } catch(e) {
 
    }
  }
  

const getJSONData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
   
    }
  }
  
const clearData = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
export {storeData,storeJSONData,getData,getJSONData,clearData}