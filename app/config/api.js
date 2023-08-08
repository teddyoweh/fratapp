import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: '',  
  });
  
  const addJwtToHeaders = async (config) => {
    try {
      const token = await AsyncStorage.getItem('token'); 
 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error fetching JWT token from AsyncStorage:', error);
    }
    return config;
  };
  
api.interceptors.request.use(addJwtToHeaders);


export default api