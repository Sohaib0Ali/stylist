//================================ React Native Imported Files ======================================//
import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';

//================================ Local Imported Files ======================================//
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

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
    width: scale(306),
    position: 'absolute',
    marginTop: scale(210),
    shadowOffset: {width: 0, height: 7},
    shadowColor: 'rgba(90, 114, 123, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 30,
    alignSelf: 'center',
    borderRadius: scale(20),
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    width: scale(240),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: scale(41),
    lineHeight: 28,
    color: '#000000',
    fontFamily: fonts.Exo2Bold,
  },
  subText: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: fonts.Exo2Bold,
    color: '#000000',
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
    fontFamily: fonts.Exo2Bold,
  },
  switch: {
    height: 25,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
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
    height: scale(20),
    width: scale(20),
  },
  backbutton: {
    marginLeft: scale(10),
    marginTop: verticalScale(30),
    
  },
});

export default styles;
