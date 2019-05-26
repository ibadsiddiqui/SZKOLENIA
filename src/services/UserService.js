import * as firebase from "firebase";

export default class UserService {
    constructor() {
        this.database = firebase.database();
    }

    static async createUserInDB(firebaseData, name) {
        await DBHelper.createUser(firebaseData, name)
    }
}