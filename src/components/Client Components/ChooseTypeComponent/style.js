//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: wp(19),
    paddingVertical: hp(1.5),
    paddingLeft: wp(5.5),
    paddingRight: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginBottom: hp(2),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: colors.black,
  },
});

export default styles;
