import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import icons from '../../assets/icons/icons';
import styles from './style';
import DownIcon from '../../assets/icons/downIcon.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgUri} from 'react-native-svg';

const PickerComponent = ({value, title, direction, onPress}) => {
  return (
    <View>
      {direction === 'LTR' ? (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.leftContainer}>
            {title ? <Text style={{...styles.title}}>{title}</Text> : null}

            <Text style={styles.value}>{value}</Text>
          </View>
          <View style={styles.rightContainer}>
            <SvgUri width={wp(5)} height={hp(3)} uri={DownIcon} />
          </View>
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
