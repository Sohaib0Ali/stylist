import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import icons from '../../assets/icons/icons';

const SearchComponent = ({name, address, distance}) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: hp(2.8),
    },
    iconTitleBg: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon: {
      width: wp(7),
      height: hp(3),
      marginRight: wp(3),
    },
    title: {
      fontFamily: fonts.medium,
      fontSize: wp(4),
      color: colors.headingBlack,
    },
    smallText: {
      fontFamily: fonts.medium,
      fontSize: wp(3.5),
      color: colors.subHeading,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconTitleBg}>
        <Image style={styles.icon} source={icons.map} resizeMode="contain" />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={{...styles.iconTitleBg, marginTop: hp(0.3)}}>
        <Text style={{...styles.smallText, marginRight: wp(3)}}>
          {distance} m
        </Text>
        <Text style={styles.smallText}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchComponent;
