//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(12),
  },
  body: {
    backgroundColor: colors.secondary,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: wp(0.4),
    marginBottom: hp(1.5),
    borderColor: colors.borderColor,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    fontFamily: fonts.bold,
    fontSize: wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
});

export default styles;
