import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  minContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '22%',
  },
  body: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    backgroundColor: colors.white,
    marginTop: hp(-2),
    paddingBottom: hp(3),
  },
  toggle: {
    backgroundColor: colors.borderColor,
    width: wp(8.5),
    height: hp(0.5),
    alignSelf: 'center',
    marginTop: hp(1.2),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  imgBg: {
    width: wp(12.9),
    height: wp(12.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  priceBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    alignItems: 'center',
  },

  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 120,
    height: 60,
    display: 'flex',
  },
  itemBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(0.5),
    marginRight: wp(3),
    marginBottom: wp(3),
    borderRadius: wp(133),
    backgroundColor: colors.yellow,
  },
  FAB: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
  },
});
export default styles;
