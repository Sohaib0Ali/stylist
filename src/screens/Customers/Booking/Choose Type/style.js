import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  body: {
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.secondary,
    marginTop: hp(-2),
    paddingBottom: Platform.OS === 'ios' ? hp(7) : hp(2),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
    paddingHorizontal: wp('4%'),
  },
  imgBg: {
    width: wp(12.9),
    height: wp(12.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  cat: {
    color: colors.grey,
    fontFamily: fonts.semiBold,
    fontSize: wp(3),
  },
  FAB: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
  },
});
export default styles;
