const firebase = require('firebase-admin');
const serviceAccount = require("./constant/serviceAccountKey-admin.json");

const UserHelpers = require('./services/UsersServices');
const express = require('express');
const app = express();

const notifications =  require('./services/NotificationServices')
app.get('/getlist', async (req, res) => {
    const list = await UserHelpers.getUsersPushNotificationToken();
    res.status(200).send(list)
})

app.get('/getWords', async (req,res) => {
    notifications();
})

app.listen(3000, () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://loginsignupnative.firebaseio.com"
    })
    console.log('listening on 3000')
})