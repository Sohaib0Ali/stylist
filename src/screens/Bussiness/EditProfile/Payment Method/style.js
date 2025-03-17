//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp(5),
  },

  body: {
    backgroundColor: colors.secondary,
  },
  imgBg: {
    width: wp(16.2),
    height: wp(16.2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: wp(77),
    marginRight: wp(2),
    alignSelf: 'center',
    marginBottom: hp(2),
    marginTop: hp(3),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  manIcon: {
    width: '45%',
    height: '45%',
    tintColor: colors.grey,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.8),
  },
  iconTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapBg: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(8),
    height: wp(8),
    marginRight: wp(5),
  },
  snapIcon: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  separator: {
    height: hp(0.1),
    backgroundColor: '#D5D2CD',
  },
  forwardIcon: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: wp(4),
  },
});

export default styles;
