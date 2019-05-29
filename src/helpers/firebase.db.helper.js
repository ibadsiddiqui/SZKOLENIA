import * as firebase from 'firebase';
import { registerForPushNotificationsAsync } from './notification.helper';

export default class DBHelper {

  static async createUser(firebaseData, name) {
    const { uid, email, refreshToken } = firebaseData;
    // const notification = await registerForPushNotificationsAsync();
    await firebase.database().ref('users/' + uid).set({
      name: name,
      email: email,
      refreshToken: refreshToken,
      // notificationToken: notification,
      currentWordReceived: {},
      listOfWordsReceived: [],
    });
  }
  static async updateUserToken(firebaseData) {
    const { uid } = firebaseData;
    const notification = await registerForPushNotificationsAsync();
    await firebase.database().ref('users/' + uid).update({
      notificationToken: notification,
    });
  }
}