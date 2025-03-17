//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image} from 'react-native';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import Title from '../../../../BusinessUtills/components/Title/Title';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import images from '../../../../BusinessUtills/assets/images/images';
import SmallText from '../../../../BusinessUtills/components/SmallText/SmallText';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import Divider from '../../../../BusinessUtills/components/Divider/divider';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useTranslation} from 'react-i18next';

const AddSeatsAppoinmentsDetails = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <BackIcon paddingHorizontal={wp(4)} />
      <Title
        title={t('appoinmentsDetails')}
        marginBottom={hp(1)}
        alignSelf={'baseline'}
        marginLeft={wp(5)}
      />
      <View style={{height: wp(12), width: wp(30), justifyContent: 'center'}}>
        <SemiMediumTitle
          title={t('client')}
          marginTop={hp(0.5)}
          paddingHorizontal={wp(4)}
        />
      </View>

      <View style={{left: wp(5.5)}}>
        <View style={styles.rowContainer}>
          <View style={styles.imgTextContainer}>
            <View style={styles.imgBg}>
              <Image
                style={styles.manIcon}
                source={images.manIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.catNameBg}>
              <View>
                <SmallText text={'Jack Zlotkovitch'} alignSelf="flex-start" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: wp(5.5)}}>
        <View style={styles.itemContainer}>
          <SimpleText
            text={t('service')}
            marginTop={hp(1.8)}
            marginBottom={hp(1.4)}
            textAlign="left"
          />
          <SimpleText
            text={'Haircut'}
            alignSelf="center"
            color={colors.black}
          />
        </View>
        <Divider />
        <View style={styles.itemContainer}>
          <SimpleText
            text={t('type')}
            marginTop={hp(1.8)}
            marginBottom={hp(1.4)}
            textAlign="left"
          />
          <SimpleText
            text={'Hair style'}
            alignSelf="center"
            color={colors.black}
          />
        </View>
        <Divider />

        <View style={styles.itemContainer}>
          <SimpleText
            text={t('price')}
            marginTop={hp(1.8)}
            marginBottom={hp(1.4)}
            textAlign="left"
          />
          <SimpleText text={'$40'} alignSelf="center" color={colors.black} />
        </View>
        <Divider />
        <Button
          buttonText={t('confirmAppoinment')}
          width="100%"
          marginTop={hp(4.1)}
          onPress={() => navigation.navigate('SEATS_NEXT_APPOINMENTS')}
        />
      </View>
    </View>
  );
};
export default AddSeatsAppoinmentsDetails;
