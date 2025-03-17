//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../BusinessUtills/assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  clients: {
    height: hp(13),
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  clientsBox: {
    width: '45%',
    height: '100%',
    backgroundColor: '#EAFBF8',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  ProfitBox: {
    width: '45%',
    height: '100%',
    backgroundColor: '#F2F2FD',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
  },

  body: {
    marginTop: wp(1.5),
    borderRadius: wp(4),
    paddingVertical: hp(3),
    paddingRight: wp(2.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
});

export default styles;
