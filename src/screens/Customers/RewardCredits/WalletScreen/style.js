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
    backgroundColor: colors.secondary,
    paddingHorizontal: wp('4%'),
  },
  body: {},
  itemContainer: {
    marginTop: hp(2.5),
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBg: {
    borderColor: colors.grey,
    borderWidth: wp(0.5),
    width: wp(10.5),
    height: wp(10.5),
    borderRadius: wp(44),
    padding: wp(1.5),
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: wp(44),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: wp(4),
  },
  discountBg: {
    backgroundColor: colors.yellow,
    borderRadius: wp(18),
    paddingTop: wp(1),
    paddingHorizontal: wp(4.5),
    flexDirection: 'row',
  },
  iconTitleBg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pagerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(2),
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    width: wp(6),
    height: wp(6),
    borderRadius: wp(22),
  },
  page1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderWidth: wp(0.5),
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(22),
  },
});

export default styles;
