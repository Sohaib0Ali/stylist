//================================ React Native Imported Files ======================================//
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {verticalScale} from 'react-native-size-matters';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  splashText: {
    fontSize: wp(8),
    color: colors.splash,
    fontFamily: fonts.bold,
  },
  lineBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(22),
    alignSelf: 'center',
    marginTop: hp(4.5),
  },
  line: {
    width: wp(6.5),
    height: hp(0.4),
    backgroundColor: colors.borderColor,
  },
  selectedLine: {
    width: wp(6.5),
    height: hp(0.4),
    backgroundColor: colors.btnColor,
  },
  btnBottomView: {
    flex: 0.3,
    alignItems: 'center',
  },
  PagerView: {
    flex: 1,
  },
  sectionView: {
    alignItems: 'center',
    marginTop: verticalScale(25),
  },
  aboveBars: {
    width: wp(100),
  },
  imageView: {
    height: hp(42),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  imageStyle: {
    height: verticalScale(250),
    width: verticalScale(250),
    resizeMode: 'stretch',
  },
  titleText: {
    fontSize: verticalScale(18),
    color: colors.headingBlack,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  picker: {
    width: wp(40),
    alignSelf: 'center',
    paddingHorizontal: wp(3),
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(7) : hp(2),
    right: 0,
  },
  dotStyle: {
    width: wp(6.5),
    height: hp(0.4),
    backgroundColor: colors.borderColor,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    width: wp(6.5),
    height: hp(0.4),
    backgroundColor: colors.btnColor,
    marginHorizontal: 3,
  },
  paginationContainer: {
    position: 'absolute',
    top: verticalScale(-350),
    alignSelf: 'center',
  },
});

export default styles;
