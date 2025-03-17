//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.5),
    borderColor: colors.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    borderRadius: wp(4),
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: colors.lightRed,
    position: 'absolute',
    bottom: 0,
    paddingVertical: hp(1.5),
    borderBottomRightRadius: wp(4),
    borderBottomLeftRadius: wp(4),
  },
});
export default styles;
