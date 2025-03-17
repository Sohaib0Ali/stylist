//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  body: {},
  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    left: wp(8),
    backgroundColor: 'pink',
    borderRadius: wp(77),
  },
  imgBg: {
    paddingTop: wp(1.3),
    marginRight: wp(3),
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  imgBg: {
    width: wp(12.9),
    height: wp(12.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
    padding: wp(1),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
