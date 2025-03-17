//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(2),
    paddingLeft: wp(5),
    paddingRight: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    paddingTop: wp(1.3),
    marginRight: wp(3),
    width: wp(8),
    height: wp(8),
    borderWidth: 1,
    borderColor: '#D5D2CD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFFFFF',
  },

  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBg1: {
    paddingTop: wp(1.3),
    marginRight: wp(3),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFDE82',
  },
  imgBg: {
    marginRight: wp(3),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
    backgroundColor: '#FFFFFF',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },

  manIcon: {
    width: '100%',
    height: '100%',
  },
  catNameBg: {},
  name: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: wp(4.1),
    fontWeight: '600',
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
  address: {
    color: colors.black,
    width: wp(50),
    fontSize: wp(3),
    color: '#B7B6F7',
    fontWeight: '400',
  },
});

export default styles;
