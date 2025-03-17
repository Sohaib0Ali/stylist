import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import images from '../../assets/images/images';
import { scale } from 'react-native-size-matters';
import SemiTitle from '../SemiTitle';
import fonts from '../../assets/fonts/fonts';
import { useTranslation } from 'react-i18next';

const AuthenticationModel = ({
  onPress,
  registration,
  maybelater,
  issignup,
  later,
}) => {
  const { t } = useTranslation();
  const text =
    'Sign up for our Service and Experience wide range  of modern haircuts styles';
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={{
          paddingHorizontal: wp(7),
          alignSelf: 'flex-start',
          paddingVertical: wp(6),
        }}
        onPress={() => onPress()}>
        <Image
          style={styles.cancleIcon}
          source={images.close}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <SemiTitle
        title={text}
        fontSize={scale(20)}
        weight={'600'}
        fontFamily={fonts.Exo2Bold}
        color={'#57429D'}
        alignSelf={'center'}
        textAlign={'center'}
        lineHeight={scale(40)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: scale(30),
          marginTop: scale(50)
        }}>
        <TouchableOpacity
          style={[styles.boxStyle, { backgroundColor: later ? '#57429D' : null }]}
          onPress={() => maybelater()}>
          <Text
            style={[styles.boxTitle, { color: later ? '#FFFFFF' : '#57429D' }]}>
            {t('Maybe Later')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.boxStyle,
            {
              backgroundColor: issignup ? '#57429D' : null,
              marginLeft: scale(15),
            },
          ]}
          onPress={() => registration()}>
          <Text
            style={[
              styles.boxTitle,
              { color: issignup ? '#FFFFFF' : '#57429D' },
            ]}>
            {t('signUp')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthenticationModel;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
  },
  modalContainer: {
    height: scale(320),
    width: scale(300),
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: scale(21),
  },
  cancleIcon: {
    width: scale(25),
    height: scale(25),
    tintColor: colors.black,
  },
  boxStyle: {
    width: scale(117),
    height: scale(42),
    borderWidth: 1,
    borderRadius: scale(12),
    borderColor: '#57429C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
  },
});
