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
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
  },
  btnText: {
    fontSize: wp(4.3),
    color: colors.blue,
    fontFamily: fonts.semiBold,
  },
  divider: {
    height: hp(0.2),
    width: wp(100),
    backgroundColor: colors.borderColor,
    marginTop: wp(1.5),
  },
  optionBg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    color: colors.subHeading,
    fontSize: wp(5.5),
    fontFamily: fonts.medium,
    marginVertical: hp(0.3),
  },
});

export default styles;
