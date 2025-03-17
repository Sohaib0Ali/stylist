import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const SimpleText = ({
  text,
  marginTop,
  marginBottom,
  color,
  alignSelf,
  textAlign,
  marginRight,
  marginLeft,
  width,
  paddingHorizontal,
  size,
  fontFamily,
  fontWeight,
}) => {
  const styles = StyleSheet.create({
    smallText: {
      textAlign: textAlign ? textAlign : 'justify',
      alignSelf: alignSelf ? alignSelf : 'center',
      marginTop: marginTop ? marginTop : hp(0),
      marginBottom: marginBottom ? marginBottom : hp(0),
      fontSize: size ? size : wp(4.3),
      color: color ? color : colors.subHeading,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      width: width ? width : null,
      fontFamily: fontFamily ? fontFamily : fonts.Exo2light,
      fontWeight: fontWeight ? fontWeight : '400',
    },
  });

  return <Text style={styles.smallText}>{text}</Text>;
};
export default SimpleText;
