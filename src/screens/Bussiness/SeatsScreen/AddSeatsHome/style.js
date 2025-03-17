//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  subContainer: {
    flex: 1,
    marginBottom: hp(15),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default styles;
