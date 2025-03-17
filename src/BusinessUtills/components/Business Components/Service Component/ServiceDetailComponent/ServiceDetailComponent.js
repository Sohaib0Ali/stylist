import React, {useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

///////////////////////////////// import Local Files  //////////////////////////////////////////////////////////

import images from '../../../../assets/images/images';
import SmallText from '../../../SmallText/SmallText';
import {Switch} from 'react-native-switch';
import styles from './style';
import colors from '../../../../assets/colors/colors';
import SimpleText from '../../../SimpleText/SimpleText';

const ServiceDetailComponent = ({
  address,
  name,
  price,
  img,
  cat,
  onPress,
  iconImg,
  checkswitch,
  id,
  service,
  currency,
  time,
  status,
  backgroundColor,
  onSwitchValueChange,
  borderRadius,
  textColor,
}) => {
  const [isEnabled, setIsEnabled] = useState(status);
  const {t} = useTranslation();

  const handleSwitchChange = value => {
    setIsEnabled(value);
    onSwitchValueChange(value, id);
  };
  return (
    <Pressable
      style={[
        styles.container,
        backgroundColor,
        {borderRadius: borderRadius ? borderRadius : wp(5)},
      ]}
      onPress={onPress}>
      <View style={styles.imgTextContainer}>
        {img ? (
          <View style={service ? styles.imgBg1 : styles.imgBg}>
            {img ? (
              <Image
                style={styles.img}
                source={{uri: img}}
                resizeMode="contain"
              />
            ) : iconImg ? (
              <Image style={styles.img} source={iconImg} resizeMode="contain" />
            ) : (
              <Image
                style={styles.manIcon}
                source={images.manIcon}
                resizeMode="contain"
              />
            )}
          </View>
        ) : null}
        <View style={styles.catNameBg}>
          {service ? (
            <View>
              <Text
                style={[
                  styles.name,
                  {color: textColor ? textColor : '#27232C'},
                ]}>
                {cat}
              </Text>
              {time ? (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.address,
                    {color: textColor ? textColor : '#5E5E5F'},
                  ]}>
                  {time}
                </Text>
              ) : null}
            </View>
          ) : (
            <View>
              <Text
                style={[styles.name, {color: textColor ? '#000000' : 'white'}]}>
                {name}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {color: textColor ? textColor : '#B7B6F7'},
                ]}>
                {address}
              </Text>
            </View>
          )}
        </View>
      </View>

      {price ? (
        <View style={styles.priceBg}>
          <SmallText text={t('from')} marginRight={wp(2)} />
          <View style={{flexDirection: 'row'}}>
            <SimpleText text={currency} />
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      ) : (
        checkswitch && (
          <View style={styles.priceBg}>
            <Switch
              value={isEnabled}
              onValueChange={handleSwitchChange}
              disabled={false}
              circleSize={wp(8)}
              barHeight={wp(8.9)}
              circleBorderWidth={0}
              backgroundActive={colors.lightGreen}
              backgroundInactive={colors.grey}
              circleActiveColor={colors.white}
              circleInActiveColor={colors.white}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={wp(66)}
            />
          </View>
        )
      )}
    </Pressable>
  );
};
export default ServiceDetailComponent;
