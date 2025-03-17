//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  borderStyleBase: {
    borderColor: 'red',
  },

  borderStyleHighLighted: {
    borderColor: 'Yellow',
    borderWidth: 1,
  },
  underlineStyleBase: {
    width: wp(10.4),
    height: wp(12.5),
    paddingTop: 3,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: '#D5D2CD',
    color: colors.black,
    fontSize: wp(4),
    fontFamily: fonts.semiBold,
  },

  underlineStyleHighLighted: {
    borderColor: '#D5D2CD',
    borderWidth: 1,
  },

  simpleText: {
    color: colors.subHeading,
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
    alignSelf: 'center',
    marginTop: hp(4),
  },
  alreadyHaveCodeBg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(3),
    marginBottom: hp(1),
  },
});
export default styles;
