//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
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
    marginVertical: hp(4),
    flexDirection: 'row',
  },
  simpleText: {
    color: colors.subHeading,
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
  },
});

export default styles;
