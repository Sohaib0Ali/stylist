import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images/images';
import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SalonDetailComponent = ({
  address,
  name,
  img,
  onPress,
  iconImg,
  service,
  time,
  backgroundColor,
  textColor,
  paddingVertical,
  elevation,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        backgroundColor,
        {
          paddingVertical: paddingVertical ? paddingVertical : hp(3.1),
          elevation: elevation !== 'dashHead' ? 2 : 0,
        },
      ]}
      onPress={onPress}>
      <View style={styles.imgTextContainer}>
        <View style={service ? styles.imgBg1 : styles.imgBg}>
          {img ? (
            <Image
              style={styles.img}
              source={{uri: img}}
              resizeMode="stretch"
            />
          ) : (
            <Image
              style={styles.img}
              source={images.manIcon}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.catNameBg}>
          {service ? (
            <View>
              <Text
                style={[styles.name, {color: textColor ? '#000000' : 'white'}]}>
                {name}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {color: textColor ? textColor : '#B7B6F7'},
                ]}>
                {time}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={[styles.name, {color: textColor ? '#000000' : 'white'}]}>
                {name}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {color: textColor ? textColor : '#B7B6F7'},
                ]}>
                {address}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Image source={iconImg} />
      </View>
    </TouchableOpacity>
  );
};
export default SalonDetailComponent;
