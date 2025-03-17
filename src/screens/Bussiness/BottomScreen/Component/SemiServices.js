import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

///////////////////////////////// import Local Files  //////////////////////////////////////////////////////////
import images from '../../../../BusinessUtills/assets/images/images';
import {Switch} from 'react-native-switch';
import SmallText from '../../../../BusinessUtills/components/SmallText/SmallText';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {scale} from 'react-native-size-matters';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import {t} from 'i18next';
import {Swipeable, RectButton} from 'react-native-gesture-handler';
import {Animated} from 'react-native';
import icons from '../../../../BusinessUtills/assets/icons/icons';

const SemiServices = ({
  price,
  cat,
  onPress,
  currency,
  time,
  textColor,
  ServiceType,
  deleteItem,
}) => {
  const [dragDelete, setDragDelete] = useState(false);
  const RightActions = (progress, dragX) => {
    setDragDelete(true);
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.animatedTextBg}
        onPress={deleteItem}>
        <Image
          style={[styles.actionImage, {}]}
          source={icons.cross}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={RightActions}>
      <Pressable
        style={[styles.container, {paddingLeft: wp(2)}]}
        onPress={onPress}>
        <View style={styles.catNameBg}>
          <View>
            <Text
              style={[styles.name, {color: textColor ? textColor : '#27232C'}]}>
              {cat}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.address,
                {color: textColor ? textColor : '#5E5E5F'},
              ]}>
              {ServiceType}
            </Text>
          </View>
        </View>
        <View style={styles.priceBg}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.price, {marginLeft: scale(90)}]}>
              {currency}
            </Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <SmallText text={t(`Approx time ${time}`)} fontSize={12} />
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default SemiServices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: wp(5),
    paddingVertical: hp(0.8),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    flexDirection: 'row',
    marginHorizontal: wp(1),
    justifyContent: 'space-between',
    marginVertical: hp(1),
    shadowOffset: {
      width: 0,
      height: 80,
    },
    shadowOpacity: 0.02,
    elevation: 3,
  },
  catNameBg: {marginLeft: scale(10)},
  name: {
    fontWeight: '400',
    fontSize: 16,
  },
  priceBg: {
    marginRight: scale(5),
    alignItems: 'center',
  },
  price: {
    color: colors.headingBlack,
    fontFamily: fonts.bold,
    fontSize: 16,

    // marginLeft:wp(2)
  },
  cat: {
    color: colors.black,
  },
  actionImage: {
    tintColor: colors.white,
    width: scale(15),
    height: scale(12),
  },
  animatedTextBg: {
    width: scale(35),
    height: scale(40),
    alignSelf: 'center',
    backgroundColor: '#FF807A',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
});
