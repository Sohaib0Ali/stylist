import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import fonts from '../../../../../assets/fonts/fonts';
import colors from '../../../../../assets/colors/colors';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(17),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    opacity: 1,
  },
  image: {
    borderRadius: scale(17),
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: scale(24),
    color: colors.white,
    fontFamily: fonts.Exo2Bold,
    fontWeight: '700',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // set the background color with an alpha channel value of 0.5 for 50% opacity
  },
});
