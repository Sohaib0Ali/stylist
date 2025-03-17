//================================ React Native Imported Files ======================================//
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import styles from './style';
import Input from '../../../components/Input/Input';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import SimpleText from '../../../components/SimpleText/SimpleText';
import BConfig from '../../../config/config';
import { useTranslation } from 'react-i18next';
import { showWarning } from '../../../../utils/FlashMessage';
import BackIcon from '../../../components/BackIcon/BackIcon';

const ResetPasswordScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    var configOtp = {
      method: 'patch',
      url: `${BConfig.baseUrl}business/forgotPassword`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
      },
    };
    axios(configOtp)
      .then(response => {
        navigation.navigate('RESET_PASSWORD_OTP_SCREEN', { email: email });
      })
      .catch(error => {
        if (error.response) {
          showWarning(error?.response?.data?.msg);
        }
      });
  };

  return (
    <>
      <BackIcon />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
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
    </>
  );
};

export default ResetPasswordScreen;
