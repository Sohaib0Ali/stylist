//================================ React Native Imported Files ======================================//

import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: { height: hp(95), justifyContent: 'space-between' },
  modalBg: {
    width: '100%',
    backgroundColor: colors.white,
    padding: wp(3),
    borderRadius: wp(1),
  },
  optionBg: {},
  option: {
    color: colors.black,
    marginBottom: 5,
    fontFamily: fonts.semiBold,
  },
  phoneBg: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(2),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  phoneContainer: {
    borderRadius: wp(2),
    width: '100%',
    backgroundColor: colors.secondary,
  },
  textInput: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  socialIconsBg: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconBg: {},
  loginTextBg: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  simpleText: {
    color: colors.subHeading,
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
  },
  imgBackground: {
    height: scale(124),
    width: scale(124),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE1E6',
    justifyContent: 'center',
    borderRadius: scale(16),
  },
  sheetTitile: {
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: scale(15),
    color: '#000000',
  },
  sheetSubTitile: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: scale(8),
    marginHorizontal: scale(52),
    textAlign: 'center',
    color: '#5E5E5F',
  },
  mailBtn: {
    height: scale(58),
    width: scale(214),
    backgroundColor: '#57429D',
    alignSelf: 'center',
    marginTop: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(16),
  },
});

export default styles;
