//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
    backgroundColor: colors.secondary,
  },
  service: {
    height: scale(65),
    width: '90%',

    marginVertical: scale(10),
    alignSelf: 'center',
    borderRadius: scale(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noofservice: {
    height: scale(19),
    width: scale(19),
    alignItems: 'center',
    backgroundColor: '#1E0604',
    borderRadius: scale(40),
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: scale(10),
  },
  crews: {
    height: scale(56),
    width: scale(56),
    borderRadius: scale(100),
    resizeMode: 'contain',
    borderWidth: 2.5,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
  },
  selectedcrew: {
    flexDirection: 'row',
    marginTop: scale(20),
    marginLeft: scale(20),
  },
  crewimage: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(99),
  },
  itemBg1: {
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginRight: wp(3),
    marginBottom: wp(3),
    borderRadius: wp(133),
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    backgroundColor: colors.yellow,
  },
});

export default styles;
