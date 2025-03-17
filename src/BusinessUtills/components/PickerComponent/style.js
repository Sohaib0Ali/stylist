//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.subHeading,
    borderWidth: 1,
    marginTop: hp(1),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: hp(1.6),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
  },
  value: {
    fontSize: wp(4),
    color: colors.black,
  },
  leftContainer: {
    justifyContent: 'center',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {
    height: scale(10),
    width: scale(15),
  },
});
export default styles;
