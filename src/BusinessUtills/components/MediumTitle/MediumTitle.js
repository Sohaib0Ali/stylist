import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const MediumTitle = ({
  title,
  marginTop,
  marginBottom,
  alignSelf,
  color,
  textStyles,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'flex-start',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      fontSize: wp(4.5),
      color: color ? color : colors.headingBlack,
      fontFamily: fonts.semiBold,
    },
  });

  return <Text style={[styles.title, textStyles]}>{title}</Text>;
};
export default MediumTitle;
