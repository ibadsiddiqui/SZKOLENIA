import * as firebase from "firebase";
import UserService from "./UserService";
import { AsyncStorage } from 'react-native'
export default class AuthServices {
    static async registerUser(email, password, name) {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const { additionalUserInfo, user } = response
            if (additionalUserInfo.isNewUser) {
                await UserService.createUserInDB(user, name)
                return true;
            }
        } catch (error) {
            throw error.message;
        }
    }

    static async signInUser(email, password) {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            await UserService.updateUserTokenInDB(response.user)
            await AsyncStorage.setItem('uid', response.user.uid)
            return true;
        } catch (error) {
            throw error.message;
        }
    }
}