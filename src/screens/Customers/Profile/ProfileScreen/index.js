//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../components/Button/Button';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiTitle from '../../../../components/SemiTitle';
import colors from '../../../../assets/colors/colors';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import images from '../../../../assets/images/images';
import Config from '../../../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import icons from '../../../../assets/icons/icons';

const ProfileScreen = ({navigation, img}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [uriObj, setUriObj] = useState('');

  useEffect(() => {
    if (isFocused) {
      let userData = Config.userDetail;
      setName(userData?.name);
      setEmail(userData?.email);
      setUriObj(userData?.profileImageURL);
      if (!Config.token) {
        setName(Config.guestName);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DISCOVER_SCREEN');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}>
          <Image
            style={styles.backIcon}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {Config.token ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('EDIT_PROFILE_SCREEN');
            }}>
            <SimpleText
              text={t('edit')}
              alignSelf="flex-end"
              color={colors.black}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.imgBg}>
          {!uriObj ? (
            <Image style={styles.img} source={img} resizeMode="contain" />
          ) : (
            <Image
              style={styles.img}
              source={uriObj ? {uri: uriObj} : images.manIcon}
              resizeMode="stretch"
            />
          )}
        </View>
        <SemiTitle title={name} alignSelf="center" />
        <SmallText text={email} alignSelf="center" color={colors.black} />

        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('BOOKED_SCREEN')}>
          <SimpleText
            text={t('bookings')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('MEMORIES_SCREEN')}>
          <SimpleText
            text={t('memories')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('WHATS_NEW_SCREEN')}>
          <SimpleText
            text={t('whatsNew')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('NOTIFICATION_SCREEN')}>
          <SimpleText
            text={t('notifications')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('FAVORITES_SCREEN')}>
          <SimpleText
            text={t('favorites')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('PROMO_CODES_SCREEN')}
          activeOpacity={0.6}>
          <SimpleText
            text={t('promoCodes')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('HELP_CENTER_SCREEN')}>
          <SimpleText
            text={t('helpCenter')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('TERMS_POLICY_SCREEN')}>
          <SimpleText
            text={t('termsPrivacyPolicy')}
            alignSelf="flex-start"
            color={colors.black}
          />
          <Image
            style={styles.arrow}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={{paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(3)}}>
          <Button
            buttonText={t('logout')}
            marginTop={hp(7)}
            onPress={() => {
              Config.token = '';
              Config.fcmToken = '';
              Config.bookingData = null;
              AsyncStorage.clear();
              AsyncStorage.removeItem('tokenValue'),
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LOGIN_SCREEN'}],
                });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
