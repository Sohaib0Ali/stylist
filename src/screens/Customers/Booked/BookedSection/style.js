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
  },
  body: {
    backgroundColor: colors.secondary,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(4),
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
});

export default styles;
