//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import {scale} from 'react-native-size-matters';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  container: {
    marginTop: scale(35),
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: wp('4%'),
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.btnColor,
    width: wp(15.5),
    height: wp(0.7),
  },
  inActive: {
    backgroundColor: colors.borderColor,
    width: wp(15.5),
    height: wp(0.7),
  },
  body: {
    flex: 1,
    paddingTop: hp(4.5),
    paddingBottom: hp(2),
  },
});
export default styles;
