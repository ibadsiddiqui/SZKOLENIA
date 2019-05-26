import * as firebase from "firebase";
import UserService from "./UserService";

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
}