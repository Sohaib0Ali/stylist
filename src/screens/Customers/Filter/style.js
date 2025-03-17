//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6) : 0,
    backgroundColor: colors.secondary,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === 'ios' ? hp(7) : hp(10),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  headerBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetBg: {
    alignSelf: 'center',
  },
  slider: {
    marginBottom: hp(3),
  },
  FAB: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: wp(3),
  },
});

export default styles;
