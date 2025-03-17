//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//
import Title from '../../../components/Title/Title';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import colors from '../../../assets/colors/colors';
import Header from '../../../components/Header/Header';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SmallText from '../../../components/SmallText/SmallText';
import axios from 'axios';
import Config from '../../../config/config';
import {showWarning, showSuccess} from '../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

const ResetPassOtpScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const email = route.params.email;

  const resendOtp = async () => {
    setLoading(true);
    var config = {
      method: 'post',
      url: `${Config.baseUrl}resendForgotPasswordOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: route.params.email,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        if (response.data.success === true) {
          showSuccess(response.data.msg);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const validateOTP = otp => {
    var configOtp = {
      method: 'patch',
      url: `${Config.baseUrl}verifyForgotPasswordOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: route.params.email,
        forgotPasswordOtp: otp,
      },
    };
    axios(configOtp)
      .then(response => {
        if (response.status === Config.statusCode) {
          navigation.navigate('CREATE_NEW_PASSWORD_SCREEN', {
            token: response.data.token,
            email: email,
          });
        } else {
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
      <Title
        title={t('confirmYourNumber')}
        marginTop={hp(3)}
        marginBottom={hp(1)}
      />
      <SmallText text={t('enterSixDigitCodeText')} />
      <SmallTitle title={email} marginTop={hp(1.3)} marginBottom={hp(3)} />
      <OTPInputView
        style={{height: wp(21), paddingHorizontal: wp(6)}}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          validateOTP(code);
        }}
      />
      <TouchableOpacity
        style={styles.alreadyHaveCodeBg}
        onPress={() => resendOtp()}>
        <SmallTitle title={t('alreadySigned')} />
        <SmallTitle title={t('resend')} color={colors.btnColor} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassOtpScreen;
