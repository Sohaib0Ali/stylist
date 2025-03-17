//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(12),
  },
  body: {
    backgroundColor: colors.secondary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(4),
    paddingHorizontal: wp('4%'),
  },
  filterBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    padding: wp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
  },
  icon: {
    width: 32,
    height: 32,
  },
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
  },
  downArrow: {
    width: wp(1.8),
    height: hp(2.2),
    tintColor: colors.black,
    transform: [{rotate: '270deg'}],
    marginHorizontal: 7,
    alignSelf: 'center',
  },
});

export default styles;
