//================================ React Native Imported Files ======================================//

import React from 'react';
import {ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//
import Title from '../../../components/Title/Title';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OTPTextInput from 'react-native-otp-textinput';
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
        <Title title={t('wrongCode')} marginBottom={hp(1)} marginTop={hp(3)} />
        <SmallText text={t('enterCorrectCode')} marginBottom={hp(3.5)} />
        <OTPTextInput
          inputCount={6}
          containerStyle={{}}
          handleTextChange={code => {}}
          textInputStyle={{
            borderColor: '#000000',
            borderWidth: 2,
            addingHorizontal: wp(6),
          }}
          offTintColor="gray"
          tintColor="gray"
        />
        <Button
          buttonText={t('resendCode')}
          marginTop={hp(4)}
          onPress={() => navigation.navigate('OTP_SCREEN')}
        />
      </ScrollView>
    </>
  );
};

export default ResendOtpScreen;
