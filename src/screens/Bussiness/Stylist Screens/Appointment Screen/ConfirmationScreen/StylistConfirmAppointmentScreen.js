//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Image, SafeAreaView} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import Title from '../../../../../BusinessUtills/components/Title/Title';
import SemiMediumTitle from '../../../../../BusinessUtills/components/Semi Medium Title';
import images from '../../../../../BusinessUtills/assets/images/images';
import SmallText from '../../../../../BusinessUtills/components/SmallText/SmallText';
import SimpleText from '../../../../../BusinessUtills/components/SimpleText/SimpleText';
import Divider from '../../../../../BusinessUtills/components/Divider/divider';
import Button from '../../../../../BusinessUtills/components/Button/Button';
import fonts from '../../../../../BusinessUtills/assets/fonts/fonts';
import BConfig from '../../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

const StylistConfirmAppointmentScreen = ({route}) => {
  const navigation = useNavigation();
  const dataSelect = route.params.dataSelect;
  const {t} = useTranslation();
  const confirmAppointment = () => {
    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}/business/confirmBooking/${dataSelect?._id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        navigation.goBack();
      })
      .catch(function (error) {});
  };
  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
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
              {dataSelect?.clientProfile ? (
                <Image
                  style={styles.img}
                  source={{uri: dataSelect?.clientProfile}}
                  resizeMode="stretch"
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
              <View>
                <SmallText
                  text={dataSelect?.clientName}
                  alignSelf="flex-start"
                />
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
            text={dataSelect?.serviceName}
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
            text={dataSelect?.serviceTypeName}
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
          <View style={{flexDirection: 'row'}}>
            <SimpleText
              text={dataSelect?.currency}
              alignSelf="center"
              color={colors.black}
              fontSize={wp(3.5)}
            />
            <SimpleText
              text={dataSelect?.amount}
              alignSelf="center"
              color={colors.black}
              fontFamily={fonts.semiBold}
            />
          </View>
        </View>
        <Divider />
        {dataSelect?.status === 'confirmed' ? null : (
          <Button
            buttonText={t('confirmAppoinment')}
            width="100%"
            marginTop={hp(4.1)}
            onPress={confirmAppointment}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default StylistConfirmAppointmentScreen;
