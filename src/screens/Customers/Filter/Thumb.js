import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const THUMB_RADIUS = 15;

const Thumb = () => <View style={styles.root} />;

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 1.7,
    height: THUMB_RADIUS * 1.7,
    borderRadius: THUMB_RADIUS,
    borderWidth: wp(0.8),
    borderColor: colors.red,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.16,
    shadowRadius: 62,
    backgroundColor: colors.secondary,
  },
});

export default memo(Thumb);
