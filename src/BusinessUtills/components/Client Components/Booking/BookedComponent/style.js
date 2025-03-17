//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: wp('4%'),
    height: hp(9.8),
    paddingHorizontal: wp(3),
    borderRadius: wp(4),
    marginBottom: hp(2.5),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },
  container: {},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10.2),
    height: wp(10.2),
    borderColor: colors.borderColor,
    borderWidth: wp(0.5),
    padding: wp(1.8),
    borderRadius: wp(33),
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
    marginRight: wp(4),
  },
  actionImage: {
    tintColor: colors.white,
    width: wp(13.7),
    height: wp(4),
  },
});

export default styles;
