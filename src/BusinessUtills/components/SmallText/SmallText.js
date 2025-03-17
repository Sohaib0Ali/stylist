import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const SmallText = ({
  text,
  marginTop,
  marginBottom,
  color,
  fontSize,
  alignSelf,
  marginRight,
  marginLeft,
  textAlign,
  ellipsizeMode,
  numberOfLines,
  fontFamily,
  paddingHorizontal,
}) => {
  const styles = StyleSheet.create({
    smallText: {
      textAlign: textAlign ? textAlign : 'auto',
      alignSelf: alignSelf ? alignSelf : 'center',
      marginTop: marginTop ? marginTop : hp(0),
      marginBottom: marginBottom ? marginBottom : hp(0),
      fontSize: fontSize ? fontSize : wp(3.7),
      color: color ? color : colors.subHeading,
      fontFamily: fontFamily ? fontFamily : fonts.regular,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
    },
  });

  return (
    <Text
      style={styles.smallText}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};
export default SmallText;
