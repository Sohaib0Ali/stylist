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
import ShareData from '../../../../Utils/ShareData';
import {showWarning, showSuccess} from '../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';
import CustomeLoader from '../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';

const OtpScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  let phoneNum = route.params.phone;

  const resendOtp = async () => {
    setLoading(true);
    var config = {
      method: 'post',
      url: `${Config.baseUrl}resendOtp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phoneNo: phoneNum,
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
        showWarning(TryAgain);
        setLoading(false);
      });
  };

  const validateOTP = otp => {
    var configOtp = {
      method: 'post',
      url: `${Config.baseUrl}verify_Otp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phoneNo: route.params.phone,
        otp: otp,
      },
    };
    axios(configOtp)
      .then(async response => {
        if (response.status === Config.statusCode) {
          await ShareData.getInstance().setShareData(response.data);
          navigation.navigate('LOGIN_SCREEN');
        } else {
          showWarning(t('InvalidEmailPassword'));
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
      <SmallTitle
        title={route.params.phone}
        marginTop={hp(1.3)}
        marginBottom={hp(3)}
      />
      <OTPInputView
        style={{height: wp(21), paddingHorizontal: wp(6)}}
        pinCount={6}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState()}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          // setOtpCode(code)
          validateOTP(code);
        }}
      />
      <TouchableOpacity
        style={styles.alreadyHaveCodeBg}
        onPress={() => resendOtp()}>
        <SmallTitle title={t('alreadySigned')} />
        <SmallTitle title={t('resend')} color={colors.btnColor} />
      </TouchableOpacity>

      <CustomeLoader visible={loading} />
    </ScrollView>
  );
};

export default OtpScreen;
