import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images/images';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';

const Crewdetailscomponent = ({
  cat,
  name,
  img,
  onPress,
  service,
  time,
  backgroundColor,
  keyValue,
}) => {
  return (
    <>
      <TouchableOpacity
        key={keyValue}
        style={[styles.container, backgroundColor]}
        onPress={() => onPress()}>
        <View style={styles.imgTextContainer}>
          <View style={service ? styles.imgBg1 : styles.imgBg}>
            {img ? (
              <Image
                style={styles.img}
                source={{uri: img}}
                resizeMode="contain"
              />
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
          <Image
            style={styles.rating}
            source={images.rate}
            resizeMode="contain"
          />
          <SmallTitle
            title={'4.2'}
            marginTop={wp(0.5)}
            marginLeft={wp(2)}
            marginRight={wp(0.5)}
            alignSelf="center"
          />
        </View>
      </TouchableOpacity>
    </>
  );
};
export default Crewdetailscomponent;
