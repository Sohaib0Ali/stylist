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
    marginTop: hp(2),
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
  imgBg: {
    width: '100%',
    height: wp(72),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrBg: {backgroundColor: colors.white, padding: wp(4), borderRadius: wp(4)},
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  priceBg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itmBg: {
    width: wp(6.2),
    height: wp(6.2),
    borderRadius: wp(22),
    borderWidth: wp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor,
    marginLeft: -6,
  },
  itm: {
    width: '100%',
    height: '100%',
    borderRadius: wp(22),
  },
  collaborator: {
    flexDirection: 'row',
    marginTop: hp(2),
    width: wp(54),
  },
});

export default styles;
