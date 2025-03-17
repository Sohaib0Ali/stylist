//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: colors.btnColor,
  },
  Container: {
    width: '100%',
    height: hp(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  Discover: {
    alignSelf: 'center',
    fontSize: wp(8),
    color: colors.secondary,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  searchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  search: {
    width: wp(15),
    height: hp(15),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  Drawer: {
    width: wp(10),
    height: hp(15),
    resizeMode: 'contain',
  },
  Line: {
    width: wp(15),
    height: hp(0.7),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: hp(1),
    borderRadius: 10,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtericon: {
    height: hp(17),
    width: wp(17),
  },
});

export default styles;
