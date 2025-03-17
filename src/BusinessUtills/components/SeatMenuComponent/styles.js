import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    height: hp(6),
    borderRadius: wp(8),
    backgroundColor: colors.headingBlack,
  },
  leftTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.white,
    fontFamily: fonts.medium,
  },
});
export default styles;
