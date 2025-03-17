import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../../../assets/images/images';
import moment from 'moment';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import fonts from '../../../../assets/fonts/fonts';
import {useTranslation} from 'react-i18next';

const StylistAppointment = ({
  address,
  name,
  price,
  img,
  onPress,
  status,
  service,
  typeName,
  currency,
  scheduletime,
  backgroundColor,
  textColor,
  iconImage,
}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      style={[styles.container, backgroundColor]}
      onPress={onPress}>
      <View>
        {status === 'confirmed' && (
          <Text style={styles.confirmlable}>{t('bookingConfirmed')}</Text>
        )}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.imgTextContainer}>
          <View style={service ? styles.imgBg1 : styles.imgBg}>
            {img ? (
              <Image
                style={styles.img}
                source={{uri: img}}
                resizeMode="contain"
              />
            ) : iconImage ? (
              <Image
                style={styles.img}
                source={{uri: iconImage}}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={styles.manIcon}
                source={images.manIcon}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.catNameBg}>
            {service ? (
              <View>
                <Text
                  style={[
                    styles.name,
                    {color: textColor ? '#000000' : 'white'},
                  ]}>
                  {name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.time, {color: '#848286'}]}>
                  {typeName}
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    styles.name,
                    {color: textColor ? '#000000' : 'white'},
                  ]}>
                  {name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.address, {color: '#848286'}]}>
                  {address}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <View style={styles.priceBg}>
            <Text
              style={[
                styles.price,
                {fontFamily: fonts.semiBold, fontSize: wp(3)},
              ]}>
              {currency}
            </Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <Text
            numberOfLines={1}
            style={[styles.address, {color: '#848286', fontSize: wp(3.1)}]}>
            {scheduletime ? moment(scheduletime).format('hh:mm A') : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default StylistAppointment;
