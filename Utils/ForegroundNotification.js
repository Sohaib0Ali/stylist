import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Config from '../src/config/config';

export default ForegroundNotification = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'channel-1',
        title: 'Komb',
        body: 'Test Body',
        soundName: 'default',
        vibrate: true,
        playSound: Config.notificationSound,
      });
    });
    return unSubscribe;
  }, []);
  return null;
};
