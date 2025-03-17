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
  subContainerData: {
    flex: 1,
  },
  subContainer: {
    height: hp(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
