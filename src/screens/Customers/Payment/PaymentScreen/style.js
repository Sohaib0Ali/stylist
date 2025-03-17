//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  body: {
    backgroundColor: colors.secondary,
    paddingTop: hp(5),
  },
  itemBg: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
