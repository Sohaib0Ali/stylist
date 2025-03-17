//================================ React Native Imported Files ======================================//
import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input/Input';
import Title from '../../../components/Title/Title';
import axios from 'axios';

//================================ Local Imported Files ======================================//

import styles from './style';
import Button from '../../../components/Button/Button';
import SimpleText from '../../../components/SimpleText/SimpleText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Config from '../../../config/config';
import { useTranslation } from 'react-i18next';

const ResetPasswordScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  console.log("Config.statusCode==>", Config.statusCode);

  const resetPassword = () => {
    var configOtp = {
      method: 'patch',
      url: `${Config.baseUrl}forgotPassword`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
      },
    };
    axios(configOtp)
      .then(response => {
        console.log("===>", response);
        if (response.status === Config.statusCode) {
          navigation.navigate('RESET_PASSWORD_OTP_SCREEN', { email: email });
        } else {
          alert(t('somethingWentWrong'));
        }
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.msg);
        }
      });
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Title title={t('resetPassword')} marginTop={hp(3)} />
      <SimpleText
        marginTop={0}
        marginBottom={hp(3)}
        textAlign="center"
        text={t('resetPasswordText')}
      />
      <Input
        value={email}
        onChangeText={email => setEmail(email)}
        title={t('email')}
        placeholder={t('emailPlaceHolder')}
      />

      <Button
        buttonText={t('resetPassword')}
        marginTop={wp(9)}
        onPress={() => resetPassword()}
      />
    </ScrollView>
  );
};

export default ResetPasswordScreen;
