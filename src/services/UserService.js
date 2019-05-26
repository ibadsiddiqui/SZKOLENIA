import * as firebase from "firebase";

export default class UserService {
    constructor() {
        this.database = firebase.database();
    }
    async static createUserInDB(firebaseData, state) {
        const { uid, email, refreshToken } = firebaseData;
        const { name } = state;

    }
}