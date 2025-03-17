//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? hp(52) : hp(57),
  },
});

export default styles;
