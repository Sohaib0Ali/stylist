//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.white,
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
    height: hp(10.5),
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
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(2.5),
  },
  iconBg: {
    width: wp(10.3),
    height: hp(5.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  icon: {
    width: '45%',
    height: '45%',
  },
});

export default styles;
