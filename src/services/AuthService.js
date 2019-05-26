import * as firebase from "firebase";

export default class AuthServices {
    static async registerUser(email, password) {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const { additionalUserInfo, user } = response
            if (additionalUserInfo.isNewUser) {
                console.log(user.refreshToken)
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