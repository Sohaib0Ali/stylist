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
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  searchBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    marginTop: hp(2),
  },
  input: {
    width: '100%',
    fontFamily: fonts.medium,
    fontSize: wp(4.2),
    color: colors.headingBlack,
    selectionColor: colors.headingBlack,
  },
  backIcon: {
    width: wp(3),
    height: hp(3),
    marginRight: wp(3),
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
  iconBg: {
    width: wp(10.3),
    height: wp(10),
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.red,
    paddingVertical: hp(3),
    paddingHorizontal: wp(3),
    borderRadius: wp(5),
  },
  textArea: {
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    backgroundColor: colors.secondary,
    marginVertical: hp(3),
  },
  input: {
    backgroundColor: colors.secondary,
    fontFamily: fonts.bold,
    fontSize: wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
    textAlignVertical: 'top',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: hp(2),
  },

  sliderImgBg: {
    width: wp(24.5),
    height: hp(11.3),
    borderRadius: wp(3),
    marginRight: wp(3),
    backgroundColor: colors.borderColor,
  },
  sliderImg: {
    borderRadius: wp(3),
    width: '100%',
    height: '100%',
  },
  cameraBg: {
    width: wp(12.3),
    height: wp(12.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightRed,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  camera: {
    width: '55%',
    height: '55%',
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
});

export default styles;
