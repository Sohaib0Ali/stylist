//================================ React Native Imported Files ======================================//
import React from 'react';
import {View, ScrollView, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import images from '../../../../assets/images/images';
import SemiTitle from '../../../../components/SemiTitle';
import SmallText from '../../../../components/SmallText/SmallText';
import Button from '../../../../components/Button/Button';
import StarIcon from '../../../../assets/icons/star.svg';
import MapIcon from '../../../../assets/icons/map.svg';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import colors from '../../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const DiscountDetailScreen = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Title title="15 % off" alignSelf="flex-start" />
          <SimpleText
            text="Every Monday"
            marginLeft={wp(5)}
            alignSelf="flex-end"
          />
        </View>
        <View style={styles.imgBg}>
          <Image source={images.man9} style={styles.img} resizeMode="stretch" />
        </View>
        <View style={styles.reviewDistanceBg}>
          <View style={styles.reviewBg}>
            <StarIcon
              width={wp(4)}
              height={wp(4)}
              style={{marginRight: wp(1.5)}}
            />
            <SmallTitle title="4.8" alignSelf="auto" />
            <SmallText text="(12 Reviews)" marginLeft={wp(1.5)} />
          </View>
          <View style={styles.distanceBg}>
            <MapIcon
              width={wp(4)}
              height={wp(4)}
              style={{marginRight: wp(1.5)}}
            />
            <SmallTitle title="1.3 miles" alignSelf="auto" color={colors.red} />
          </View>
        </View>
        <SemiTitle title="Toney & Guy" alignSelf="flex-start" />
        <SmallText
          text="16th Street Mall London WC2JW"
          alignSelf="flex-start"
          marginBottom={hp(2)}
          marginTop={hp(1)}
        />
        <SimpleText
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas aliquet vel malesua nullamin tinc idunt ullamcorper dolor eros. Mauris quis mauris pretium eget."
          alignSelf="flex-start"
          textAlign="left"
        />
        <Button
          buttonText={t('book')}
          marginTop={hp(5)}
          onPress={() => navigation.navigate('CHOOSE_MASTER_SCREEN')}
        />
      </ScrollView>
    </View>
  );
};

export default DiscountDetailScreen;
