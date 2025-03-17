import {StyleSheet} from 'react-native';
//================================ Local Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp(2),
    paddingHorizontal: wp('4%'),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: wp(2),
    paddingHorizontal: wp(6),
    marginRight: wp(3),
    paddingVertical: wp(1.6),
    borderRadius: wp(8),
    backgroundColor: colors.headingBlack,
  },
  leftTextStyle: {
    textAlign: 'center',
    fontSize: wp(3.9),
    width: '100%',
    fontWeight: '500',
    color: colors.white,
    fontFamily: fonts.medium,
  },
  rightContainer: {
    paddingTop: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    marginRight: wp(3),
    paddingVertical: wp(1.6),
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(8),
  },
  rightTextStyle: {
    textAlign: 'center',
    fontSize: wp(3.9),
    width: '100%',
    fontWeight: '500',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
});
export default styles;
