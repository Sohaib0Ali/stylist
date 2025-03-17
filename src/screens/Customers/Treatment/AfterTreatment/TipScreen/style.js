import {StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6) : 0,
    backgroundColor: colors.white,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === 'ios' ? hp(7) : hp(10),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
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
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  checkTextBg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: wp(5),
  },
  checkBox: {
    borderWidth: wp(0.5),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },
  checkBoxSelected: {
    borderWidth: wp(1.4),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },
  pickerContainer: {
    borderColor: colors.subHeading,
    borderWidth: 1,
    marginBottom: hp(1.5),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  leftContainer: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTextBg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
