import * as firebase from "firebase";
import DBHelper from "../helpers/firebase.db.helper";

export default class UserService {
    constructor() {
        this.database = firebase.database();
    }

    static async createUserInDB(firebaseData, name) {
        await DBHelper.createUser(firebaseData, name)
    }
}