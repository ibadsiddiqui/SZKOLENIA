const firebase = require('firebase-admin');
const firebaseHelpers = module.exports;


module.exports.getUsersTokensUsingID = async (ID) => {
    const db = firebase.database()
    const ref = db.ref('users/');
    const userTokens = []
    await ref.once('value', snapshot => {
        snapshot.forEach(cs => {
            userTokens.push(cs.val().notificationToken);
        });
    });
    return userTokens;
}

module.exports.getUsersIDList = async (params) => {
    const db = firebase.database()
    const ref = db.ref('users/');
    let results = []
    await ref.once("value", snapshot => results.push(snapshot.val()));
    const UsersWithID = results.map((item) => Object.keys(item));
    return UsersWithID[0]
}


module.exports.getListOfWords = async (params) => {
    const db = firebase.database()
    const ref = db.ref('Dictionary/');
    const listOfWords = [];
    await ref.once('value', snapshot => {
        snapshot.forEach(cs => {
            listOfWords.push(cs.val());
        });
    });
    return listOfWords;
}