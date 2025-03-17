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
  fontSize,
  font,
  lineHeight,
  Weight,
  marginLeft,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'flex-start',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      fontSize: fontSize ? fontSize : wp(4.5),
      color: color ? color : colors.headingBlack,
      fontWeight: Weight ? Weight : '700',
      fontFamily: font ? font : fonts.Exo2Bold,
      lineHeight: lineHeight,
      marginLeft: marginLeft ? marginLeft : 0,
    },
  });

  return <Text style={styles.title}>{title}</Text>;
};
export default MediumTitle;
