//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  mapBg: {width: wp(100), height: hp(100)},
  map: {
    flex: 1,
  },
  body: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
  },
  buttonBg: {
    position: 'absolute',
    height: hp(15),
    bottom: hp(15),
    left: wp('4%'),
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dpBg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    borderWidth: wp(0.3),
    borderRadius: 22,
    // width:100,
    borderColor: colors.borderColor,
    paddingHorizontal: wp(0.5),
    backgroundColor: colors.lightRed,
    position: 'absolute',
    top: 0,
    marginLeft: wp(1),
    left: wp(13),
  },
  imgBg: {
    backgroundColor: colors.grey,
    width: wp(16.5),
    height: wp(16.5),
    borderRadius: wp(44),
  },
  img: {
    width: wp(16.5),
    height: wp(16.5),
    borderRadius: wp(44),
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
