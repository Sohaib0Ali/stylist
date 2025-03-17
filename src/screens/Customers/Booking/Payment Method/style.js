import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.white,
    marginTop: hp(-2),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
    marginTop: hp(3),
  },
  paymentBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(3),
    paddingBottom: hp(1.5),
  },
  iconTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: wp(0.5),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
  },

  checkBoxSelected: {
    borderWidth: wp(1.4),
    borderColor: colors.headingBlack,
    borderRadius: wp(33),
    width: wp(5),
    height: wp(5),
  },
});
export default styles;
