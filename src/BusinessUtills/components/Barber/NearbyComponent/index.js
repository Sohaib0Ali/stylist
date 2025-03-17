import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import icons from '../../../assets/icons/icons';
import images from '../../../assets/images/images';
import Button from '../../Button/Button';
import MediumTitle from '../../MediumTitle/MediumTitle';
import SmallText from '../../SmallText/SmallText';

const NearbyComponent = props => {
  const {onPress, backgroundColor, borderColor} = props;
  return (
    <TouchableOpacity
      style={[styles.cardContainer, backgroundColor]}
      onPress={onPress}>
      <View style={styles.ImgBg}>
        <Image source={images.barber} style={styles.img} resizeMode="contain" />
      </View>
      <View style={[styles.starBg, borderColor]}>
        <Image source={icons.star1} style={styles.star} esizeMode="contain" />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.companyBg}>
          <MediumTitle title="TG" alignSelf="center" />
        </View>
        <View style={{flex: 1, alignItems: 'flex-start', marginTop: 20}}>
          <MediumTitle
            title="Tony & Guy"
            color={colors.white}
            alignSelf="center"
            marginBottom={hp(0.1)}
          />
          <SmallText text="Winder,Alma road" color={colors.white} />
        </View>
        <Button buttonText="Book" width="27%" height={hp(6)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: wp('78%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: colors.yellow,
    marginTop: hp(3),
    borderTopRightRadius: wp(95),
    borderTopLeftRadius: wp(95),
    marginRight: wp(3),
    borderBottomLeftRadius: wp(12),
    borderBottomRightRadius: wp(12),
  },
  ImgBg: {
    width: wp(70),
    height: wp(70),
    borderRadius: 133,
    borderWidth: wp(1.6),
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 133,
  },
  starBg: {
    width: wp(10),
    height: wp(10),
    padding: wp(1.5),
    borderRadius: 133,
    borderWidth: wp(1.5),
    borderColor: 'red',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -53,
    alignSelf: 'flex-start',
    marginLeft: wp(4),
  },
  star: {
    width: '100%',
    height: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(3.5),
  },
  companyBg: {
    paddingTop: wp(1.3),
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 133,
    backgroundColor: colors.white,
  },
});

export default NearbyComponent;
