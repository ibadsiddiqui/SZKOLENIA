import * as firebase from "firebase";
import DBHelper from "../helpers/firebase.db.helper";

export default class UserService {
    constructor() {
        this.database = firebase.database();
    }

    static async createUserInDB(email) {
        return await DBHelper.createUser(email)
        
    }
}