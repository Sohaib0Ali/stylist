//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../../BusinessUtills/assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  body: {},
  input: {
    borderWidth: wp(0.4),
    marginBottom: hp(1.5),
    borderColor: colors.borderColor,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    fontFamily: fonts.bold,
    height: scale(156),
    fontSize: wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
});
export default styles;
