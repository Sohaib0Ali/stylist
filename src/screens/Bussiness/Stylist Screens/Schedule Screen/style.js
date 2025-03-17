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
    paddingBottom: Platform.OS === 'ios' ? hp(52) : hp(57),
    paddingHorizontal: wp('4%'),
  },
  body: {
    height: hp(10),
    marginTop: wp(4),
    borderRadius: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3.8),
    backgroundColor: '#F6F5F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lableSlot: {
    width: '33%',
  },
  dayTimeBg: {
    width: '67%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(3.5),
  },
  buttonText: {
    fontSize: wp(4.1),
    color: '#57429D',
    fontWeight: '500',
    marginRight: wp(4.1),
  },
  days: {
    color: colors.grey,
  },
  time: {
    color: colors.grey,
    fontSize: wp(2.5),
  },
});

export default styles;
