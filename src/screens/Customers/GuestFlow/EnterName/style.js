//================================ React Native Imported Files ======================================//
import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 1,
  },

  modalContainer: {
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    backgroundColor: colors.secondary,
    paddingVertical: wp(8.5),
    paddingHorizontal: wp(6),
    top: wp(5),
    bottom: 0,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },

  toolTipBg: {
    backgroundColor: 'transparent',
    bottom: wp(2),
  },
  otherContainer: {
    paddingHorizontal: wp(8.5),
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
    shadowOpacity: 0.1,
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
    zIndex: 2,
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
  phoneContainer: {
    borderRadius: wp(2),
    width: '100%',
    backgroundColor: colors.secondary,
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  phoneBg: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(2),
  },
  textInput: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
});

export default styles;
