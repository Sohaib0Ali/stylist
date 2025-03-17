//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailIconBg: {
    backgroundColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(32),
    height: hp(17),
    borderRadius: wp(4),
    alignSelf: 'center',
    marginTop: hp('7%'),
  },
  emailTextBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: hp(2),
  },
  simpleText: {
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
    color: colors.grey,
    textAlign: 'center',
  },
});

export default styles;
