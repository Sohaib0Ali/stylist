//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  dpBg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    borderWidth: wp(0.3),
    borderRadius: 22,
    borderColor: colors.borderColor,
    paddingHorizontal: wp(2.5),
    backgroundColor: colors.lightRed,
    position: 'absolute',
    top: 0,
    left: wp(43),
  },
  imgBg: {
    backgroundColor: colors.grey,
    width: wp(20),
    height: wp(20),
    borderRadius: wp(44),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(44),
  },
  reviewStarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  review: {
    fontSize: wp(3.5),
    color: colors.grey,
    fontFamily: fonts.regular,
  },
  star: {
    width: wp(6),
    height: hp(3),
    alignSelf: 'baseline',
    marginRight: wp(1.3),
  },

  tgText: {
    color: colors.subHeading,
    fontSize: wp(3.6),
    fontFamily: fonts.semiBold,
  },
  nameTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  dayTimeBg: {
    paddingBottom: wp(2),
  },
  dayTimeBgBottom: {
    paddingTop: wp(2),
  },
  days: {
    color: colors.grey,
  },
});

export default styles;
