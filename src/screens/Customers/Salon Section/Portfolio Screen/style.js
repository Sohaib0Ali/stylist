//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? hp(52) : hp(57),
    paddingHorizontal: wp('4%'),
  },
  titleTextBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  portfolioImgBg: {
    height: hp(29),
    borderRadius: wp(4),
  },
  portfolioImg: {
    borderRadius: wp(4),
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
    height: hp(18.5),
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(18.5),
  },
  sliderImgBg: {
    width: '47.4%',
    height: hp(15),
    borderRadius: wp(4),
  },
  sliderImg: {
    borderRadius: wp(4),
    width: '100%',
    height: '100%',
  },
});

export default styles;
