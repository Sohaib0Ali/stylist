//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textIconBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(85),
    marginVertical: wp(0.8),
    alignSelf: 'center',
    paddingVertical: hp(2),
  },
  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    left: wp(8),
    borderRadius: wp(77),
  },
  img: {
    width: wp(6.9),
    height: wp(8),
    marginRight: wp(3.7),
  },
});
export default styles;
