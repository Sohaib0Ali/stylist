//================================ React Native Imported Files ======================================//
import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    height: scale(610),
    width: '100%',
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
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
    bottom: scale(635 / 2),
  },
  otherContainer: {
    paddingHorizontal: wp(2),
  },
  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(77),
  },

  talkBubble: {
    zIndex: 2,
  },
  talkBubbleSquare: {
    width: wp(70),
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 10,
    marginLeft: wp(13),
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
    flexWrap: 'wrap',
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
  thought: {
    height: hp(4),
    width: wp(7),
    marginLeft: wp(9),
  },
  markerImage: {
    width: scale(40),
    height: scale(40),
  },
  Locationmarker: {
    width: scale(18),
    height: scale(18),
    alignSelf: 'center',
  },
  LocationLable: {
    height: scale(20),
    width: scale(59),
    backgroundColor: colors.selected_yellow,
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: colors.white,
  },
  LocationTime: {
    fontSize: scale(12),
    fontWeight: '600',
    color: colors.black,
    fontFamily: fonts.Exo2Bold,
    alignSelf: 'center',
  },
  currentLoc: {
    height: scale(26),
    width: scale(26),
    alignSelf: 'center',
    position: 'absolute',
    top: scale(610) / 2,
    right: scale(10),
  },
});

export default styles;
