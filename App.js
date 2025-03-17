//================================ React Native Imported Files ======================================//
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {enableLatestRenderer} from 'react-native-maps';
import {View, Text, LogBox, Platform, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import ShareData from './Utils/ShareData';
import Constants from './src/constants/Strings';
import {
  requestUserPermission,
  notificationListener,
  notificationPopupRef,
} from './Utils/PushNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setJSExceptionHandler} from 'react-native-exception-handler';
LogBox.ignoreAllLogs();

enableLatestRenderer();

//================================ Local Imported Files ======================================//

import RootStack from './src/routes/RootStack';
// import PushNotification from 'react-native-push-notification'
import Config from './src/config/config';
import NotificationPopup from 'react-native-push-notification-popup';
import store from './redux/store/store';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  //Notification permission
  async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
          {
            title: 'Notification Permission',
            message: 'Allow the app to receive notifications?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn('Failed to request notification permission:', err);
      }
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);
    }
  }
  const [isOperatorLogin, setIsOperatorLogin] = useState('');
  const {t, i18n} = useTranslation();

  const [routesName, setRoutesName] = useState('');

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      // Alert.alert(
      //     'Unexpected error occurred',
      //     `
      //     Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
      //     We will need to restart the app.
      //     `,
      //   [{
      //     text: 'Restart',
      //     onPress: () => {
      //       RNRestart.Restart();
      //     }
      //   }]
      // );
    } else {
      console.log('======>', e);
    }
  };
  setJSExceptionHandler(errorHandler);

  useEffect(() => {
    // let data = getPermission();
    requestUserPermission();
    getuserData();
    notificationListener(setRouteName);
    setTimeout(() => {
      getRouteName();
    }, 500);
  }, []);

  const getuserData = async () => {
    await AsyncStorage.getItem('userDetails').then(value => {
      if (value && value != null) {
        var data = JSON.parse(value);
        Config.userDetail = data;
      } else {
        console.log('ERROR');
      }
    });
  };

  const getRouteName = () => {
    if (routesName === 'BEFORE_BOOKING_DETAILSSCREEN') {
      setRoutesName('BEFORE_BOOKING_DETAILSSCREEN');
      checkLoginStatus();
    } else if (routesName === 'AFTER_SCREEN') {
      setRoutesName('AFTER_SCREEN');
      checkLoginStatus();
    } else {
      setRoutesName('SPLASH_SCREEN');
      checkLoginStatus();
    }
  };

  const getPermission = async () => {
    return await requestUserPermission();
  };

  const setRouteName = routeVal => {
    setRoutesName(routeVal);
  };

  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const checkLoginStatus = async () => {
    await ShareData.getInstance().loadShareData();
    Constants.userDetail = null;
    if (
      ShareData.getInstance().userData != null &&
      ShareData.getInstance().userData?.role?.toLowerCase() ===
        Constants.tourist
    ) {
      ShareData.getInstance().initialRoteName = 'TouristBottomTab';
      setIsOperatorLogin(Constants.tourist);
    } else if (
      ShareData.getInstance().userData != null &&
      ShareData.getInstance()?.userData?.role?.toLowerCase() ===
        Constants.operator
    ) {
      ShareData.getInstance().initialRoteName = 'BottomTab';
      setIsOperatorLogin(Constants.operator);
    } else {
      ShareData.getInstance().initialRoteName = 'HomeTourist';
      setIsOperatorLogin(Constants.tourist);
    }
  };

  const renderCustomPopup = ({
    appIconSource,
    appTitle,
    timeText,
    title,
    body,
  }) => (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        minHeight: 86,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      }}>
      <Text
        style={{
          fontSize: 15,
          marginHorizontal: 10,
          marginTop: 5,
          color: 'black',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: 10,
          marginTop: 5,
          color: 'black',
        }}>
        {body}
      </Text>
    </View>
  );

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          {routesName !== '' ? <RootStack routeName={routesName} /> : null}
        </Provider>
        <NotificationPopup
          ref={notificationPopupRef}
          renderPopupContent={renderCustomPopup}
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true}
        />
        <FlashMessage position={'top'} />
      </GestureHandlerRootView>
    </>
  );
};
console.log('AppState module:', require('react-native').AppState);

export default App;
