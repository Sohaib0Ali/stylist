//================================ React Native Imported Files ======================================//
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../BusinessUtills/assets/colors/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  socialIconsBg: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconBg: {},
  loginTextBg: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scale(15),
    alignSelf: 'center',
  },
  forgotBg: {},
  Facebook: {
    height: scale(48),
    width: scale(48),
  },
});

export default styles;
