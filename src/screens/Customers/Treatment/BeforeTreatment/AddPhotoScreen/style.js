import {StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6) : 0,
    backgroundColor: colors.white,
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
  imgBg: {
    width: wp(42),
    height: wp(40),
    borderRadius: wp(4),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(4),
  },
});
export default styles;
