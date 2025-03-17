import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';
import PickerComponent from '../../components/PickerComponent/PickerComponent';
import {scale} from 'react-native-size-matters';

const Header = ({
  leftText,
  leftText2,
  title,
  icon,
  value,
  headerBack,
  titleTextColor,
  headerColor,
  direction,
  randomText,
  onBackPress,
  onPress,
  onSearch,
  randomIcon,
  small,
  Headerstyles,
}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'red',
      paddingHorizontal: wp(4.1),
      height: hp(8.5),
      alignItems: 'center',
    },
    containerRtl: {
      flexDirection: 'row',
      backgroundColor: 'red',
      justifyContent: 'space-between',
      paddingHorizontal: wp(4.1),
      height: hp(10),
      alignItems: 'center',
    },
    title: {
      fontSize: wp(4.1),
      color: colors.white,
      textAlign: 'left',
    },
    title2: {
      textAlign: 'left',
      width: wp(56),
      fontSize: wp(3.1),
      color: '#B7B6F7',
    },

    headerData: {
      color: colors.black,
      textAlign: 'center',
      fontFamily: fonts.bold,
    },
    headerImage: {
      marginRight: wp(3),
      width: wp(9),
      height: wp(9),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFDE82',
      borderRadius: wp(4.5),
    },
    randomText: {
      fontSize: wp(4.1),
      color: colors.black,
    },
    icon: {
      width: wp(4.5),
      height: hp(2.0),
    },
    icon1: {
      width: wp(20),
      height: wp(20),
    },
  });

  return (
    <View style={Headerstyles}>
      {direction !== 'RTL' ? (
        <TouchableOpacity
          style={[
            styles.container,
            {backgroundColor: headerColor ? headerColor : '#57429D'},
          ]}
          onPress={onPress}
          activeOpacity={0.9}>
          {headerBack ? null : randomIcon ? (
            <TouchableOpacity onPress={onSearch}>
              <Image
                style={small ? styles.icon1 : styles.headerImage}
                resizeMode="stretch"
                source={{uri: randomIcon}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSearch} style={styles.headerImage}>
              <Text style={styles.headerData}>{randomText}</Text>
            </TouchableOpacity>
          )}
          {leftText ? (
            <View>
              <Text style={styles.title}>{leftText}</Text>
              <Text numberOfLines={1} style={styles.title2}>
                {leftText2 ? leftText2 : ''}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={images.BackIcon}
                style={{height: scale(16), width: scale(10)}}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.containerRtl,
            title && {justifyContent: 'flex-start'},
            {backgroundColor: headerColor ? headerColor : '#57429D'},
          ]}>
          {leftText ? (
            <View>
              <Text style={styles.title}>{leftText}</Text>
              <Text numberOfLines={1} style={styles.title2}>
                {leftText2 ? leftText2 : ''}
              </Text>
            </View>
          ) : headerBack ? (
            <Pressable onPress={onBackPress}>
              <Image
                source={images.BackIcon}
                style={{height: scale(16), width: scale(10)}}
              />
            </Pressable>
          ) : (
            <TouchableOpacity onPress={onPress}>
              <Image
                source={images.BackIcon}
                style={{height: scale(16), width: scale(10)}}
              />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.title,
              {color: titleTextColor ? titleTextColor : 'white'},
            ]}>
            {title}
          </Text>
          {icon ? (
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: hp(3),
                width: wp(6.1),
              }}
              onPress={onPress}>
              <Image style={styles.icon} resizeMode="contain" source={icon} />
            </TouchableOpacity>
          ) : randomText !== 'payreport' ? (
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.randomText}>{randomText}</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                paddingTop: hp(2.1),
              }}>
              <PickerComponent
                value={value}
                paddingHorizontal={0}
                direction="LTR"
                onPress={onPress}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;
