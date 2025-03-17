import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images/images';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';

const SalonDetailComponent = ({
  cat,
  name,
  price,
  onPress,
  service,
  time,
  backgroundColor,
  type,
  keyValue,
  selected,
}) => {
  return (
    <TouchableOpacity
      key={keyValue}
      style={[styles.container, backgroundColor]}
      onPress={onPress}>
      <View style={styles.imgTextContainer}>
        <View style={styles.catNameBg}>
          {service ? (
            <View style={{marginLeft: scale(20)}}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.cat}>{time}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.cat}>{cat}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.priceBg}>
        <SmallTitle
          title={type}
          marginTop={wp(0.5)}
          marginLeft={wp(2)}
          marginRight={wp(0.5)}
          alignSelf="center"
        />
        <Text style={styles.price}>{price}</Text>
        {selected ? (
          <Image style={styles.selected} source={images.selected} />
        ) : (
          <Image style={styles.selected} source={images.notselected} />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default SalonDetailComponent;
