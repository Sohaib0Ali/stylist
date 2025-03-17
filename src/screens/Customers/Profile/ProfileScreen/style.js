//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  header: {
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp(5),
  },

  body: {
    backgroundColor: colors.secondary,
    flex: 1,
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
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(4),
  },

  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
  },
  arrow: {
    width: scale(7),
    height: scale(15),
    transform: [{rotate: '180deg'}],
    marginRight: scale(10),
  },
});

export default styles;
