import {StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6) : 0,
    backgroundColor: colors.black,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(17) : hp(10),
    height: hp(100),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
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
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(2),
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
  phoneBg: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(2),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  phoneContainer: {
    bottom: wp(1),
    width: '100%',
    backgroundColor: colors.secondary,
  },
  textInput: {
    paddingVertical: 0,
    backgroundColor: colors.secondary,
  },
  itemBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginRight: wp(3),
    marginBottom: wp(3),
    borderRadius: wp(133),
    backgroundColor: colors.yellow,
    marginTop: wp(1),
  },
  FAB: {
    position: 'absolute',
    top: 616,
    alignSelf: 'center',
  },
});
export default styles;
