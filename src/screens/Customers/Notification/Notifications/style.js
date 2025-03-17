//================================ React Native Imported Files ======================================//
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

//================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(12),
  },
  body: {
    backgroundColor: colors.secondary,
  },
  snapBg: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(14),
    height: wp(14),
    borderRadius: wp(44),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  snapIcon: {
    width: '100%',
    height: '100%',
  },
  textBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
    paddingLeft: '.2%',
    paddingRight: '2%',
    backgroundColor: colors.lightGrey,
    marginTop: hp(2.5),
    borderRadius: wp(4),
  },
  btnContainer: {
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(2.5),
    marginBottom: hp(4),
  },
  otherContainer: {
    flex: 1,
    left: 0,
  },

  iconImageBg: {
    width: wp(14.9),
    height: wp(14.9),
    left: wp(6),
    backgroundColor: colors.borderColor,
    borderRadius: wp(77),
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
    width: wp(90),
    left: wp(1),
    backgroundColor: colors.lightGrey,
    bottom: 0,
    borderRadius: 10,
  },
  talkBubbleTriangle: {
    left: wp(10),
    top: wp(1),
    width: 0,
    height: 0,
    borderLeftWidth: wp(4),
    borderRightWidth: wp(4),
    borderBottomWidth: wp(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.lightGrey,
    borderTopColor: '#2C325D',
  },
  talkBubbleMessage: {
    color: '#000',
    padding: wp(4),
  },
});

export default styles;
