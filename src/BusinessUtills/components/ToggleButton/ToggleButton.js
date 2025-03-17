import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';

const ToggleButton = ({
  rightText,
  rightText2,
  leftText,
  getCountValue,
  disabled,
  threeOptions,
}) => {
  const [color, setColor] = useState(1);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setColor(1), getCountValue(1);
        }}
        activeOpacity={0.7}
        style={color === 1 ? styles.leftContainer : styles.rightContainer}>
        <Text
          style={color === 1 ? styles.leftTextStyle : styles.rightTextStyle}>
          {leftText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setColor(2), getCountValue(2);
        }}
        activeOpacity={0.7}
        style={color === 2 ? styles.leftContainer : styles.rightContainer}>
        <Text
          style={color === 2 ? styles.leftTextStyle : styles.rightTextStyle}>
          {rightText}
        </Text>
      </TouchableOpacity>
      {threeOptions ? (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            setColor(3), getCountValue(3);
          }}
          activeOpacity={0.7}
          style={color === 3 ? styles.leftContainer : styles.rightContainer}>
          <Text
            style={color === 3 ? styles.leftTextStyle : styles.rightTextStyle}>
            {rightText2}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default ToggleButton;
