//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.secondary,
  },
  body: {
    marginBottom: hp(12),
  },
  ToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
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
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(8),
  },
  rightTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
  selectLanguge: {
    height: 30,
    width: 31,
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    right: wp(4),
    marginTop: hp(0),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  textLan: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop: 10,
    height: hp(20),
    width: wp(32),
    borderRadius: wp(5),
    shadowColor: '#00000d',
  },
  iconBg2: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFDE82',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 6,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#F6F5F3',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: wp(5),
    padding: wp(1),
    width: wp(20), //wp(42),
    height: hp(10), //wp(55),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
