//================================ React Native Imported Files ======================================//
import { Platform, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale } from 'react-native-size-matters';

//================================ Local Imported Files ======================================//
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    // paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  curvimg: {
    width: '100%',
    height: scale(350),
  },
  headerText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
    width: scale(270),
    position: 'absolute',
    textAlign: 'center',
    marginTop: scale(75),
    lineHeight: 28,
    fontFamily: fonts.Exo2Bold,
  },
  curvSubimg: {
    width: '78%',
    tintColor: 'white',
    alignSelf: 'center',
    height: scale(270),
    marginTop: scale(26),
  },
  cardView: {
    height: scale(390),
    backgroundColor: 'white',
    width: '88%',
    position: 'absolute',
    marginTop: scale(210),
    shadowOffset: { width: 0, height: 7 },
    shadowColor: 'rgba(90, 114, 123, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 30,
    alignSelf: 'center',
    borderRadius: scale(20),
  },
  cardHeaderText: {
    fontSize: scale(15),
    fontWeight: '600',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: scale(41),
    lineHeight: 28,
    color: '#000000',
  },
  subText: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
  },
  boxStyle: {
    width: scale(72),
    height: scale(32),
    borderWidth: 1,
    borderRadius: scale(12),
    borderColor: '#57429C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTitle: {
    fontSize: 12,
    color: '#57439D',
  },
  switch: {
    height: 25,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  btnBottomView: {
    position: 'absolute',
    flex: 0.3,
    alignItems: 'center',
    bottom: scale(70),
    alignSelf: 'center',
  },
  titletext: {
    color: '#FFFFFF',
    fontSize: scale(25),
    lineHeight: scale(32),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  backbtn: {
    height: verticalScale(18),
    width: verticalScale(18),
  },
  backbutton: {
    marginLeft: scale(10),
    marginTop: verticalScale(40),
  },
  radioButton: {
    width: '90%',
    height: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    marginVertical: scale(10),
    justifyContent: 'space-between',
    paddingHorizontal: scale(40),
  },
  radioButtonIcon: {
    width: scale(27),
    height: scale(27),
    borderRadius: 10,
    marginLeft: 30,
  },
  radioButtonIconSelected: {
    backgroundColor: '#000',
  },
  language: {
    fontSize: scale(14),
    fontWeight: '700',
    fontFamily: fonts.Exo2Bold,
    color: 'black',
    marginLeft: scale(-20),
  },
  typelogo: {
    width: scale(27),
    height: scale(27),
  },
});

export default styles;
