//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Header from '../../../components/Header/Header';

//================================ Local Imported Files ======================================//

import styles from './style';
import Button from '../../../components/Button/Button';
import SimpleText from '../../../components/SimpleText/SimpleText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Config from '../../../config/config';
import axios from 'axios';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import colors from '../../../assets/colors/colors';
import {showWarning} from '../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

const CreateNewPasswordScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const generateNewPassword = async () => {
    if (passwordValidError === 'Done' && repeatPasswordValidError === 'Done') {
      var data = JSON.stringify({
        email: route.params.email,
        password: password,
        resetToken: route.params.token,
        confirmPassword: repeatPassword,
      });

      const token = route.params.token;
      var conf = {
        method: 'patch',
        url: `${Config.baseUrl}resetPassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(conf)
        .then(response => {
          if (response.status === Config.statusCode) {
            navigation.navigate('LOGIN_SCREEN');
          } else {
            alert(t('somethingWentWrong'));
          }
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.msg);
          }
        });
    } else {
      showWarning('Please enter valid password');
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
  const [repeatPasswordValidError, setRepeatPasswordValidError] = useState('');
  const handleRepeatValidPassword = val => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (val.length === 0) {
      setRepeatPasswordValidError(t('enterPassword'));
    } else if (val.length < 8) {
      setRepeatPasswordValidError(t('passwordMustbeGreateDigits'));
    } else if (reg.test(val) === false) {
      setRepeatPasswordValidError('enter valid repeat password');
    } else if (password !== val) {
      setRepeatPasswordValidError('both passwords must be same');
    } else if (reg.test(val) === true) {
      setRepeatPasswordValidError('Done');
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Title
        title={t('createNewPassword')}
        marginTop={hp(3)}
        marginBottom={hp(1)}
      />
      <SimpleText
        marginTop={0}
        marginBottom={hp(3)}
        textAlign="center"
        text={t('createNewPasswordText')}
      />
      <Input
        value={password}
        onChangeText={password => {
          setPassword(password);
          handleValidPassword(password);
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
      <Input
        value={repeatPassword}
        onChangeText={repeatPassword => {
          setRepeatPassword(repeatPassword);
          handleRepeatValidPassword(repeatPassword);
        }}
        title={t('repeatPassword')}
        placeholder={t('repeatePasswodPlaceHolder')}
        show
      />
      {repeatPasswordValidError !== 'Done' &&
      repeatPasswordValidError !== '' ? (
        <SmallTitle
          title={repeatPasswordValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
        />
      ) : null}

      <Button
        buttonText={t('save')}
        marginTop={hp(7)}
        onPress={() => generateNewPassword()}
      />
    </ScrollView>
  );
};
export default CreateNewPasswordScreen;
