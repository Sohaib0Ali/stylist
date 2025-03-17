import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../../../assets/images/images';
import SmallTitle from '../../../SmallTitle/SmallTitle';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const StylistDetailComponent = ({
  address,
  name,
  cat,
  img,
  status,
  onPress,
  service,
  backgroundColor,
  textColor,
  type,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, backgroundColor]}
      onPress={onPress}>
      <View style={styles.imgTextContainer}>
        <View style={service ? styles.imgBg1 : styles.imgBg}>
          {img ? (
            <Image style={styles.img} source={{uri: img}} resizeMode="cover" />
          ) : (
            <Image
              style={styles.manIcon}
              source={images.manIcon}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.catNameBg}>
          {service ? (
            <View>
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {color: textColor ? textColor : '#B7B6F7'},
                ]}>
                {cat}
              </Text>
              <Text
                style={[styles.name, {color: textColor ? '#000000' : 'white'}]}>
                {name}
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
      <View style={styles.priceBg}>
        <SmallTitle title={type} marginTop={wp(0.5)} marginLeft={wp(2)} />
        <Text
          style={[
            styles.status,
            {
              color:
                status === 'Avilable'
                  ? '#05A660'
                  : status === 'Work'
                  ? '#848286'
                  : status === 'Wait'
                  ? '#E5B800'
                  : '#FF5C5C',
            },
          ]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default StylistDetailComponent;
