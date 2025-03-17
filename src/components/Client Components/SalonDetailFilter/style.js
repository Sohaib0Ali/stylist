//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    marginVertical: hp(4),
    position: 'absolute',
  },
  topContainer: {
    marginVertical: hp(2.2),
    paddingHorizontal: wp('4%'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewStarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('35%'),
  },
  review: {
    fontSize: wp(3.5),
    color: colors.grey,
    fontFamily: fonts.regular,
  },
  star: {
    width: wp(6),
    height: hp(3),
    alignSelf: 'baseline',
  },

  tgText: {
    color: colors.subHeading,
    fontSize: wp(3.6),
    fontFamily: fonts.semiBold,
  },
  iconTextBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightRed,
    borderRadius: wp(5),
    paddingVertical: hp(0.5),
    paddingHorizontal: hp(1),
  },
  clockIcon: {
    width: wp(4),
    height: hp(3),
  },
  time: {
    marginLeft: wp(1.2),
    color: colors.red,
    fontFamily: fonts.regular,
    fontSize: wp(3.6),
  },
  smallText: {
    color: colors.black,
    fontSize: wp(3.5),
    fontFamily: fonts.semiBold,
  },
});

export default styles;
