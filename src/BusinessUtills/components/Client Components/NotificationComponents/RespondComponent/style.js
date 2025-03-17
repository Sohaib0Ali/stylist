//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    marginHorizontal: wp('4%'),
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(4),
    marginBottom: hp(3),
    borderWidth: wp(0.5),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10.2),
    height: wp(10.2),
    borderColor: colors.borderColor,
    borderWidth: wp(0.5),
    borderRadius: wp(33),
    marginRight: wp(3),
  },
  iconContainer1: {
    width: 40,
    height: 40,
    padding: wp(2.5),
    borderColor: colors.borderColor,
    borderWidth: wp(0.5),
    borderRadius: wp(44),
    marginRight: wp(3),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textContainer: {},
  animatedTextBg: {
    backgroundColor: colors.btnColor,
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
    // marginLeft: wp(1),
    marginRight: wp(4),
  },
  actionImage: {
    tintColor: colors.white,
    width: wp(17.1),
    height: wp(4),
  },
});

export default styles;
