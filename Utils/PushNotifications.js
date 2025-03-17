import React from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../src/config/config';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const notificationPopupRef = React.createRef(null);

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    return getFcmToken();
  }
}

const getFcmToken = async () => {
  if (Platform.OS === 'ios') {
    const messaging = firebase.messaging();

    const registerDeviceForRemoteMessages = async () => {
      let checkToken = await AsyncStorage.getItem('fcmToken');
      if (!checkToken) {
        try {
          await messaging.registerDeviceForRemoteMessages();
          const fcmToken = await messaging.getToken();
          await AsyncStorage.setItem('fcmToken', fcmToken);
          Config.fcmToken = fcmToken;
          return fcmToken;
        } catch (error) {
          return null;
        }
      } else {
        return checkToken;
      }
    };

    const fcmToken = await registerDeviceForRemoteMessages();
    if (fcmToken) {
      // do something with the FCM token
      return fcmToken;
    }
  } else {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    if (!checkToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (!!fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);

          return fcmToken;
        }
      } catch (error) {
        alert('Please check your internet connection');
      }
    } else return checkToken;
  }
};

export const notificationListener = async setRouteName => {
  const navigation = useNavigation();
  messaging().onNotificationOpenedApp(remoteMessage => {
    const {data} = remoteMessage;
    navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN');
  });
  messaging().onMessage(remoteMessage => {
    const {data} = remoteMessage;
    if (
      remoteMessage?.notification?.title ||
      remoteMessage?.notification?.body
    ) {
      notificationPopupRef?.current?.show({
        // onPress: function () {
        //   navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN');
        // },
        // onAction: function (data) {
        //   navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN', { data: data });
        // },
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        soundName: 'default',
        vibrate: true,
        playSound: Config.notificationSound,
        slideOutTime: 5000,
      });

      setRouteName(remoteMessage.notification?.title);
    }
  });

  messaging().setBackgroundMessageHandler(remoteMessage => {
    const {data} = remoteMessage;
    if (
      remoteMessage?.notification?.title ||
      remoteMessage?.notification?.body
    ) {
      notificationPopupRef?.current?.show({
        // onPress: function () {
        //   navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN');
        // },
        // onAction: function (data) {
        //   navigation.navigate(BEFORE_BOOKING_DETAILSSCREEN, { data: data });
        // },
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        soundName: 'default',
        vibrate: true,
        playSound: Config.notificationSound,
        slideOutTime: 5000,
      });
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        setRouteName(remoteMessage.data?.type);
        if (remoteMessage.data?.type === 'BEFORE_BOOKING_DETAILSSCREEN') {
          AsyncStorage.setItem('BookingInfo', remoteMessage.data.booking);
        }
        if (remoteMessage.data?.type === 'AFTER_SCREEN') {
          AsyncStorage.setItem('BeforePicture', remoteMessage.data.booking);
        }
      }
    });
};
