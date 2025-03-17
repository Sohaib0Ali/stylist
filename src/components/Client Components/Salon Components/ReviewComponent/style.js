//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dpBg: {
    backgroundColor: colors.white,
    borderRadius: 99,
  },
  dp: {
    height: scale(40),
    width: scale(40),
    borderRadius: 99,
  },
  reviewTextBg: {
    marginLeft: wp(3),
  },
  reviewStarBg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: wp(4),
    height: hp(2.5),
    marginRight: wp(1.3),
  },
  rightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  sliderImgBg: {
    width: wp(24.5),
    height: hp(11.3),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  sliderImg: {
    borderRadius: wp(3),
    width: '100%',
    height: '100%',
  },
});

export default styles;
