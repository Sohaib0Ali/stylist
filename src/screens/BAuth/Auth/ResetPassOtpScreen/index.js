//================================ React Native Imported Files ======================================//

import React from 'react';
import { ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OTPTextInput from 'react-native-otp-textinput';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

//================================ Local Imported Files ======================================//

import Title from '../../../components/Title/Title';
import styles from './style';
import Header from '../../../components/Header/Header';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmallText from '../../../components/SmallText/SmallText';
import BConfig from '../../../config/config';
import { showDanger, showSuccess } from '../../../../utils/FlashMessage';

const ResetPassOtpScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const validateOTP = otp => {
    var configOtp = {
      method: 'patch',
      url: `${BConfig.baseUrl}business/verifyForgotPasswordOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: route?.params?.email,
        otp: otp,
      }),
    };
    axios(configOtp)
      .then(response => {
        showSuccess(t('otpVerified'));
        navigation.navigate('CREATE_NEW_PASSWORD_SCREEN');
      })
      .catch(error => {
        if (error.response) {
          showDanger(error?.response?.data?.msg);
        }
      });
  };

  const resendforgotPasswordOTP = () => {
    var configOtp = {
      method: 'post',
      url: `${BConfig.baseUrl}business/resendForgotPasswordOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: route?.params?.email,
      }),
    };
    axios(configOtp)
      .then(response => {
        let res = response.data;
        if (res) {
          showSuccess(t('forgotPasswordOtpSend'));
        }
      })
      .catch(error => {
        if (error.response) {
          showDanger(error?.response?.data?.msg);
        }
      });
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Header
        headerBack={true}
        headerColor={'white'}
        direction={'RTL'}
        onBackPress={() => navigation.goBack()}
      />
      <Title
        title={t('verifyYourEmail')}
        marginTop={hp(3)}
        marginBottom={hp(1)}
      />
      <SmallText text={t('enter4DigitCode')} />
      <SmallTitle
        title={route?.params?.email}
        width={wp(100)}
        marginTop={hp(1.3)}
        marginBottom={hp(3)}
      />
      <OTPTextInput
        inputCount={6}
        containerStyle={{}}
        handleTextChange={code => {
          validateOTP(code);
        }}
        textInputStyle={{
          borderColor: '#000000',
          borderWidth: 2,
          addingHorizontal: wp(6),
        }}
        offTintColor="gray"
        tintColor="gray"
      />

      <TouchableOpacity
        style={styles.alreadyHaveCodeBg}
        onPress={() => {
          resendforgotPasswordOTP();
        }}>
        <SmallTitle title={t('resendVerification')} width={wp(100)} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassOtpScreen;
