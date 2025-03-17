import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const ServiceComponent = ({
  title,
  bgColor,
  onPress,
  id,
  disabled,
  icon,
  getIdCallBack,
}) => {
  return (
    <TouchableOpacity
      onPressIn={() => getIdCallBack(id)}
      key={id}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={[styles.iconBg, {backgroundColor: bgColor}]}>
        <Image style={styles.icon} source={{uri: icon}} />
      </View>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: wp(99),
    width: wp(22),
    height: wp(22),
    padding: wp(5),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.0,
    elevation: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: wp(4.2),
    width: '100%',
    fontWeight: '500',
    color: colors.subHeading,
    fontFamily: fonts.medium,
    marginTop: hp(1),
  },
});

export default ServiceComponent;
