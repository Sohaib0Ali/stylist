import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const Title = ({
  title,
  marginTop,
  marginBottom,
  color,
  alignSelf,
  marginLeft,
  marginRight,
  paddingHorizontal,
  fontWeight,
  fontSize,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'center',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      fontSize: fontSize ? fontSize : wp(7),
      color: color ? color : colors.headingBlack,
      fontFamily: fonts.Exo2Bold,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      fontWeight: fontWeight,
    },
  });

  return <Text style={styles.title}>{title}</Text>;
};

export default Title;
