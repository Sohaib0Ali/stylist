//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {},
  titleTextBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  portfolioImgBg: {
    height: hp(24.5),
    borderRadius: wp(4),
    backgroundColor: colors.grey,
  },
  portfolioImg: {
    borderRadius: wp(4),
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
    height: hp(18.5),
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(18.5),
  },
  sliderImgBg: {
    width: '47.4%',
    height: hp(14.5),
    borderRadius: wp(4),
    backgroundColor: colors.grey,
  },
  sliderImg: {
    borderRadius: wp(4),
    width: '100%',
    height: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: wp(4.1),
    color: '#57429D',
    fontWeight: '500',
    marginRight: wp(4.1),
  },
  buttonBG: {
    marginTop: scale(15),
    borderColor: '#57429D',
    paddingVertical: hp(2.5),
    borderRadius: hp(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(15),
    marginHorizontal: scale(20),
    borderWidth: scale(1),
    flexDirection: 'row',
  },
  buttonText2: {
    fontSize: wp(4.1),
    color: '#57429D',
    fontWeight: '500',
    marginLeft: scale(15),
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
});

export default styles;
