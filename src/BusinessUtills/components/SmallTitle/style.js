//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginVertical: wp(9),
    fontSize: wp(8),
    color: colors.black,
    fontFamily: fonts.bold,
  },
});

export default styles;
