import {View, Image, Text} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './style';
import fonts from '../../../assets/fonts/fonts';
import {useTranslation} from 'react-i18next';

export default function MemoryBeforeAfterComponet({img, img1, title, text}) {
  const {t} = useTranslation();
  return (
    <View style={{paddingHorizontal: wp('4%')}}>
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBg}>
            <Text
              style={{
                fontFamily: fonts.Exo2Bold,
                color: 'black',
                fontWeight: '400',
                fontSize: 16,
                left: 5,
                marginBottom: 5,
              }}>
              {img ? t('before') : null}
            </Text>
            <Image
              source={{uri: img}}
              resizeMode="stretch"
              style={styles.img}
            />
          </View>

          <View style={styles.imgBg}>
            <Text
              style={{
                fontFamily: fonts.Exo2Bold,
                color: 'black',
                fontWeight: '400',
                fontSize: 16,
                left: 5,
                marginBottom: 5,
              }}>
              {img1 ? t('after') : null}
            </Text>
            <Image
              source={{uri: img1}}
              resizeMode="stretch"
              style={styles.img}
            />
          </View>
        </View>
      </View>
      <Text
        style={{
          fontWeight: '400',
          fontSize: 14,
          color: '#5E5E5F',
          width: 333,
          lineHeight: 22.4,
          marginTop: 10,
        }}>
        {t('takePhotoText')}
      </Text>
    </View>
  );
}
