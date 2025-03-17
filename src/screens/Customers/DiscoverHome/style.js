//================================ React Native Imported Files ======================================//
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.btnColor,
  },
  body: {},
  ToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(8),
    backgroundColor: colors.headingBlack,
  },
  leftTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.white,
    fontFamily: fonts.medium,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginRight: wp(3),
    paddingVertical: hp(0.8),
    borderWidth: wp(0.4),
    borderColor: colors.borderColor,
    borderRadius: wp(8),
  },
  rightTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.btnColor,
  },
  Container: {
    width: '100%',
    height: hp(11),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  Discover: {
    alignSelf: 'center',
    fontSize: wp(8),
    color: colors.secondary,
    fontWeight: '700',
  },
  searchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  search: {
    width: wp(15),
    height: hp(15),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  Drawer: {
    width: wp(10),
    height: hp(15),
    resizeMode: 'contain',
  },
  Line: {
    width: wp(15),
    height: hp(0.5),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: hp(1),
    borderRadius: 10,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtericon: {
    height: hp(17),
    width: wp(17),
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cancleIcon: {
    width: scale(25),
    height: scale(25),
    tintColor: colors.white,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalCard: {
    width: scale(320),
    height: scale(600),
    backgroundColor: colors.white,
    alignSelf: 'baseline',
    borderRadius: scale(20),
  },
  modalImage: {
    width: '100%',
    height: '60%',
    borderRadius: scale(20),
  },
});

export default styles;
