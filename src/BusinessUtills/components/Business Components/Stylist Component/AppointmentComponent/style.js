//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: wp(4.5),
    marginHorizontal: wp('4%'),
    paddingVertical: hp(0.8),
    paddingVertical: 16,
    paddingLeft: wp(2),
    paddingRight: wp(5),
    marginBottom: hp(2),
    elevation: 10,
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBg1: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: '#D5D2CD',
    borderWidth: 1,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(2.4),
  },
  imgBg: {
    width: wp(14.9),
    height: wp(15.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5D2CD',
    backgroundColor: colors.white,
    borderRadius: wp(77),
    marginRight: wp(2),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  name: {
    color: colors.headingBlack,
    fontFamily: fonts.semiBold,
    fontSize: wp(4.1),
  },
  time: {
    fontSize: wp(3.1),
  },
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  confirmlable: {marginBottom: wp(4.1), color: 'black'},
  price: {
    color: colors.headingBlack,
    fontFamily: fonts.bold,
    fontSize: wp(4.1),
  },
  cat: {
    color: colors.black,
  },
});

export default styles;
