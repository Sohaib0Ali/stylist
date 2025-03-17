//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  searchBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginTop: hp(2),
  },
  input: {
    width: '100%',
    fontFamily: fonts.medium,
    fontSize: wp(4.2),
    color: colors.headingBlack,
    selectionColor: colors.headingBlack,
  },
  icon: {
    width: wp(4),
    height: hp(4),
    marginRight: wp(3),
  },
  iconTextBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginTop: hp(2),
  },
  medText: {
    fontFamily: fonts.medium,
    fontSize: wp(4),
    color: colors.headingBlack,
  },
  locationIcon: {
    width: wp(5),
    height: hp(4),
    marginRight: wp(3),
  },
  body: {
    paddingHorizontal: wp('4%'),
  },
  buttonBg: {
    position: 'absolute',
    bottom: hp(4),
    left: wp('4%'),
    width: '92%',
  },
});

export default styles;
