import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import images from '../../assets/images/images';
import SmallTitle from '../SmallTitle/SmallTitle';

const MenuComponent = ({
  id,
  title,
  onPress,
  icon,
  marginTop,
  marginBottom,
  backgroundcolor,
  keyValue,
}) => {
  if (id == 'filterarrat123') {
    return (
      <View
        key={keyValue}
        style={{
          marginTop: marginTop ? marginTop : 0,
          marginBottom: marginBottom ? marginBottom : 0,
        }}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.container]}>
          <View
            style={[
              styles.filterBg,
              backgroundcolor != '#FFDE82'
                ? {borderWidth: wp(0.5), borderColor: colors.borderColor}
                : null,
            ]}>
            <Image style={styles.icon} source={images.Filter} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <>
        <View
          key={keyValue}
          style={{
            marginTop: marginTop ? marginTop : 0,
            marginBottom: marginBottom ? marginBottom : 0,
          }}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.container]}>
            <View style={[styles.iconBg, {backgroundColor: backgroundcolor}]}>
              <Image style={styles.icon} source={{uri: icon}} />
            </View>
            <SmallTitle
              title={title}
              width={wp(15)}
              marginTop={wp(0.7)}
              marginBottom={wp(1)}
              color={backgroundcolor}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(1.2),
    marginRight: wp(4),
    borderRadius: wp(33),
  },
  iconBg: {
    borderRadius: wp(99),
    padding: wp(3.5),
    width: wp(16),
    height: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBg: {
    backgroundColor: colors.white,
    borderRadius: wp(99),
    padding: wp(3.5),
    width: wp(16),
    height: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: '100%',
    height: '100%',
  },
  filterIcon: {
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default MenuComponent;
