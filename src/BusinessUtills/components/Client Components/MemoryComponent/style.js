import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: wp('4%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp(4),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBg: {
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    height: wp(8.5),
    width: wp(8.5),
    borderRadius: wp(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: wp('4%'),
  },
  imgBg: {
    width: wp(39),
    height: wp(37),
    borderRadius: wp(4),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(4),
  },
});
export default styles;
