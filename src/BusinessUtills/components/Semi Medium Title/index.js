import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const SemiMediumTitle = ({
  title,
  marginTop,
  marginBottom,
  alignSelf,
  color,
  fontSize,
  marginLeft,
  paddingHorizontal,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'flex-start',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      color: color ? color : colors.headingBlack,
      fontFamily: fonts.semiBold,
      fontSize: fontSize ? fontSize : wp(4),
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
    },
  });

  return <Text style={styles.title}>{title}</Text>;
};
export default SemiMediumTitle;
