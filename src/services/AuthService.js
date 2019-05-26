import * as firebase from "firebase";
import UserService from "./UserService";

export default class AuthServices {
    static async registerUser(email, password, name) {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const { additionalUserInfo, user } = response
            if (additionalUserInfo.isNewUser) {
                console.log(user.refreshToken)
                await UserService.createUserInDB(user, name)
            }
        } catch (error) {   
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        }

    }
}