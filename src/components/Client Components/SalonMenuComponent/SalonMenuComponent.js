import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const SalonMenuComponent = props => {
  const {title, onPress, backgroundColor, color, length} = props;
  return (
    <View style={{marginHorizontal: 5}}>
      {title == 'Services' && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            right: -2,
            bottom: 20,
            backgroundColor: '#FF4032',
            borderRadius: 100,
          }}>
          <Text
            style={{
              fontSize: scale(14),
              fontWeight: '600',
              fontfamily: fonts.Exo2Bold,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}>
            {length}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.container, backgroundColor]}>
        <Text style={[styles.textStyle, color]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(0.8),
    marginRight: wp(3),
    borderRadius: wp(33),
    borderColor: colors.dividerColor,
    borderWidth: 1,
    backgroundColor: colors.white,
    left: wp('4%'),
  },
  textStyle: {
    textAlign: 'center',
    fontSize: wp(3.9),
    width: '100%',
    color: colors.subHeading,
    fontFamily: fonts.medium,
  },
});

export default SalonMenuComponent;
