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
    borderRadius: wp(19),
    paddingVertical: hp(0.8),
    marginHorizontal: wp('4%'),
    paddingLeft: wp(2),
    paddingRight: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.02,
    elevation: 3,
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
    backgroundColor: colors.white,
    borderColor: '#D5D2CD',
    borderWidth: 1,
    borderRadius: wp(77),
    marginRight: wp(2),
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
    fontSize: wp(4),
  },
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    color: colors.headingBlack,
    fontSize: wp(3.6),
  },
  cat: {
    color: colors.black,
  },
});

export default styles;
