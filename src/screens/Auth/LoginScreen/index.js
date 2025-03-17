//================================ React Native Imported Files ======================================//
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import Input from '../../../components/Input/Input';
import Title from '../../../components/Title/Title';

//================================ Local Imported Files ======================================//

import styles from './style';
import Button from '../../../components/Button/Button';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import SimpleText from '../../../components/SimpleText/SimpleText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SemiMediumTitle from '../../../components/Semi Medium Title';
import colors from '../../../assets/colors/colors';
import axios from 'axios';
import Config from '../../../config/config';
import {
  showDanger,
  showSuccess,
  showWarning,
} from '../../../../Utils/FlashMessage';
import ShareData from '../../../../Utils/ShareData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import { requestUserPermission } from './../../../../Utils/PushNotifications';
import messaging from '@react-native-firebase/messaging';
import { useTranslation } from 'react-i18next';
import { DISCOUNT_HOME } from '../../../constants/navigators';
import images from '../../../assets/images/images';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fcmTokanVal, setFcmTokanVal] = useState('');

  useEffect(() => {
    getPermission();
  }, []);
  const getPermission = async () => {
    const token = await requestUserPermission();
    setFcmTokanVal(token);
  };

  const valid = () => {
    if (emailValidError === 'Done' && passwordValidError === 'Done') {
      if (fcmTokanVal != '') {
        login(fcmTokanVal);
      } else {
        alert('FCM NOT FOUND');
      }
    } else {
      showDanger(t('Please Enter All Data'));
      if (emailValidError != 'Done') {
        setEmailValidError(t('enterEmail'));
      }
      if (passwordValidError != 'Done') {
        setPasswordValidError(t('enterPassword'));
      }
    }
  };

  const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    setFcmTokanVal(checkToken);
    if (!checkToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (!!fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
          setFcmTokanVal(checkToken);
          return fcmToken;
        }
      } catch (error) {
        alert(t('checkInternet'));
      }
    } else return checkToken;
  };

  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError(t('enterEmail'));
    } else if (reg.test(val) === false) {
      setEmailValidError(t('validEmail'));
    } else if (reg.test(val) === true) {
      setEmailValidError('Done');
    }
  };

  const [passwordValidError, setPasswordValidError] = useState('');
  const handleValidPassword = val => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (val.length === 0) {
      setPasswordValidError(t('enterPassword'));
    } else if (val.length < 8) {
      setPasswordValidError(t('passwordMustbeGreateDigits'));
    } else if (reg.test(val) === false) {
      setPasswordValidError(t('validPassword'));
    } else if (reg.test(val) === true) {
      setPasswordValidError('Done');
    }
  };

  const login = devicestoken => {
    setLoading(true);

    var data = JSON.stringify({
      email: email,
      password: password,
      deviceToken: {
        platform: Platform.OS,
        // token: devicestoken ? devicestoken :fcmTokanVal,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5MjA1MDdiYjIzYzRhMjJlM2JjZTMiLCJpYXQiOjE2ODE3MTIzNzQsImV4cCI6MTY4NDMwNDM3NH0.lZfndIIPIXHRVPmwg5AkLWoMwwG-fMoalOze3F2LzkU',
        // "token": devicestoken ? devicestoken :fcmTokanVal
        // 'e5J3A-fbSHOGmo6-m5d3ux:APA91bGsIm7i2vHANcH6XOFGbPiw9mIp1FV1vVdrlHY8F7ax3ZDTIRJg4MFGfSJEzZo-ElHLYxnMo5SLjReYJYL7V7-u0s9DBAKUMz48_ZNhK2D0PaZcEoVc_05q48WeCTDovTVmFyzq',
      },
    });
    var config = {
      method: 'post',
      url: `${Config.baseUrl}login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data ? data : null,
    };

    axios(config)
      .then(async function (response) {
        setLoading(false);
        if (response.status === Config.statusCode) {
          Config.userDetail = response.data.data;
          showSuccess(t('successLogin'));
          _storeData(response.data);
          _storeUserData(response.data.data);
          Config.token = response.data.access_token;
          await ShareData.getInstance().loadShareData();
          await new ShareData().setShareData(response.data);
          await new ShareData().loadShareData().then(() => {
            navigation.replace(DISCOUNT_HOME);
          });
        } else {
          showWarning(t('InvalidEmailPassword'));
        }
      })
      .catch(async function (error) {
        setLoading(false);
        alert(error);
        showWarning(error?.response?.data?.msg);
      });
  };

  const _storeData = async data => {
    try {
      await AsyncStorage.setItem(
        'tokenValue',
        JSON.stringify(data?.access_token),
      );
      await AsyncStorage.setItem('Flow', 'clientFlow');
    } catch (error) { }
  };
  const _storeUserData = async data => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    } catch (error) { }
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      <View style={{ height: hp(90) }}>
        <View style={{ height: hp(85) }}>
          <Title title={t('logIn')} marginTop={hp(7)} marginBottom={hp(3)} />
          <Input
            value={email}
            onChangeText={email => {
              setEmail(email), handleValidEmail(email);
            }}
            title={t('email')}
            keyboardType={'email-address'}
            placeholder={t('emailPlaceHolder')}
          />
          {emailValidError !== 'Done' && emailValidError !== '' ? (
            <SmallTitle
              title={emailValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
            />
          ) : null}
          <Input
            value={password}
            onChangeText={password => {
              setPassword(password), handleValidPassword(password);
            }}
            title={t('password')}
            placeholder={t('passwordPlaceHolder')}
            show
          />
          {passwordValidError !== 'Done' && passwordValidError !== '' ? (
            <SmallTitle
              title={passwordValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
            />
          ) : null}
          <View style={styles.forgotBg}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RESET_PASSWORD_SCREEN')}>
              <Text style={styles.title}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              buttonText={t('Log in')}
              marginTop={wp(9)}
              fontSize={17}
              fontWeight={'500'}
              onPress={() => valid()}
            />
          )}

          <SmallTitle title={t('or')} marginTop={hp(4)} marginBottom={hp(4)} />
          <View style={styles.socialIconsBg}>
            <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
              <Image source={images.FaceBook} style={styles.Facebook} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
              <Image source={images.Google_Icon} style={styles.Facebook} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
              <Image source={images.Twitter} style={styles.Facebook} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: hp(5) }}>
          <TouchableOpacity
            style={styles.loginTextBg}
            onPress={() => navigation.navigate('REGISTER_SCREEN')}>
            <SimpleText text={t('notAccount')} color={colors.tabIconColor} />
            <SemiMediumTitle title={t('signUp')} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomeLoader visible={loading} />
    </ScrollView>
  );
};

export default LoginScreen;
