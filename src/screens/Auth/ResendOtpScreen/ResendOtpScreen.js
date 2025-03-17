//================================ React Native Imported Files ======================================//
import React from 'react';
import {ScrollView} from 'react-native';
//================================ Local Imported Files ======================================//
import Title from '../../../components/Title/Title';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../../../components/Button/Button';
import Header from '../../../components/Header/Header';
import styles from './style';
import SmallText from '../../../components/SmallText/SmallText';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ResendOtpScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Title title={t('wrongCode')} marginBottom={hp(1)} marginTop={hp(3)} />
      <SmallText text={t('enterCorrectCode')} marginBottom={hp(3.5)} />
      <OTPInputView
        style={{width: '100%', height: 80}}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {}}
      />

      <Button
        buttonText={t('resendCode')}
        marginTop={hp(4)}
        onPress={() => navigation.navigate('OTP_SCREEN')}
      />
    </ScrollView>
  );
};

export default ResendOtpScreen;
