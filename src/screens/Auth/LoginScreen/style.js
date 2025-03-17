//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    paddingHorizontal: wp('4%'),
    backgroundColor: colors.secondary,
  },
  socialIconsBg: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconBg: {},
  loginTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotBg: {
    marginTop: hp(1),
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: wp(4.2),
    color: colors.headingBlack,
    fontFamily: fonts.medium,
    fontWeight: '600',
    marginLeft: 2,
  },
  Facebook: {
    height: scale(48),
    width: scale(48),
  },
});

export default styles;
