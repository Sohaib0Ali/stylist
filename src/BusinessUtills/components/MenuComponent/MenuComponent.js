import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import SmallTitle from '../SmallTitle/SmallTitle';

const MenuComponent = ({
  title,
  onPress,
  icon,
  marginTop,
  marginBottom,
  backgroundColor,
}) => {
  return (
    <View
      style={{
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
      }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.container, backgroundColor]}>
        <View style={styles.iconBg}>
          <Image style={styles.icon} source={{uri: icon}} />
        </View>
        <SmallTitle title={title} marginTop={wp(0.7)} marginBottom={wp(1)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(1.5),
    marginRight: wp(4.7),
    borderRadius: wp(33),
    backgroundColor: colors.white,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  iconBg: {
    backgroundColor: colors.white,
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    borderRadius: wp(99),
    padding: wp(3.5),
    width: wp(16),
    height: wp(16),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default MenuComponent;
