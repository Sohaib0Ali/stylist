//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white200,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: hp(1.3),
    borderRadius: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginBottom: hp(2),
    shadowOffset: {
      width: wp(0),
      height: 60,
    },
    shadowOpacity: 0.01,
    elevation: 10,
    paddingHorizontal: scale(10),
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBg1: {
    width: wp(14.9),
    height: wp(15.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(2.4),
  },
  imgBg: {
    width: wp(14.9),
    height: wp(15.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  name: {
    color: colors.headingBlack,
    fontFamily: fonts.semiBold,
    fontSize: wp(4),
  },
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: colors.headingBlack,
    fontFamily: fonts.bold,
    fontSize: wp(5),
  },
  cat: {
    fontFamily: fonts.medium,
    color: colors.subHeading,
  },
  selected: {
    height: scale(18),
    width: scale(18),
    alignSelf: 'center',
    marginHorizontal: scale(10),
  },
  rating: {
    height: scale(12),
    width: scale(12),
  },
});

export default styles;
