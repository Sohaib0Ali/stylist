//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  container: {
    paddingBottom: Platform.OS === 'ios' ? hp(52) : hp(57),
  },

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
