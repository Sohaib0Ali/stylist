import React from 'react';
import {View, Image, TouchableOpacity, Animated} from 'react-native';
import icons from '../../../../assets/icons/icons';
import MediumTitle from '../../../MediumTitle/MediumTitle';
import SmallText from '../../../SmallText/SmallText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './style';
import SmallTitle from '../../../SmallTitle/SmallTitle';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const BookedComponent = ({
  icon,
  name,
  cat,
  price,
  date,
  onPress,
  type,
  deleteBokingItem,
}) => {
  const RightActions = progress => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
    });

    return (
      <View style={styles.rightAction}>
        <TouchableOpacity
          onPress={() => deleteBokingItem()}
          activeOpacity={0.6}
          style={styles.animatedTextBg}>
          <Animated.Image
            style={[
              styles.actionImage,
              {
                transform: [{translateX: trans}],
              },
            ]}
            source={icons.cross}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions}>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={onPress}
        activeOpacity={0.6}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{uri: icon}}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <MediumTitle title={name} alignSelf="flex-start" />
              <SmallText text={cat} alignSelf="flex-start" />
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <SmallTitle title={type} alignSelf="center" marginRight={wp(1)} />
            <MediumTitle title={price} alignSelf="flex-end" />
          </View>
          <SmallText text={date} alignSelf="flex-end" />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default BookedComponent;
