//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
    backgroundColor: colors.white,
  },
  profileImgBg: {
    height: wp(55),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    marginTop: hp(1.5),
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  profileImgBg1: {
    height: wp(25),
    width: '47.8%',
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  profileImg1: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  textIconBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3.8),
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  imagesBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.8),
  },
});
export default styles;
