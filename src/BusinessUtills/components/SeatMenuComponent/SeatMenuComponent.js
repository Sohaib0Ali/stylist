import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import icons from '../../assets/icons/icons';
import SmallTitle from '../SmallTitle/SmallTitle';
import {scale, verticalScale} from 'react-native-size-matters';

const SeatMenuComponent = ({
  idName,
  title,
  onPress,
  icon,
  bookingCount,
  marginBottom,
  onPressAddseat,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      {idName === 'NewSeatData' ? (
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: '#57429D'}]}
          onPress={onPressAddseat}>
          <Image
            source={icons.AddPlus}
            style={{height: verticalScale(15), width: verticalScale(15)}}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            height: hp(13.5),
          }}>
          <View style={styles.iconBg2}>
            <SmallTitle title={bookingCount} alignSelf="center" />
          </View>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.container]}>
            <View style={styles.iconBg}>
              <Image resizeMode="cover" style={styles.icon} source={icon} />
            </View>
            <SmallTitle
              title={title}
              marginTop={wp(0.7)}
              marginBottom={wp(1)}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: scale(60),
    width: scale(60),
    alignSelf: 'center',
    marginLeft: scale(15),
    borderRadius: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop: 10,
    height: hp(20),
    width: wp(29),
    borderRadius: wp(5),
  },
  iconBg2: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: '#FFF',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 6,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#F6F5F3',
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: wp(5),
    padding: wp(1),
    width: wp(20), //wp(42),
    height: hp(10), //wp(55),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default SeatMenuComponent;
