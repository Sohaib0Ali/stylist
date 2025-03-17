import React from 'react';
import {View, Image, TouchableOpacity, Animated, Text} from 'react-native';
import icons from '../../../../assets/icons/icons';
import MediumTitle from '../../../MediumTitle/MediumTitle';
import SmallText from '../../../SmallText/SmallText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styles from './style';
import SmallTitle from '../../../SmallTitle/SmallTitle';

const BookedComponent = ({icon, name, cat, price, date, onPress, type}) => {
  const RightActions = progress => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
    });

    return (
      <RectButton style={styles.rightAction}>
        <TouchableOpacity activeOpacity={0.6} style={styles.animatedTextBg}>
          <Animated.Image
            style={[
              styles.actionImage,
              {
                transform: [{translateX: trans}],
              },
            ]}
            source={icons.cross}
            resizeMode="contain"></Animated.Image>
        </TouchableOpacity>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions}>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={onPress}
        activeOpacity={0.6}>
        <View style={styles.container} onPress={onPress}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            </View>
            <View style={styles.textContainer}>
              <MediumTitle title={name} alignSelf="flex-start" />
              <SmallText text={cat} alignSelf="flex-start" />
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <SmallTitle title={type} alignSelf="center" />
            <MediumTitle title={price} alignSelf="flex-end" />
          </View>
          <SmallText text={date} alignSelf="flex-end" />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
export default BookedComponent;
