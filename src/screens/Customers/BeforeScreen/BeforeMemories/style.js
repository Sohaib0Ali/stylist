import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  body: {flex: 1},
  FAB: {
    position: 'absolute',
    bottom: 335,
    alignSelf: 'center',
  },
});
export default styles;
