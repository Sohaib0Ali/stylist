import {View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';

export default function Divider({marginTop, marginBottom, height}) {
  return (
    <View
      style={{
        backgroundColor: colors.dividerColor,
        height: height ? height : 1,
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
    />
  );
}
