//================================ React Native Imported Files ======================================//
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default styles;
