//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(9),
    backgroundColor: '#FFFFFF',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  skip: {
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: hp(1.8),
    color: '#27232C',
    paddingTop: hp(3.2),
    paddingHorizontal: hp(2),
  },
  save: {
    alignItems: 'flex-end',
    paddingRight: wp(4),
  },
  saveText: {
    fontSize: hp(1.8),
    color: '#27232C',
    paddingTop: hp(3.2),
  },
});

export default styles;
