//================================ React Native Imported Files ======================================//

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
//================================ Local Imported Files ======================================//
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import Header from '../../../../BusinessUtills/components/Header/Header';
import BConfig from '../../../../BusinessUtills/config/config';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import MediumTitle from '../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import { useTranslation } from 'react-i18next';
import { showDanger, showSuccess } from '../../../../../Utils/FlashMessage';
import { requestUserPermission } from '../../../../../Utils/PushNotifications';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import { verticalScale } from 'react-native-size-matters';

const BOtpScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [otp, setOtpCode] = useState('');
  const [Token, setToken] = useState('');
  const [loader, setLoader] = useState(false);
  let id = route?.params?.userId;
  let userID = route?.params?.newUserId;
  let email = route?.params?.email;
  let companyName = route?.params?.companyName;
  let logInMail = route?.params?.isLogIn

  useEffect(() => {
    const getOtp = async () => {
      const token = await requestUserPermission();
      setToken(token);
    };
    getOtp();
  }, []);

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

  const validateOTP = async () => {
    setLoader(true);
    var configOtp = {
      method: 'post',
      url: `${BConfig.baseUrl}business/verifyOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: logInMail || email || '',
        otp: otp,
        deviceToken: {
          platform: Platform.OS,
          // token: Token  
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5MjA1MDdiYjIzYzRhMjJlM2JjZTMiLCJpYXQiOjE2ODE3MTIzNzQsImV4cCI6MTY4NDMwNDM3NH0.lZfndIIPIXHRVPmwg5AkLWoMwwG-fMoalOze3F2LzkU',
        },
      }),
    };
    console.log("configOtp==>", configOtp);
    axios(configOtp)
      .then(async (response) => {
        if (response.status === 200) {
          setLoader(false);
          let res = response.data;
          console.log("response.data==>", res.access_token);
          BConfig.token = res.access_token;
          await AsyncStorage.setItem('cleanedToken', JSON.stringify(res?.access_token));
          BConfig.company = companyName;
          _storeData(response.data);
          navigation.navigate('BUSINESS_PROFILE_SCREEN');
        } else {
          setLoader(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          showDanger(error?.response?.data?.msg);
        }
      });
  };


  const resendOTP = () => {
    var configOtp = {
      method: 'post',
      url: `${BConfig.baseUrl}business/resendOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: logInMail ? logInMail : email,
      }),
    };
    axios(configOtp)
      .then(response => {
        let res = response.data;
        if (res.success) {
          showSuccess(t('otpSendAgain'));
        }
      })
      .catch(error => {
        if (error.response) {
          showDanger(error?.response?.data?.msg);
        }
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <TouchableOpacity
        onPress={() => email ? navigation.navigate('BREGISTER_SCREEN') : navigation.navigate('BLOGIN_SCREEN')}
      >
        <AntDesign name='left' size={verticalScale(25)} color={colors.black} />
      </TouchableOpacity>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          <Title
            title={t('verifyYourEmail')}
            marginTop={hp(4)}
            marginBottom={hp(1)}
          />
          <SimpleText text={t('enter4DigitCode')} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp(3),
            }}>
            <SimpleText text={t('to')} />
            <SimpleText
              text={logInMail ? logInMail : email}
              color={colors.headingBlack}
            />
          </View>

          <OTPTextInput
            inputCount={6}
            containerStyle={{}}
            handleTextChange={code => {
              setOtpCode(code);
            }}
            textInputStyle={{
              borderColor: '#000000',
              borderWidth: 2,
              addingHorizontal: wp(6),
            }}
            offTintColor="gray"
            tintColor="gray"
          />
          {route?.params?.hide === 'hide' ? (
            <View />
          ) : (
            <TouchableOpacity
              style={styles.alreadyHaveCodeBg}
              onPress={() => {
                resendOTP();
              }}>
              <SimpleText
                text={t('resendVerification')}
                color={colors.headingBlack}
              />
            </TouchableOpacity>
          )}

          <Button
            buttonText={t('next')}
            marginTop={hp(3)}
            onPress={() => validateOTP()}
          />
          {route?.params?.hide === 'hide' ? (
            <View />
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('ENTER_EMAIL_SCREEN', {
                  userId: userID ? userID : id,
                  email: email,
                });
              }}>
              <MediumTitle
                title={t('changeEmail')}
                alignSelf="center"
                marginTop={hp(2)}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomeLoader visible={loader} />
    </SafeAreaView>
  );
};

export default BOtpScreen;
