//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(12),
  },
  body: {
    backgroundColor: colors.secondary,
  },
});

export default styles;
