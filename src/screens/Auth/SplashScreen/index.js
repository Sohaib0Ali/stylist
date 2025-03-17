//================================ React Native Imported Files ======================================//

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  LANGAUAGESECTION,
  DASHBOARD_SCREEN,
} from '../../../constants/navigators';
import { DISCOUNT_HOME } from '../../../constants/navigators';
import ShareData from '../../../../Utils/ShareData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../config/config';
import BConfig from '../../../BusinessUtills/config/config';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import images from '../../../assets/images/images';
import axios from 'axios';

const SplashScreen = props => {
  const { t, i18n } = useTranslation();

  const [userToken, setUserToken] = useState(null);
  const [BuserToken, setbUserToken] = useState(null);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('tokenValue');
      const Bvalue = await AsyncStorage.getItem('BtokenValue');
      const langValue = await AsyncStorage.getItem('selectedLang');

      if (value !== null) {
        setUserToken(value ? value : null);
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: DISCOUNT_HOME }],
            }),
          );
        }, 1000);
      } else if (Bvalue !== null) {
        setbUserToken(Bvalue ? Bvalue : null);
        getAllSalonData(Bvalue);
      } else if (value == null && Bvalue == null) {
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: LANGAUAGESECTION }],
            }),
          );
        }, 1000);
      }

      i18n.changeLanguage(langValue);
      Config.token = JSON.parse(value);
    } catch (error) { }
  };
  const getAllSalonData = token => {
    const cleanedToken = token.replace(/"/g, '');

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      // url: 'http://ec2-3-143-212-104.us-east-2.compute.amazonaws.com:5000/api/v2/buisness/getSalon',
      url: `${BConfig.baseUrl}buisness/getSalon`,
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.data.ismainBranch) {
          BConfig.token = cleanedToken;
          setTimeout(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: DASHBOARD_SCREEN }],
              }),
            );
          }, 1000);
        } else {
          props.navigation.replace('BUSINESS_PROFILE_SCREEN');
        }
      })
      .catch(function (error) {
        console.log('getAllSalonData error:', error);
      });
  };

  const checkData = async () => {
    await ShareData.getInstance().loadShareData();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Logo}>
        <Image source={images.SplashLogo} style={styles.Imglogo} />
        <Image source={images.Splashname} style={styles.Imgname} />
      </View>
      <Text style={styles.splashText}>Focus on the look, not the S</Text>
    </View>
  );
};
export default SplashScreen;
