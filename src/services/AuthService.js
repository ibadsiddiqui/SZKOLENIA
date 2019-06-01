import UserService from "./UserService";
import { AsyncStorage } from 'react-native'
export default class AuthServices {

    static async signInUser(email) {
        try {
            const uid = await UserService.createUserInDB(email);
            await AsyncStorage.setItem('uid', uid)
            return true;
        } catch (error) {
            throw error;
        }
    }
}