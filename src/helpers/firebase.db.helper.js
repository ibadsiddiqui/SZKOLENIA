import * as firebase from 'firebase';

export default class DBHelper {

    createUser(firebaseData,name) {
        const { uid, email, refreshToken } = firebaseData;
        firebase.database().ref('users/' + uid).set({
          name: name,
          email: email,
          refreshToken,
          currentWordReceived:{},
          listOfWordsReceived: [],
        });
      }
      
}