import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import icons from '../../assets/icons/icons';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../../assets/fonts/fonts';
import {Text} from 'react-native';
import colors from '../../assets/colors/colors';

const SpecialOfferComponent = ({
  title,
  IDName,
  marginBottom,
  source,
  onPressAddOffer,
}) => {
  return (
    <>
      {IDName === 'ADD NEW OFFER' ? (
        <View style={[styles.addButton, {marginTop: scale(14)}]}>
          <TouchableOpacity onPress={onPressAddOffer}>
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
          <View style={styles.imageContainer}>
            <Image source={{uri: source}} style={styles.image} />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: fonts.Exo2Regular,
              color: colors.headingBlack,
              fontWeight: '400',
              fontSize: verticalScale(12),
            }}>
            {title}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(32.5),
    height: hp(18.5),
    marginRight: wp(4.8),
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    width: wp(32.5),
    height: wp(28.5),
    marginBottom: hp(1.5),
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
});

export default SpecialOfferComponent;
