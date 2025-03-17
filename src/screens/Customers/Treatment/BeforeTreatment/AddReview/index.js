import {View, Image, ScrollView} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';
import colors from '../../../../../assets/colors/colors';
import Title from '../../../../../components/Title/Title';
import SimpleText from '../../../../../components/SimpleText/SimpleText';
import images from '../../../../../assets/images/images';
import SmallText from '../../../../../components/SmallText/SmallText';
import Button from '../../../../../components/Button/Button';
import {useTranslation} from 'react-i18next';

export default function AddReviewScreen1() {
  const {t} = useTranslation();
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
          <SimpleText
            text="Before"
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
          <SmallText
            marginTop={hp(4)}
            alignSelf="flex-start"
            text="After the treatment, take a photo after that to compare the result."
          />
          <Button buttonText={t('save')} marginTop={hp(3)} />
        </View>
      </ScrollView>
    </View>
  );
}
