//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  mapBg: {width: wp(100), height: hp(100)},
  map: {
    flex: 1,
  },
  body: {
    paddingHorizontal: wp(2),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: hp(2),
    left: wp('4%'),
    width: '92%',
    alignSelf: 'center',
  },
  textBg: {
    backgroundColor: colors.white,
    marginBottom: hp(1.5),
    borderRadius: wp(5),
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: hp(2.5),
  },
  dpBg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBg: {
    backgroundColor: colors.grey,
    width: wp(16.5),
    height: wp(16.5),
    borderRadius: wp(44),
  },
  textContainer: {
    borderWidth: wp(0.3),
    borderRadius: 22,
    borderColor: colors.borderColor,
    paddingHorizontal: wp(0.5),
    backgroundColor: colors.lightRed,
    position: 'absolute',
    top: 0,
    left: wp(13),
  },

  otherContainer: {
    flex: 1,
    position: 'absolute',
  },

  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    left: wp(4),
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 1.0,
    elevation: 10,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },

  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
    bottom: wp(5),
  },
  talkBubbleSquare: {
    width: wp(92),
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 10,
  },
  talkBubbleTriangle: {
    left: wp(8),
    top: wp(1),
    width: 0,
    height: 0,
    borderLeftWidth: wp(4),
    borderRightWidth: wp(4),
    borderBottomWidth: wp(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    borderTopColor: '#2C325D',
  },
  talkBubbleMessage: {
    color: '#000',
    fontSize: wp(4),
    padding: wp(4),
  },
});

export default styles;
