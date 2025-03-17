//================================ React Native Imported Files ======================================//
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

//================================ Local Imported Files ======================================//

import Input from '../../../../BusinessUtills/components/Input/Input';
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import Button from '../../../../BusinessUtills/components/Button/Button';
import MediumTitle from '../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {showDanger, showWarning} from '../../../../../Utils/FlashMessage';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import BConfig from '../../../../BusinessUtills/config/config';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import images from '../../../../assets/images/images';
import {useIsFocused} from '@react-navigation/native';
import {CLOSE_TAB} from '../../../../../redux/store/actions/sheetManagerActions';
import {useDispatch} from 'react-redux';

const BLoginScreen = ({navigation}) => {
  const _signInWithGoogle = async () => {
    GoogleSignin.configure({
      androidClientId:
        '107668752955-6h0e2p72bcg7h39rn7h25ejavsnb850s.apps.googleusercontent.com',
      iosClientId:
        '107668752955-bs0fdci3tlmih1ip71e9d3rpjdlbon5n.apps.googleusercontent.com',
      webClientId:
        '107668752955-jh4nq6copk9otlqd9js9mhikbuje9ujo.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem(
        'GoogleToken',
        JSON.stringify(userInfo.idToken),
      );
      navigation.navigate('BUSINESS_PROFILE_SCREEN');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    const checkUserId = async () => {
      const UserId = await AsyncStorage.getItem('UserId');
      const NewUserId = JSON.parse(UserId);
      setuserID(NewUserId);
    };
    checkUserId();
  }, []);

  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fcmTokanVal, setFcmTokanVal] = useState('');
  const [userID, setuserID] = useState('');
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocus) {
      getFcmToken();
    }
  }, [isFocus]);
  const valid = () => {
    if (emailValidError === 'Done' && passwordValidError === 'Done') {
      if (fcmTokanVal != '') {
        login(fcmTokanVal);
      } else {
        alert('FCM NOT FOUND');
      }
    } else {
      showWarning(t('enterValidData'));
      if (emailValidError != 'Done') {
        setEmailValidError(t('required'));
      }
      if (passwordValidError != 'Done') {
        setPasswordValidError(t('required'));
      }
    }
  };
  const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    setFcmTokanVal(checkToken);
    if (!checkToken) {
      messaging()
        .requestPermission()
        .then(() => {})
        .catch(error => {});
      try {
        const fcmToken = await messaging().getToken();
        console.log('FacmToken====>', fcmToken);
        let test = await messaging().isSupported();
        if (!!fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
          setFcmTokanVal(checkToken);
          return fcmToken;
        }
      } catch (error) {
        setFcmTokanVal(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5MjA1MDdiYjIzYzRhMjJlM2JjZTMiLCJpYXQiOjE2ODE3MTIzNzQsImV4cCI6MTY4NDMwNDM3NH0.lZfndIIPIXHRVPmwg5AkLWoMwwG-fMoalOze3F2LzkU',
        );
        // alert(t(error));
      }
    } else return checkToken;
  };

  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError(t('required'));
    } else if (reg.test(val) === false) {
      setEmailValidError(t('validEmail'));
    } else if (reg.test(val) === true) {
      setEmailValidError('Done');
    }
  };

  const [passwordValidError, setPasswordValidError] = useState('');
  const handleValidPassword = val => {
    if (val.length === 0) {
      setPasswordValidError(t('required'));
    } else {
      setPasswordValidError('Done');
    }
  };
  const login = () => {
    getFcmToken();
    setLoading(true);
    var configOtp = {
      method: 'post',
      url: `${BConfig.baseUrl}business/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        password: password,
        deviceToken: {
          platform: Platform.OS,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5MjA1MDdiYjIzYzRhMjJlM2JjZTMiLCJpYXQiOjE2ODE3MTIzNzQsImV4cCI6MTY4NDMwNDM3NH0.lZfndIIPIXHRVPmwg5AkLWoMwwG-fMoalOze3F2LzkU',
        },
      },
    };
    axios(configOtp)
      .then(async response => {
        setLoading(false);
        if (response.data.StatusCode === 200) {
          _storeData(response.data);
          BConfig.token = response?.data?.access_token;
          BConfig.company = response.data.data.name;
          navigation.reset({
            index: 0,
            routes: [{name: 'DASHBOARD_SCREEN'}],
          });
        } else {
          showDanger(t('InvalidEmailPassword'));
        }
      })

      .catch(error => {
        setLoading(false);
        if (error.response) {
          showDanger(error?.response?.data?.msg);
        }
      });
  };

  const VerifyAccount = () => {
    var configOtp = {
      method: 'post',
      url: `${BConfig.baseUrl}business/resendOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: email,
      }),
    };
    axios(configOtp)
      .then(response => {
        let res = response.data;
        if (res.success) {
          navigation.navigate('BOTP_SCREEN', {
            isLogIn: email,
            newUserId: userID,
          });
        }
      })
      .catch(error => {
        if (error.response) {
          showDanger('Please enter email first');
        }
      });
  };

  const _storeData = async data => {
    try {
      await AsyncStorage.setItem(
        'BtokenValue',
        JSON.stringify(data.access_token),
      );
      await AsyncStorage.setItem('company', JSON.stringify(data.data.name));
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={colors.secondary} translucent={true} />
      {/* <Header /> */}
      <View style={{flex: 1, height: hp(95)}}>
        <View style={{flex: 1}}>
          <Title title={t('logIn')} marginTop={hp(5)} marginBottom={hp(2)} />
          <Input
            value={email}
            onChangeText={email => {
              setEmail(email), handleValidEmail(email);
            }}
            title={t('email')}
            placeholder={t('emailPlaceHolder')}
          />
          {emailValidError !== 'Done' && emailValidError !== '' ? (
            <SmallTitle
              title={emailValidError}
              alignSelf="flex-start"
              textAlign={'left'}
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(70)}
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
              textAlign={'left'}
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(70)}
            />
          ) : null}
          <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity
              style={{width: '50%'}}
              onPress={() => navigation.navigate('RESET_PASSWORD_SCREEN')}>
              <MediumTitle title={t('forgotPassword')} alignSelf="flex-start" />
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={VerifyAccount}>
              <MediumTitle title={t('Verify Account')} alignSelf="flex-end" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={colors.btnColor} />
          ) : (
            <Button
              buttonText={t('logIn')}
              marginTop={wp(9)}
              onPress={() => {
                valid();
                dispatch({type: CLOSE_TAB, payload: false});
              }}
            />
          )}
          <SmallTitle title={t('or')} marginTop={hp(4)} marginBottom={hp(4)} />
          <View style={styles.socialIconsBg}>
            <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
              <Image source={images.FaceBook} style={styles.Facebook} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBg}
              activeOpacity={0.7}
              onPress={() => _signInWithGoogle()}>
              <Image source={images.Google_Icon} style={styles.Facebook} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
              <Image source={images.Twitter} style={styles.Facebook} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginTextBg}
            onPress={() => navigation.navigate('BREGISTER_SCREEN')}>
            <SimpleText text={t('notAccount')} color={colors.tabIconColor} />
            <SemiMediumTitle title={t('signUp')} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomeLoader visible={loading} />
    </ScrollView>
  );
};

export default BLoginScreen;
