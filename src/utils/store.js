import AsyncStorage from '@react-native-async-storage/async-storage';

class store{
    storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token)
            
        } catch (e) {
            console.log("Storage errror:"+e);
            
        }
    }
    getToken= async() =>{
        let token = '';
        try {
            token = await AsyncStorage.getItem('token') || 'none';
            
        } catch (error) {
            console.log(error.message);
        }
        return token;
    }
}
export default new store();
