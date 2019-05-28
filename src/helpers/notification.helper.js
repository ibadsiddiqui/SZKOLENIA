import { Permissions, Notifications } from 'expo';

export async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;
    if (status !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== "granted") { return; }

    let token = await Notifications.getExpoPushTokenAsync();

    return token;
}