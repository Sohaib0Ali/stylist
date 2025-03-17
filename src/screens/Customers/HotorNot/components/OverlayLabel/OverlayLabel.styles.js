import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  overlayLabel: {
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  overlayLabelText: {
    fontSize: 25,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  LikePost: {
    height: scale(55),
    width: scale(55),
    resizeMode: 'contain',
  },
});
