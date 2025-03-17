//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

//================================ Local Imported Files ======================================//
import Input from '../../../components/Input/Input';
import PickerComponent from '../../../components/PickerComponent/PickerComponent';
import Title from '../../../components/Title/Title';
import styles from './style';
import Button from '../../../components/Button/Button';
import PhoneInput from 'react-native-phone-number-input';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SimpleText from '../../../components/SimpleText/SimpleText';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../assets/colors/colors';
import GenderPickerComponent from '../../../components/GenderPicker/GenderPickerComponent';
import SemiMediumTitle from '../../../components/Semi Medium Title';
import axios from 'axios';
import Config from '../../../config/config';
import {showWarning, showDanger} from '../../../../Utils/FlashMessage';
import Header from '../../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import images from '../../../assets/images/images';

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

const RegisterScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [gender, setGender] = useState('Male');
  const refRBSheet = useRef();
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);

  const valid = () => {
    if (
      nameValidError === 'Done' &&
      emailValidError === 'Done' &&
      passwordValidError === 'Done' &&
      phoneValidError === 'Done'
    ) {
      callApi();
    } else {
      showDanger(t('PLeaseEnterValidData'));
    }
  };

  const [nameValidError, setNameValidError] = useState('');

  const handleValidName = val => {
    if (val.length === 0) {
      setNameValidError(t('enterAccountName'));
    } else if (val.length < 3) {
      setNameValidError(t('AccountNameGreater'));
    } else if (val.length > 20) {
      setNameValidError(t('accountLessNum'));
    } else {
      setNameValidError('Done');
    }
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

  const [phoneValidError, setPhoneValidError] = useState('');
  const handleValidPhone = val => {
    let reg = /^[-+]?[0-9]+$/;

    if (val.length === 0) {
      setPhoneValidError(t('enterPhone'));
    } else if (val.length < 10) {
      setPhoneValidError(t('phoneMax'));
    } else if (val.length > 13) {
      setPhoneValidError(t('phoneMin'));
    } else if (reg.test(val) === false) {
      setPhoneValidError(t('onlyNum'));
    } else if (reg.test(val) === true) {
      setPhoneValidError('Done');
    }
  };

  const callApi = async () => {
    setLoading(true);

    var data = JSON.stringify({
      account: account,
      email: email,
      password: password,
      gender: gender,
      phoneNo: phoneNumber,
    });
    var config = {
      method: 'post',
      url: `${Config.baseUrl}register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === Config.statusCode) {
          setLoading(false);
          navigation.navigate('OTP_SCREEN', {phone: phoneNumber});
        } else {
          setLoading(false);
          if (error.response) {
            alert(error.response.data.msg);
          }
        }
      })
      .catch(function (error) {
        setLoading(false);
        showWarning(error.response.data.msg);
      });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onScrollBeginDrag={() => {
        Keyboard.dismiss();
      }}
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Title
        title={t('signUp') + ' Hello'}
        marginTop={hp(2)}
        marginBottom={hp(2)}
      />

      <View>
        <Input
          title={t('account')}
          value={account}
          onChangeText={account => {
            setAccount(account), handleValidName(account);
          }}
          placeholder={t('accountPlaceHolder')}
        />
        {nameValidError !== 'Done' && nameValidError !== '' ? (
          <SmallTitle
            title={nameValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
          />
        ) : null}
      </View>

      <Input
        title={t('email')}
        value={email}
        onChangeText={email => {
          setEmail(email);
          handleValidEmail(email);
        }}
        placeholder={t('emailPlaceHolder')}
        keyboardType={'email-address'}
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
      <PickerComponent
        value={gender}
        title={t('gender')}
        direction="LTR"
        onPress={() => refRBSheet.current.open()}
      />
      <Input
        title={t('password')}
        value={password}
        onChangeText={password => {
          setPassword(password);
          handleValidPassword(password);
        }}
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
          numberofLine={2}
        />
      ) : null}

      <View style={styles.phoneBg}>
        <Text style={styles.title}>{t('phoneNumber')}</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="MA"
          containerStyle={styles.phoneContainer}
          countryPickerButtonStyle={{backgroundColor: 'transparent'}}
          textContainerStyle={styles.textInput}
          onChangeFormattedText={text => {
            setphoneNumber(text);
            handleValidPhone(text);
          }}
        />
      </View>
      {phoneValidError !== 'Done' && phoneValidError !== '' ? (
        <SmallTitle
          title={phoneValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginTop={hp(1.5)}
          marginLeft={wp(5)}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          buttonText={t('signUp')}
          marginTop={wp(7)}
          alignSelf={'flex-end'}
          onPress={() => valid()}
        />
      )}

      <SmallTitle title={t('or')} marginTop={hp(3)} marginBottom={hp(3)} />
      <View style={styles.socialIconsBg}>
        <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
          <Image source={images.FaceBook} style={styles.Facebook} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBg}
          onPress={() => {
            _signInWithGoogle();
          }}
          activeOpacity={0.7}>
          <Image source={images.Google_Icon} style={styles.Facebook} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBg} activeOpacity={0.7}>
          <Image source={images.Twitter} style={styles.Facebook} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginTextBg, {marginBottom: hp(10)}]}
        onPress={() => navigation.navigate('LOGIN_SCREEN')}>
        <SimpleText text={t('alreadySigned')} />
        <SemiMediumTitle title={t('logIn')} />
      </TouchableOpacity>

      <RBSheet
        height={hp(38)}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}>
        <GenderPickerComponent
          getCountValue={selectedGender => {
            setGender(
              selectedGender == 1
                ? t('male')
                : selectedGender == 2
                ? t('female')
                : t('male'),
            );
          }}
          onPressLeft={() => refRBSheet.current.close()}
          onPressRight={() => refRBSheet.current.close()}
        />
      </RBSheet>
    </ScrollView>
  );
};

export default RegisterScreen;
