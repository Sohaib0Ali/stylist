//================================ React Native Imported Files ======================================//
import React, { useEffect, useState } from 'react';
import { Image, View, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import Button from '../../../components/Button/Button';
import images from '../../../assets/images/images';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreen = props => {
  const navigation = useNavigation();
  const { route } = props;
  const role = route?.params?.role;
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { t, i18n } = useTranslation();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('selectedLang').then(value => {
      if (value) {
        setSelectedLanguage(value);
        i18n.changeLanguage(value);
      }
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: colors.secondary,
        }}
      />
      <StatusBar backgroundColor={colors.secondary} translucent={true} />
      <View style={{ height: '65%' }}>
        <Swiper
          loop={true}
          autoplay={true}
          horizontal={true}
          showsButtons={false}
          showsPagination={true}
          autoplayTimeout={2.5}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationContainer}
          onMomentumScrollBegin={() => setIsScrolling(true)}
          onMomentumScrollEnd={() => setIsScrolling(false)}
          removeClippedSubviews={false}>
          <View key="0" style={styles.sectionView}>
            <View style={styles.aboveBars} />
            <View style={styles.imageView}>
              <Image source={images.first} style={styles.imageStyle} />
            </View>
            <View style={styles.titleBottom}>
              <Text
                style={[
                  styles.titleText,
                  { width: wp(85), textAlign: 'center' },
                ]}>
                {i18n.t('onBoardingTitle')}
              </Text>
            </View>
          </View>

          <View key="1" style={styles.sectionView}>
            <View style={styles.aboveBars} />
            <View style={styles.imageView}>
              <Image source={images.second} style={styles.imageStyle} />
            </View>
            <View style={styles.titleBottom}>
              <Text
                style={[
                  styles.titleText,
                  { width: wp(95), textAlign: 'center' },
                ]}>
                {t('onBoardingTitle1')}
              </Text>
            </View>
          </View>
          <View key="2" style={styles.sectionView}>
            <View style={styles.aboveBars} />
            <View style={styles.imageView}>
              <Image source={images.Third} style={styles.imageStyle} />
            </View>
            <View style={styles.titleBottom}>
              <Text
                style={[
                  styles.titleText,
                  { width: wp(85), textAlign: 'center' },
                ]}>
                {t('onBoardingTitle2')}
              </Text>
            </View>
          </View>
        </Swiper>
      </View>
      <View
        style={{
          height: '35%',
        }}>
        <View style={styles.btnBottomView}>
          <Button
            buttonText={t('logIn')}
            marginTop={wp(2)}
            onPress={() => {
              role === 'Customer'
                ? navigation.navigate('LOGIN_SCREEN')
                : navigation.navigate('BLOGIN_SCREEN');
            }}
          />
          <Button
            buttonText={t('signUp')}
            marginTop={wp(3)}
            onPress={() => {
              role === 'Customer'
                ? navigation.navigate('REGISTER_SCREEN')
                : navigation.navigate('BREGISTER_SCREEN');
            }}
          />
          {role === 'Customer' && (
            <Button
              buttonText={t('guest')}
              bgColor="transparent"
              textColor={colors.btnColor}
              marginTop={wp(3)}
              onPress={() => {
                navigation.navigate('ONBOARDING_PERMISSION_SCREEN');
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
