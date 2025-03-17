//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerBody: {
    paddingHorizontal: wp(4, 1),
    marginBottom: hp(5),
  },
  profileImgBg: {
    height: wp(60),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  textIconBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3.6),
    marginBottom: hp(5.1),
  },
  logoBg: {
    width: wp(24.5),
    height: wp(24.5),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(22),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  input: {
    marginTop: hp(2.1),
    borderWidth: wp(0.4),
    marginBottom: hp(1.5),
    borderColor: colors.borderColor,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    fontFamily: fonts.bold,
    fontSize: wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: wp(22),
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  bodyOpenDays: {
    marginBottom: hp(4.1),
    marginTop: wp(4),
    borderRadius: wp(4),
    paddingVertical: wp(6.5),
    paddingHorizontal: wp(3.8),

    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lableSlot: {
    width: '50%',
  },
  dayTimeBg: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
export default styles;
