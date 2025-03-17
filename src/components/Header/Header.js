import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const Header = ({
  leftText,
  title,
  icon,
  marginVertical,
  direction,
  randomText,
  onPress,
  onSearch,
  randomIcon,
  small,
  checkGocBACK,
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      marginVertical: marginVertical ? marginVertical : 0,
    },
    title: {
      alignSelf: 'center',
      fontSize: wp(8),
      color: colors.black,
      fontFamily: fonts.bold,
    },
    icon: {
      width: wp(6),
      height: hp(4),
    },
    icon1: {
      width: wp(4.5),
      height: wp(4.5),
    },
  });

  return (
    <View>
      {direction !== 'RTL' ? (
        <View style={styles.container}>
          {leftText ? (
            <Text style={styles.title}>{leftText}</Text>
          ) : (
            <TouchableOpacity
              style={{paddingVertical: hp('3%'), paddingHorizontal: wp(5)}}
              onPress={() =>
                checkGocBACK
                  ? navigation.navigate('DISCOVER_SCREEN')
                  : navigation.goBack()
              }></TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>

          {randomIcon ? (
            <TouchableOpacity onPress={onSearch}>
              <Image
                style={small ? styles.icon1 : styles.icon}
                resizeMode="contain"
                source={randomIcon}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>{randomText}</Text>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          {icon ? (
            <TouchableOpacity
              style={{paddingVertical: hp('3%'), paddingHorizontal: wp(10)}}
              onPress={onPress}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={randomIcon}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>{randomText}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
          {leftText ? (
            <Text style={styles.title}>{leftText}</Text>
          ) : (
            <TouchableOpacity onPress={onPress}></TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;
