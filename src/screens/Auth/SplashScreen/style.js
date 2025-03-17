//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: scale(15),
    color: colors.headingBlack,
    fontFamily: fonts.Exo2Italic,
    alignSelf: 'center',
    fontWeight: '700',
  },
  Logo: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Imglogo: {
    height: scale(56),
    width: scale(64),
    alignSelf: 'flex-end',
    marginRight: scale(10),
  },
  Imgname: {
    height: scale(79),
    width: scale(190),
  },
});

export default styles;
