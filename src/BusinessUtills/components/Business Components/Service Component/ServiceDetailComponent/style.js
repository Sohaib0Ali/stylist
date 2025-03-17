//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    height: verticalScale(75),
    flexDirection: 'row',
    marginTop: verticalScale(10),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    elevation: 3,
  },
  imgTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
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
    padding: wp(2.4),
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.0,
    elevation: 10,
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
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {marginLeft: scale(10)},
  name: {
    fontWeight: '400',
    fontSize: 16,
  },
  priceBg: {
    width: '30%',
    flexDirection: 'row',
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
