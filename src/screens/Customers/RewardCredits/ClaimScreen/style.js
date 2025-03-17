//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp('4%'),
  },
  body: {},
  itemContainer: {
    marginTop: hp(3),
    marginBottom: hp(2),
    backgroundColor: colors.white,
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('5%'),
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
  iconBg: {
    width: hp(7.5),
    height: hp(7.5),
    backgroundColor: colors.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(44),
    marginLeft: wp(4),
  },
  iconBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
