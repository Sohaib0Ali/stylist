//================================ React Native Imported Files ======================================//
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Header/Header';

//================================ Local Imported Files ======================================//

import styles from './style';
import Button from '../../../components/Button/Button';
import SimpleText from '../../../components/SimpleText/SimpleText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import Email from '../../../assets/icons/email.svg';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import colors from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const CheckEmailScreen = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.body}>
        <View style={styles.emailIconBg}>
          <Email width={wp(10)} height={hp(9)} />
        </View>
        <MediumTitle
          title={t('checkeEmail')}
          alignSelf="center"
          marginTop={hp(3)}
        />
        <SimpleText
          marginTop={0}
          marginBottom={hp(3)}
          textAlign="center"
          text={t('passwordInstruction')}
        />

        <Button
          buttonText={t('openEmail')}
          onPress={() => navigation.navigate('CREATE_NEW_PASSWORD_SCREEN')}
        />
      </View>

      <TouchableOpacity
        style={styles.emailTextBg}
        onPress={() => navigation.navigate('REGISTER_SCREEN')}>
        <Text style={styles.simpleText}>
          {t('checkEmailSpam')}
          <SmallTitle title={t('another')} color={colors.blue} />
          <SmallTitle title={t('emailAddress')} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CheckEmailScreen;
