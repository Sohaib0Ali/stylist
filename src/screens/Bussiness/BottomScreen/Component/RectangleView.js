import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const RectangleView = ({number, heading, subHeading, backgroundColor}) => {
  const styles = StyleSheet.create({
    containerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: hp(8),
      borderRadius: 50,
      shadowColor: '#000000',
      shadowOffset: {width: -2, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: backgroundColor,
      marginTop: hp(1),
      // elevation: 5,
      // borderColor:"black",
    },
    countText: {
      alignItems: 'center',
      alignSelf: 'center',
      marginRight: 45,
      backgroundColor: 'black',
      height: 19,
      width: 19,
      borderRadius: 100,
    },
  });
  return (
    <View style={styles.containerView}>
      <View style={{alignSelf: 'center', marginLeft: 45}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'left',
            color: '#27232C',
          }}>
          {heading}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            extAlign: 'left',
            color: '#5E5E5F',
            marginTop: 5,
          }}>
          {subHeading}
        </Text>
      </View>
      <View style={styles.countText}>
        <Text style={{color: 'white', alignSelf: 'center'}}>{number}</Text>
      </View>
    </View>
  );
};

export default RectangleView;
