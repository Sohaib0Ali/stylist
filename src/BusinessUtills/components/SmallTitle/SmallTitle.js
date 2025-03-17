import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const SmallTitle = ({
  title,
  fontSize,
  marginTop,
  marginBottom,
  color,
  marginVertical,
  alignSelf,
  marginRight,
  marginLeft,
  textAlign,
  width,
  numberofLOne,
}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'center',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      marginVertical: marginVertical ? marginVertical : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      marginRight: marginRight ? marginRight : 0,
      fontSize: fontSize ? fontSize : wp(3.5),
      color: color ? color : colors.black,
      fontFamily: fonts.medium,
      width: width ? width : wp(15),
      textAlign: textAlign ? textAlign : 'center',
    },
  });

  return (
    <Text numberOfLines={numberofLOne ? numberofLOne : 1} style={styles.title}>
      {title}
    </Text>
  );
};
export default SmallTitle;
