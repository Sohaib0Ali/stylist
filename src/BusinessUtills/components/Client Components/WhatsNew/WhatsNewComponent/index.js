import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SmallText from '../../../SmallText/SmallText';
import SemiMediumTitle from '../../../Semi Medium Title';
import colors from '../../../../assets/colors/colors';
import MediumTitle from '../../../MediumTitle/MediumTitle';
import SemiTitle from '../../../SemiTitle';

const WhatsNewComponent = ({onPress, tag, name, address, img, text}) => {
  return (
    <View style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.tagBg}>
          <MediumTitle title={tag} alignSelf="center" />
        </View>
        <View style={styles.textBg}>
          <SemiTitle title={name} alignSelf="flex-start" />
          <SmallText text={address} alignSelf="flex-start" />
        </View>
      </View>
      <View style={styles.imgBg}>
        <Image source={img} style={styles.img} resizeMode="stretch" />
      </View>
      <SmallText text={text} alignSelf="flex-start" marginTop={wp(3)} />
      <TouchableOpacity activeOpacity={0.6}>
        <SemiMediumTitle
          title="Visit site"
          color={colors.btnColor}
          marginTop={wp(3)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: hp(1.8),
  },
  tagBg: {
    width: wp(12.5),
    height: wp(12.5),
    backgroundColor: colors.borderColor,
    borderRadius: wp(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBg: {
    marginLeft: wp(3),
  },
  imgBg: {
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: wp(4),
  },
});

export default WhatsNewComponent;
