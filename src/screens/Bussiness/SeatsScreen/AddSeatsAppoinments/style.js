//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  body: {
    paddingHorizontal: wp(4),
  },
  openDays: {
    backgroundColor: '#F6F5F3',
    height: hp(9),
    borderRadius: wp(3),
    flexDirection: 'row',
    marginBottom: hp(2.1),
  },
});

export default styles;
