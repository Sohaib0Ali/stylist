import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const SalonMenuComponent = props => {
  const {title, onPress, backgroundColor, color} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, backgroundColor]}>
      <Text style={[styles.textStyle, color]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp(0.8),
    marginLeft: wp(3),
    justifyContent: 'center',
    borderRadius: wp(33),
    borderColor: colors.dividerColor,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: wp(3.9),
    width: '100%',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
});

export default SalonMenuComponent;
