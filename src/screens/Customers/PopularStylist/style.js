import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
    position: 'absolute',
    bottom: scale(0),
    left: scale(10),
    marginLeft: scale(10),
  },
});

export default styles;
