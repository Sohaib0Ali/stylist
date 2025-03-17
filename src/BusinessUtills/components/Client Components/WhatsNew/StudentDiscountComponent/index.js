import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SmallText from '../../../SmallText/SmallText';
import SemiMediumTitle from '../../../Semi Medium Title';
import colors from '../../../../assets/colors/colors';
import styles from './style';
import MediumTitle from '../../../MediumTitle/MediumTitle';

const StudentDiscountComponent = ({onPress,discount,day,name}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <MediumTitle title={discount} alignSelf="center" 
      marginTop={wp(14)}
      />
      <SmallText text={day} marginBottom={wp(22)}/>
      <View style={styles.bottomContainer}>
        <SemiMediumTitle title={name} color={colors.red} alignSelf="center" />
      </View>
    </TouchableOpacity>
  );
};

export default StudentDiscountComponent;
