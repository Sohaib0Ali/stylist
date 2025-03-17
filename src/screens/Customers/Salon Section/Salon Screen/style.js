//================================ React Native Imported Files ======================================//
import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  body: {
    paddingBottom: Platform.OS === 'ios' ? hp(5) : null,
    flex: 1,
    backgroundColor: colors.white200,
  },
});

export default styles;
