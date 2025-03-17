//================================ React Native Imported Files ======================================//
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  profileImgBg: {
    height: verticalScale(200),
    width: '95%',
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    alignSelf: 'center'
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
    resizeMode: 'stretch',
  },
  textIconBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3.6),
  },
  logoBg: {
    width: wp(24.5),
    height: wp(24.5),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(22),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: wp(22),
  },
  modalContainer: {
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  modalButton: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: scale(60),
  },
});
export default styles;
