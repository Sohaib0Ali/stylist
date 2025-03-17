//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {fonts} from 'react-native-elements/dist/config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  body: {},
  container: {
    borderColor: colors.subHeading,
    borderWidth: wp(0.4),
    marginBottom: hp(1.5),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: wp(2),
    alignSelf: 'flex-end',
  },
  input: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    fontFamily: fonts.bold,
    height: Platform.OS == 'ios' ? hp(4) : hp(5.5),
    fontSize: wp(4.4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
