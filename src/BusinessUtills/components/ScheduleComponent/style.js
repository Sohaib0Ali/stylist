//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? hp(6) : hp(6.8),
    paddingHorizontal: wp('4%'),
  },
  body: {
    borderRadius: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    backgroundColor: colors.white,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  dayTimeBg: {
    padding: wp(3),
  },
  days: {
    color: colors.grey,
  },
});

export default styles;
