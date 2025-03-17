import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../assets/images/images';
import icons from '../../assets/icons/icons';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../../assets/fonts/fonts';
import colors from '../../assets/colors/colors';

const StylistMenu = ({
  title,
  onPress,
  position,
  IdName,
  marginBottom,
  source,
  onPressAddStylist,
}) => {
  return (
    <View>
      {IdName === 'NEW ADD STYLIST' ? (
        <View style={[styles.addButton, {marginTop: scale(14)}]}>
          <TouchableOpacity onPress={onPressAddStylist}>
            <Image
              source={icons.AddPlus}
              style={{height: verticalScale(15), width: verticalScale(15)}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            marginBottom ? {marginBottom: marginBottom} : {marginBottom: 0},
          ]}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={source ? {uri: source} : images.manIcon}
              style={[styles.image, {backgroundColor: '#eee'}]}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fonts.Exo2Regular,
                color: colors.headingBlack,
                marginTop: verticalScale(8),
                fontWeight: '500',
                fontSize: verticalScale(12),
              }}>
              {title}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fonts.Exo2Regular,
                color: colors.tabIconColor,
                marginTop: verticalScale(2),
                fontWeight: '400',
                fontSize: verticalScale(10),
              }}>
              {position}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: hp(13.1),
    width: wp(20),
    marginRight: wp(3),
    borderRadius: wp(5),
    shadowColor: '#00000d',
  },
  addButton: {
    height: scale(60),
    width: scale(60),
    marginRight: wp(3),
    marginLeft: scale(10),
    borderRadius: scale(100),
    backgroundColor: '#57429D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: wp(18),
    width: wp(18),
    borderRadius: wp(9),
  },
});

export default StylistMenu;
