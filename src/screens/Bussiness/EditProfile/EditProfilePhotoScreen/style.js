//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: wp(4),
  },
  profileImgBg: {
    height: wp(60),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
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
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
});
export default styles;
