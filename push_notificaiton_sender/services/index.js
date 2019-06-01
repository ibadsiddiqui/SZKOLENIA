const firebase = require('firebase-admin');
const serviceAccount = require("./../constant/serviceAccountKey-admin.json");
const { Expo } = require('expo-server-sdk');
const UserServices = require('./UsersServices')
let expo = new Expo();

async function* countWords() {
    let DataToPush = await UserServices.listOfWords();

    for (var i = 0; i < DataToPush.length; i++) {
        yield DataToPush[i];
    }
}

(async () => {
    await firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://loginsignupnative.firebaseio.com"
    })
    var wordsStore = await countWords();
    let messages = [];
    let receivedWords = []

    var dayInMilliseconds = 10000;
    setInterval(async () => {
        var WordTosend = await wordsStore.next();
        receivedWords.push(WordTosend.value);

        let somePushTokens = await UserServices.getUsersPushNotificationToken();
        if (somePushTokens.length !== 0) {

            if (!WordTosend.done) {
                let UsersIds = await UserServices.getUsersIDs();
                await UsersIds.forEach(value => {
                    var db = firebase.database();
                    db.ref('/users/' + value).update({
                        currentWord: WordTosend.value,
                        receivedWords
                    });
                });

                for (let index = 0; index < somePushTokens.length; index++) {
                    if (!Expo.isExpoPushToken(somePushTokens[index])) {
                        console.error(`Push token ${somePushTokens[index]} is not a valid Expo push token`);
                        continue;
                    }
                    messages.push({
                        to: somePushTokens[index],
                        sound: 'default',
                        body: `Today's word is: ${WordTosend.value.Word}`,
                        data: { withSome: 'data' },
                    })
                }

                let chunks = expo.chunkPushNotifications(messages);
                let tickets = [];
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                    } catch (error) {
                        console.error(error);
                    }
                }
                let receiptIds = [];
                for (let ticket of tickets) {
                    if (ticket.id) {
                        receiptIds.push(ticket.id);
                    }
                }

                let receiptIdChunks = await expo.chunkPushNotificationReceiptIds(receiptIds);
                for (let chunk of receiptIdChunks) {
                    try {
                        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                        console.log(receipts);

                        for (let receipt of receipts) {
                            if (receipt.status === 'ok') {
                                continue;
                            } else if (receipt.status === 'error') {
                                console.error(`There was an error sending a notification: ${receipt.message}`);
                                if (receipt.details && receipt.details.error) {
                                    console.error(`The error code is ${receipt.details.error}`);
                                }
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        } else {
            console.log('No users found');

            return;
        }
    }, dayInMilliseconds);
})()