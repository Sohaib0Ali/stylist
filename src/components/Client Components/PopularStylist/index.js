import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';

const PopularStylist = ({profileimg, stylistname, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <Image style={styles.profileimg} source={profileimg} />
      <View style={{alignItems: 'center', marginLeft: scale(10)}}>
        <Text
          style={{
            fontSize: scale(15),
            textAlign: 'center',
            color: '#22190C',
            fontWeight: '600',
            alignSelf: 'flex-start',
          }}>
          {stylistname}
        </Text>
        <Text
          style={{
            fontSize: scale(12),
            textAlign: 'center',
            color: '#22190C',
            fontWeight: '400',
            alignSelf: 'flex-start',
          }}>
          Stylist
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(184),
    height: scale(68),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  profileimg: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(30),
    borderWidth: 1.5,
    borderColor: colors.btnColor,
  },
});

export default PopularStylist;
