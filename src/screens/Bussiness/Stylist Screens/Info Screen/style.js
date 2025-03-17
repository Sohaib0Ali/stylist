//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  container: {
    paddingHorizontal: wp('4%'),
    height: scale(410),
  },
  historyBox: {
    height: hp(12),
    backgroundColor: '#F6F5F3',
    borderRadius: hp(2.1),
    justifyContent: 'space-evenly',
    marginBottom: hp(3.8),
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  button: {
    marginTop: scale(15),
    backgroundColor: '#57429D',
    paddingVertical: hp(2.5),
    borderRadius: hp(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(130),
  },
  buttonText: {
    fontSize: wp(4.1),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  jobBox: {
    height: hp(16),
    width: wp(28),
    backgroundColor: '#F2F2FD',
    marginRight: wp(3.8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3.8),
    borderRadius: hp(1),
  },
  jobBoxQ: {
    fontSize: wp(5.5),
    color: '#57429D',
    fontWeight: '600',
    marginBottom: hp(0.8),
  },
  jobBoxP: {
    fontSize: wp(3.2),
    color: '#5E5E5F',
  },
  body: {},
  ToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(8),
    backgroundColor: colors.headingBlack,
  },
  leftTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.white,
    fontFamily: fonts.medium,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(8),
  },
  rightTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
});

export default styles;
