//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  mainContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4.1),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dpBg: {
    width: wp(10.5),
    height: hp(5.5),
    backgroundColor: colors.white,
    borderRadius: 99,
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
  reviewTextBg: {
    marginLeft: wp(2),
  },
  reviewStarBg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  star: {
    width: wp(4),
    height: hp(2.5),
    marginRight: wp(1.3),
  },
  rightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  sliderImgBg: {
    width: wp(24.5),
    height: hp(11.3),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  sliderImg: {
    borderRadius: wp(3),
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    marginBottom: hp(2.1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp(4.1),
    fontWeight: '400',
    color: '#27232C',
  },
});

export default styles;
