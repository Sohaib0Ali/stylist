//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

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
    width: wp(10.5),
    height: hp(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
    color: colors.black,
    fontSize: wp(5),
    fontFamily: fonts.semiBold,
  },

  underlineStyleHighLighted: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  smallText: {
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
    color: colors.grey,
    alignSelf: 'center',
    marginBottom: hp(4),
  },
  simpleText: {
    color: colors.subHeading,
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
    alignSelf: 'center',
    marginTop: hp(4),
  },
});
export default styles;
