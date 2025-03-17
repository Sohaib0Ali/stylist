import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import icons from '../../assets/icons/icons';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import images from '../../assets/images/images';

const PickerComponent = ({
  value,
  title,
  direction,
  onPress,
  paddingHorizontal,
  titleMarginBottom,
}) => {
  return (
    <View>
      {direction === 'LTR' ? (
        <TouchableOpacity
          style={[
            styles.container,
            {
              borderWidth: title ? 1 : 0,
              paddingVertical: title ? hp(0) : 0,
              paddingHorizontal: paddingHorizontal && paddingHorizontal,
            },
          ]}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.leftContainer}>
            {title ? (
              <Text
                style={{
                  ...styles.title,
                  textAlign: 'left',
                  marginTop: hp(1),
                  marginBottom: titleMarginBottom ? titleMarginBottom : hp(0),
                }}>
                {title}
              </Text>
            ) : null}

            <Text
              style={[
                styles.value,
                {color: title ? colors.black : '#57429D', marginBottom: hp(2)},
              ]}>
              {value}
            </Text>
          </View>
          {!title ? (
            <View style={styles.rightContainer}>
              \{' '}
              <Image
                source={images?.DownArrow}
                resizeMode="stretch"
                style={styles.img}
              />
            </View>
          ) : (
            <View style={styles.rightContainer}>
              <Image
                source={images?.DownArrow}
                resizeMode="stretch"
                style={styles.img}
              />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.rightContainer}>
            <Image
              style={{...styles.icon, alignSelf: 'flex-start'}}
              resizeMode="contain"
              source={icons.downIcon}
            />
          </View>
          <View style={styles.leftContainer}>
            <Text style={{...styles.title, alignSelf: 'flex-end'}}>
              {title}
            </Text>

            <Text style={{...styles.value, alignSelf: 'flex-end'}}>
              {value}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PickerComponent;
