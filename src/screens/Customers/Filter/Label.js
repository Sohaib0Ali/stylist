import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const Label = ({text, ...restProps}) => (
  <View style={styles.root} {...restProps}>
    <Text style={styles.text}>${text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.red,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.white,
  },
});

export default memo(Label);
