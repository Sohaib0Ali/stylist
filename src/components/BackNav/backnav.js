import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import icons from '../../assets/icons/icons';
import {useNavigation} from '@react-navigation/native';

const Backnav = ({marginLeft, marginVertical}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.6}
      style={{
        marginLeft: marginLeft ? marginLeft : 0,
        marginVertical: marginVertical ? marginVertical : 0,
      }}>
      <Image
        style={styles.backIcon}
        source={icons.backArrow}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Backnav;

const styles = StyleSheet.create({
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
  },
});
