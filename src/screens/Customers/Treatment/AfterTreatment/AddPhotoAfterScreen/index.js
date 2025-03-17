import {View, Image, ScrollView} from 'react-native';
import React from 'react';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import colors from '../../../../../assets/colors/colors';
import Title from '../../../../../components/Title/Title';
import SimpleText from '../../../../../components/SimpleText/SimpleText';
import images from '../../../../../assets/images/images';
import Button from '../../../../../components/Button/Button';
import {Rating} from 'react-native-ratings';
import SmallTitle from '../../../../../components/SmallTitle/SmallTitle';
import SmallText from '../../../../../components/SmallText/SmallText';
import {useTranslation} from 'react-i18next';

export default function AddPhotoAfterScreen() {
  const {t} = useTranslation();
  const ratingCompleted = rating => {};
  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.toggle} />
          <Title
            title={t('memories')}
            alignSelf="flex-start"
            marginTop={hp(4)}
          />

          <View style={styles.imgContainer}>
            <View style={styles.imgTextBg}>
              <SimpleText
                text={t('before')}
                alignSelf="flex-start"
                marginTop={hp(2)}
                marginBottom={hp(1.5)}
              />
              <View style={styles.imgBg}>
                <Image
                  source={images.woman12}
                  resizeMode="stretch"
                  style={styles.img}
                />
              </View>
            </View>
            <View style={styles.imgTextBg}>
              <SimpleText
                text={t('after')}
                alignSelf="flex-start"
                marginTop={hp(2)}
                marginBottom={hp(1.5)}
              />
              <View style={styles.imgBg}>
                <Image
                  source={images.woman13}
                  resizeMode="stretch"
                  style={styles.img}
                />
              </View>
            </View>
          </View>
          <SmallTitle
            title="Rate & Review"
            alignSelf="flex-start"
            marginTop={hp(5)}
            marginBottom={hp(1)}
          />
          <SmallText text="Share your experience" alignSelf="flex-start" />
          <View style={styles.imgReviewBg}>
            <View style={styles.iconBg}>
              <Image style={styles.icon} source={images.manIcon} />
            </View>

            <Rating
              type="star"
              ratingCount={5}
              imageSize={24}
              onFinishRating={ratingCompleted}
            />
          </View>

          <Button buttonText={t('addPhotoAfter')} marginTop={hp(3)} />
        </View>
      </ScrollView>
    </View>
  );
}
