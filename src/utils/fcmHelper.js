import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request} from 'react-native-permissions';

export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
  } catch (error) {}
  return token;
};

export async function registerAppWithFCM() {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    try {
      await messaging()
        .registerDeviceForRemoteMessages()
        .then(status => {})
        .catch(error => {});
    } catch (error) {}
  }
}

export async function unRegisterAppWithFCM() {
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    try {
      await messaging()
        .unregisterDeviceForRemoteMessages()
        .then(status => {})
        .catch(error => {});
    } catch (error) {}
  }
  await messaging().deleteToken();
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {})
    .catch(error => {});
};

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(() => {});

  messaging().onNotificationOpenedApp(() => {});

  messaging().setBackgroundMessageHandler(() => {});
  messaging()
    .getInitialNotification()
    .then(() => {});

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
