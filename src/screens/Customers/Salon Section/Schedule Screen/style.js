//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? hp(52) : hp(57),
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.white2,
  },
  body: {
    height: scale(156),
    width: '95%',
    alignSelf: 'center',
    marginTop: wp(4),
    borderRadius: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    backgroundColor: colors.white,
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  dayTimeBg: {
    padding: wp(3),
  },
  days: {
    color: colors.grey,
  },
  time: {},
});

export default styles;
