import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MediumTitle from '../../MediumTitle/MediumTitle';

const ChooseTypeComponent = ({
  name,
  price,
  onPress,
  time,
  backgroundColor,
  type,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, backgroundColor]}
      onPress={onPress}>
      <View style={styles.imgTextContainer}>
        <View style={styles.catNameBg}>
          <View>
            <MediumTitle style={styles.name} title={name} />
            <Text style={styles.cat}>{time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceBg}>
        <SmallTitle
          title={type}
          marginTop={wp(0.5)}
          marginLeft={wp(2)}
          marginRight={wp(1)}
          alignSelf="center"
        />
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ChooseTypeComponent;
