import * as firebase from 'firebase';
import { registerForPushNotificationsAsync } from './notification.helper';

const uuidv1 = require('uuid/v1');

export default class DBHelper {

  static async createUser(email) {
    const uid = uuidv1();
    const notification = await registerForPushNotificationsAsync();
    await firebase.database().ref('users/' + uid).set({
      email: email,
      notificationToken: notification,
    });
    return uid;
  }
}