import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const SmallTitle = ({
  Weight,
  textAlign,
  top,
  width,
  title,
  fontSize,
  marginTop,
  marginBottom,
  color,
  marginVertical,
  alignSelf,
  marginRight,
  marginLeft,
  fontFamily,
  numberofLine,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'center',
      marginTop: marginTop ? marginTop : 0,
      top: top ? top : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      marginVertical: marginVertical ? marginVertical : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      marginRight: marginRight ? marginRight : 0,
      fontSize: fontSize ? fontSize : wp(3.3),
      color: color ? color : colors.black,
      fontFamily: fontFamily ? fontFamily : fonts.Exo2light,
      fontWeight: Weight ? Weight : '400',
      width: width ? width : null,
      textAlign: textAlign ? textAlign : 'center',
    },
  });

  return (
    <Text numberOfLines={numberofLine ? numberofLine : 1} style={styles.title}>
      {title}
    </Text>
  );
};
export default SmallTitle;
