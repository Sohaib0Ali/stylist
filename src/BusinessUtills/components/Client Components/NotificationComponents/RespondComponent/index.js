import React from 'react';
import {View, Image, TouchableOpacity, Animated} from 'react-native';
import icons from '../../../../assets/icons/icons';
import MediumTitle from '../../../MediumTitle/MediumTitle';
import SmallText from '../../../SmallText/SmallText';
import SmallTitle from '../../../SmallTitle/SmallTitle';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './style';

const RespondComponent = ({
  status,
  time,
  pic,
  name,
  response,
  star,
  comment,
  borderColor,
  onPress,
}) => {
  const RightActions = (progress, dragX) => {
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
        style={[styles.container, borderColor]}
        onPress={onPress}>
        <View style={styles.textRow}>
          <SmallText text={status} />
          <SmallText text={time} />
        </View>
        <View style={styles.rowContainer}>
          <View
            style={
              status === 'Pending Confirmation'
                ? styles.iconContainer1
                : styles.iconContainer
            }>
            <Image source={pic} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <MediumTitle title={name} />
            <SmallText text={response} />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
export default RespondComponent;
