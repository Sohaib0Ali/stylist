//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

//================================ Local Imported Files ======================================//

import Input from '../../../../BusinessUtills/components/Input/Input';
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import Button from '../../../../BusinessUtills/components/Button/Button';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import BConfig from '../../../../BusinessUtills/config/config';
import {showDanger, showWarning} from '../../../../../Utils/FlashMessage';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {scale, verticalScale} from 'react-native-size-matters';
import images from '../../../../BusinessUtills/assets/images/images';
import {openInbox} from 'react-native-email-link';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BRegisterScreen = ({navigation}) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOpenMail, setShowOpenMail] = useState(false);
  const {t} = useTranslation();
  const [userID, setUseid] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openMail = async () => {
    setShowOpenMail(false);
    openInbox({
      message: 'Whatcha wanna do?',
      cancelLabel: 'Go back!',
    });
    navigation.navigate('BOTP_SCREEN', {
      email: email,
      userId: userID,
      companyName: companyName,
    });
  };

  const valid = () => {
    if (
      nameValidError === 'Done' &&
      emailValidError === 'Done' &&
      passwordValidError === 'Done' &&
      repeatPasswordValidError === 'Done'
    ) {
      callApi();
    } else {
      showWarning(t('mandatory'));
      if (nameValidError != 'Done') {
        setNameValidError(t('required'));
      }
      if (emailValidError != 'Done') {
        setEmailValidError(t('required'));
      }
      if (passwordValidError != 'Done') {
        setPasswordValidError(t('required'));
      }
      if (repeatPasswordValidError != 'Done') {
        setRepeatPasswordValidError(t('required'));
      }
    }
  };

  const [nameValidError, setNameValidError] = useState('');
  const handleValidName = val => {
    if (val.length === 0) {
      setNameValidError(t('required'));
    } else if (val.length < 3) {
      setNameValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setNameValidError(t('maxChar'));
    } else if (val.length !== 0) {
      setNameValidError(t('done'));
    }
  };

  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError(t('required'));
    } else if (reg.test(val) === false) {
      setEmailValidError(t('pleaseEnterValidEmail'));
    } else if (reg.test(val) === true) {
      setEmailValidError(t('done'));
    }
  };

  const [passwordValidError, setPasswordValidError] = useState('');
  const handleValidPassword = val => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (val.length === 0) {
      setPasswordValidError(t('required'));
    } else if (val.length < 8) {
      setPasswordValidError(t('minimum8char'));
    } else if (reg.test(val) === false) {
      setPasswordValidError(t('validPassword'));
    } else if (reg.test(val) === true) {
      setPasswordValidError(t('done'));
    }
  };
  const [repeatPasswordValidError, setRepeatPasswordValidError] = useState('');
  const handleRepeatValidPassword = val => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (val.length === 0) {
      setRepeatPasswordValidError(t('required'));
    } else if (val.length < 8) {
      setRepeatPasswordValidError(t('minimum8char'));
    } else if (reg.test(val) === false) {
      setRepeatPasswordValidError(t('validPassword'));
    } else if (password !== val) {
      setRepeatPasswordValidError(t('mustBeSameAsPassword'));
    } else {
      setRepeatPasswordValidError('Done');
    }
  };

  useEffect(() => {
    if (repeatPassword.length !== 0) {
      handleRepeatValidPassword(repeatPassword);
    }
  }, [password]);

  const callApi = async () => {
    setLoading(true);
    var data = JSON.stringify({
      account: companyName,
      email: email,
      password: password,
      phoneNo: phoneNumber,
    });

    var conf = {
      method: 'post',
      url: `${BConfig.baseUrl}business/signUp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(conf)
      .then(async response => {
        setLoading(false);
        let res = response.data;
        setUseid(res.data._id);
        await AsyncStorage.setItem('UserId', JSON.stringify(res.data._id));
        await AsyncStorage.setItem('CompanyName', JSON.stringify(companyName));
        setShowOpenMail(true);
      })
      .catch(error => {
        if (error.response) {
          setLoading(false);
          showDanger(error?.response?.data?.msg);
        }
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        nestedScrollEnabled={true}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.innerContainer}>
            <View>
              <Title
                title={t('createBusinessAcc')}
                marginTop={hp(5)}
                marginBottom={hp(2)}
                alignSelf="center"
                textAlign="center"
              />
              <Input
                title={t('companyName')}
                value={companyName}
                onChangeText={companyName => {
                  setCompanyName(companyName), handleValidName(companyName);
                }}
                placeholder={t('companyPlaceHolder')}
              />
              {nameValidError !== 'Done' && nameValidError !== '' ? (
                <SmallTitle
                  title={nameValidError}
                  alignSelf="flex-start"
                  textAlign={'left'}
                  color={colors.green}
                  marginBottom={wp(1)}
                  marginLeft={wp(5)}
                  width={wp(80)}
                />
              ) : null}

              <Input
                title={t('email')}
                value={email}
                onChangeText={email => {
                  setEmail(email);
                  handleValidEmail(email);
                }}
                placeholder={t('emailPlaceHolder')}
                keyboardType="email-address"
              />
              {emailValidError !== 'Done' && emailValidError !== '' ? (
                <SmallTitle
                  title={emailValidError}
                  alignSelf="flex-start"
                  textAlign={'left'}
                  color={colors.green}
                  marginBottom={wp(1)}
                  marginLeft={wp(5)}
                  width={wp(80)}
                />
              ) : null}

              <Input
                title={t('password')}
                value={password}
                onChangeText={password => {
                  setPassword(password);
                  handleValidPassword(password);
                }}
                placeholder={t('passwordPlaceHolder')}
                show
                keyboardType="email-address"
              />
              {passwordValidError !== 'Done' && passwordValidError !== '' ? (
                <SmallTitle
                  title={passwordValidError}
                  alignSelf="flex-start"
                  textAlign={'left'}
                  color={colors.green}
                  marginBottom={wp(1)}
                  marginLeft={wp(5)}
                  width={wp(80)}
                  numberofLOne={2}
                />
              ) : null}

              <Input
                title={t('repeatPassword')}
                value={repeatPassword}
                onChangeText={repeatPassword => {
                  setRepeatPassword(repeatPassword);
                  handleRepeatValidPassword(repeatPassword);
                }}
                placeholder={t('passwordPlaceHolder')}
                show
                keyboardType="email-address"
              />
              {repeatPasswordValidError !== 'Done' &&
              repeatPasswordValidError !== '' ? (
                <SmallTitle
                  title={repeatPasswordValidError}
                  alignSelf="flex-start"
                  textAlign={'left'}
                  color={colors.green}
                  marginLeft={wp(5)}
                  width={wp(80)}
                  numberofLOne={2}
                />
              ) : null}

              <Button
                buttonText={t('signUp')}
                marginTop={wp(5)}
                onPress={() => valid()}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 25,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={styles.loginTextBg}
                onPress={() => navigation.navigate('BLOGIN_SCREEN')}>
                <SimpleText text={t('alreadySigned')} />
                <SemiMediumTitle title={t('logIn')} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <CustomeLoader visible={loading} />
      </KeyboardAvoidingView>
      {showOpenMail === true ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          }}>
          <View
            style={{
              height: verticalScale(400),
              width: '100%',
              backgroundColor: colors.white,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              bottom: verticalScale(-300),
            }}>
            <View>
              <View style={styles.imgBackground}>
                <Image
                  source={images.Exclude}
                  style={{
                    height: scale(35),
                    width: scale(35),
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text style={styles.sheetTitile}>{t('checkyouremail')}</Text>
              <Text style={styles.sheetSubTitile}>
                {t('mailcodevalidation')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.mailBtn}
              onPress={() => {
                openMail();
              }}>
              <Text style={{fontSize: 17, fontWeight: '500', color: '#FFFFFF'}}>
                {t('openmailapp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default BRegisterScreen;
