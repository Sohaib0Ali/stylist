//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.subHeading,
    borderWidth: 1,
    marginBottom: hp(1.5),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    lineHeight: wp(3.2),
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fonts.regular,
  },
  leftContainer: {
    justifyContent: 'center',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
