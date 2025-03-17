//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors'; //================================ Local Imported Files ======================================//

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
  },
  body: {
    height: hp(10),
    marginTop: wp(4),
    borderRadius: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3.8),
    backgroundColor: '#F6F5F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTimeBg: {
    flex: 0.4,
    padding: wp(3),
  },
  days: {
    color: colors.grey,
  },
  centeredView: {
    flex: 1,
    marginTop: hp(2),
    backgroundColor: '#F7F7F7',
  },
  modalView: {
    width: 345,
    height: 416,
    margin: 10,
    flex: 0.8,
    borderRadius: 8,
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  lableSlot: {
    width: '40%',
  },
  modalText: {
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  simpleText: {
    backgroundColor: 'grey',
    fontSize: 40,
  },
  dayTimeBg: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
