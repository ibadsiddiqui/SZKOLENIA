const firebase = require('firebase-admin');

const UserHelpers = module.exports;
const firebaseHelpers = require('./../helpers/firebase.helpers')
module.exports.getUsersPushNotificationToken = async () => {
    const notificationTokens = await firebaseHelpers.getUsersTokensUsingID();
    return notificationTokens;
}

module.exports.listOfWords = async () => {
    const list = await firebaseHelpers.getListOfWords();
    return list;
}

module.exports.getUsersIDs = async () => { 
    const IDs = await firebaseHelpers.getUsersIDList();
    return IDs;
}
