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
  fontFamily,
  fontSize,
  multiline,
}) => {
  const styles = StyleSheet.create({
    smallText: {
      textAlign: textAlign ? textAlign : 'center',
      alignSelf: alignSelf ? alignSelf : 'center',
      multiline: multiline ? multiline : false,
      marginTop: marginTop ? marginTop : hp(0),
      marginBottom: marginBottom ? marginBottom : hp(0),
      fontSize: fontSize ? fontSize : wp(4.2),
      color: color ? color : colors.subHeading,
      fontFamily: fontFamily ? fontFamily : fonts.regular,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      width: width ? width : null,
    },
  });

  return <Text style={styles.smallText}>{text}</Text>;
};
export default SimpleText;
