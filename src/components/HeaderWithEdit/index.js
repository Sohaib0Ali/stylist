import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BackIcon from '../../assets/icons/backIcon.svg';
import styles from './style';

const Header = ({text, paddingHorizontal, onPress}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: paddingHorizontal && paddingHorizontal},
      ]}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon width={wp(5)} />
        </TouchableOpacity>
      </View>

      <View style={styles.save}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.saveText}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
