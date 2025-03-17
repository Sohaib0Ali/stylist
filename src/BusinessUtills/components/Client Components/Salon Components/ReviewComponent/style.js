import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2.5),
    paddingHorizontal: wp('4%'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dpBg: {
    width: wp(11),
    height: wp(11),
    backgroundColor: colors.white,
    borderRadius: wp(5.5),
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: wp(5.5),
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
    borderRadius: wp(5),
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    height: hp(6),
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
