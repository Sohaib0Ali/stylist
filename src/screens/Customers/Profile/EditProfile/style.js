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
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  header: {
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
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
    width: wp(10),
    height: wp(10),
    marginRight: wp(5),
    borderRadius: wp(44),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  snapIcon: {
    width: '100%',
    height: '100%',
    borderRadius: wp(44),
  },
  itemBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  imgTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBg1: {
    width: wp(13),
    height: wp(13),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    marginRight: wp(2),
  },
  img1: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },
  twitterBg: {
    backgroundColor: colors.blue,
    padding: wp(1),
    borderRadius: wp(22),
    marginTop: -20,
    marginLeft: 40,
  },

  twitter: {
    width: wp(3),
    height: wp(3),
  },
  manIcon1: {
    width: '45%',
    height: '45%',
  },
  catNameBg: {},
  removeBg: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  btnBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: wp(4),
    height: hp(9),
    marginTop: hp(1.5),
  },
  btnBg1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: wp(4),
    height: hp(9),
    marginTop: hp(2),
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  picker: {
    width: wp(50),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: wp(2),
    alignSelf: 'center',
    marginBottom: wp(2),
    paddingHorizontal: wp(3),
  },
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
  },
});

export default styles;
