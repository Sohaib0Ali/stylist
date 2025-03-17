//================================ React Native Imported Files ======================================//

import React, { useState } from 'react';
import { ScrollView } from 'react-native';

//================================ Local Imported Files ======================================//
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import Header from '../../../../BusinessUtills/components/Header/Header';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import Input from '../../../../BusinessUtills/components/Input/Input';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import { useTranslation } from 'react-i18next';
import { showDanger } from '../../../../../Utils/FlashMessage';

const EnterEmailScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const [checkValidation, setCheckValidation] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError(t('required'));
      setCheckValidation(false);
    } else if (reg.test(val) === false) {
      setEmailValidError(t('pleaseEnterValidEmail'));
      setCheckValidation(false);
    } else if (reg.test(val) === true) {
      setEmailValidError(t('done'));
      setCheckValidation(true);
    }
  };

  const changeEmail = () => {
    if (checkValidation) {
      var configOtp = {
        method: 'patch',
        url: `${BConfig.baseUrl}business/changeEmail`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          userId: route?.params?.userId,
          email: email,
        }),
      };
      axios(configOtp)
        .then(response => {
          let res = response.data;
          if (res.StatusCode) {
            navigation.navigate('BOTP_SCREEN', { email: email, hide: 'hide' });
          } else showDanger(t('somethingWentWrong'));
        })
        .catch(error => {
          if (error.response) {
            showDanger(error.response.data.msg);
          }
        });
    }
  };

  return (
    <>
      <Header
        headerBack={true}
        headerColor={'white'}
        direction={'RTL'}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Title
          title={t('enterNewEmail')}
          marginTop={hp(4)}
          marginBottom={hp(1)}
        />
        <SimpleText marginBottom={hp(3)} text={t('enterAnotherEmail')} />
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
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Button
          buttonText={t('next')}
          marginTop={hp(4)}
          onPress={() => changeEmail()}
        />
      </ScrollView>
    </>
  );
};

export default EnterEmailScreen;
