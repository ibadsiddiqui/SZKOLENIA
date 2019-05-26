import * as firebase from 'firebase';

export default class DBHelper {

  static async createUser(firebaseData, name) {
    const { uid, email, refreshToken } = firebaseData;
    await firebase.database().ref('users/' + uid).set({
      name: name,
      email: email,
      refreshToken: refreshToken,
      currentWordReceived: {},
      listOfWordsReceived: [],
    });
  }

}