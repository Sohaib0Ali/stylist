import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  body: {flex: 1},
  FAB: {
    alignSelf: 'center',
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
  iconBg: {
    width: wp(10.3),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  icon: {
    width: '45%',
    height: '45%',
  },
  textArea: {
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(3),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    backgroundColor: colors.secondary,
    marginVertical: hp(3),
    marginHorizontal: wp(4),
  },
  input: {
    backgroundColor: colors.secondary,
    fontFamily: fonts.bold,
    fontSize: wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
    textAlignVertical: 'top',
  },
});
export default styles;
