import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import fonts from '../../../assets/fonts/fonts';

const PopularCrewList = ({profileimg, stylistname, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <Image style={styles.profileimg} source={profileimg} />
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: scale(5),
        }}>
        <Text
          style={{
            fontSize: scale(14),
            textAlign: 'center',
            color: '#22190C',
            fontWeight: '600',
            alignSelf: 'flex-start',
            fontFamily: fonts.Exo2light,
          }}>
          {stylistname}
        </Text>
        <Text
          style={{
            fontSize: scale(10),
            textAlign: 'center',
            fontFamily: fonts.Exo2light,
            color: '#22190C',
            fontWeight: '400',
            alignSelf: 'center',
            marginTop: scale(4),
          }}>
          Stylist
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(146),
    height: scale(144),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white3,
    borderRadius: scale(10),
    alignSelf: 'center',
    marginHorizontal: scale(5),
    marginVertical: scale(5),
  },
  profileimg: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(100),
    borderWidth: 2,
    borderColor: colors.btnColor,
  },
});

export default PopularCrewList;
