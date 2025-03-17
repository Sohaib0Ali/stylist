//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    height: hp(50),
  },
  button: {
    marginTop: scale(15),
    backgroundColor: '#57429D',
    paddingVertical: hp(2.5),
    borderRadius: hp(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(15),
    marginHorizontal: scale(20),
  },
  buttonText: {
    fontSize: wp(4.1),
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default styles;
