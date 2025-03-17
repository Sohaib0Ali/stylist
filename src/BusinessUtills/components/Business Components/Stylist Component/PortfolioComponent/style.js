//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

//================================ Local Imported Files ======================================//

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
});

export default styles;
