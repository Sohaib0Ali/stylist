//================================ React Native Imported Files ======================================//

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : 0,
  },
  mapBg: {width: wp(100), height: hp(100), backgroundColor: 'rgba(0,0,0,0.35)'},
  map: {
    flex: 1,
  },
  body: {
    height: 333,
    paddingHorizontal: wp(2),
    paddingVertical: hp(33),
  },
  phoneBg: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(22),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(1),
    marginLeft: wp(3),
  },
  phoneContainer: {
    borderRadius: wp(2),
    width: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: wp(100),
  },
  toolTipBg: {
    backgroundColor: 'transparent',
    bottom: 20,
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
