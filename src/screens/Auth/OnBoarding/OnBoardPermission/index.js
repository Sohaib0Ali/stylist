import {
  Switch,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import images from '../../../../assets/images/images';
import { scale } from 'react-native-size-matters';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';

const OnBoardPermission = () => {
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  const { t, i18n } = useTranslation();
  const requestLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        const locationAlwaysStatus = await request(
          PERMISSIONS.IOS.LOCATION_ALWAYS,
        );

        const locationWhenInUseStatus = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (locationAlwaysStatus === 'granted' && locationWhenInUseStatus === 'granted') {
          setIsEnabled(true);
        } else if (
          (locationAlwaysStatus === 'denied' ||
            locationAlwaysStatus === 'blocked') &&
          (locationWhenInUseStatus === 'denied' ||
            locationWhenInUseStatus === 'blocked')
        ) {
          setIsEnabled(false);
        }
      } else {
        const LocationFine = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const LocationBackground = await request(
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        );

        if (LocationFine === 'granted' && LocationBackground === 'granted') {
          // setIsCamera(true);
        }
        if (
          (LocationFine === 'denied' || LocationFine === 'blocked') &&
          (LocationBackground === 'denied' || LocationBackground || 'blocked')
        ) {
          // setIsCamera(false);
        } else {
          // setIsCamera(false);
        }
      }
    } catch (error) {
      console.warn('Permission request error:', error);
    }
  };


  const requestCameraPermission = async () => {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const granted = await request(permission);
      if (granted === 'granted') {
      } else {
      }
    } catch (error) {
      console.warn('Camera permission request error:', error);
    }
  };

  const toggleSwitchforLocation = () => {
    setIsEnabled(previousState => !previousState);
    requestLocation();
  };
  const toggleSwitchForCamera = () => {
    setIsCamera(previousState => !previousState);
    if (!isCamera) {
      requestCameraPermission();
    }
  };

  const genderForMale = () => {
    setIsMale(previousState => !previousState);
    setIsFemale(false);
  };
  const genderForFemale = () => {
    setIsFemale(previousState => !previousState);
    setIsMale(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: '#57429C',
        }}
      />
      <StatusBar backgroundColor={'#57429C'} translucent={true} />
      <ImageBackground
        source={images.curv}
        resizeMode="cover"
        style={styles.curvimg}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={images.backbtn}
            resizeMode="contain"
            style={styles.backbtn}
          />
        </TouchableOpacity>
        <Image
          source={images.curvimg}
          resizeMode="contain"
          style={styles.curvSubimg}
        />
        <Text style={styles.headerText}>{t('getreadylook')}</Text>
        {/* <Text style={styles.titletext}>Inside</Text> */}
      </ImageBackground>
      <View style={styles.cardView}>
        <Text style={styles.cardHeaderText}>{t('followingInformation')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: scale(50),
          }}>
          <Text style={styles.subText}>{t('gender')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[
                styles.boxStyle,
                { backgroundColor: isMale ? '#57429D' : null },
              ]}
              onPress={() => genderForMale()}>
              <Text
                style={[
                  styles.boxTitle,
                  { color: isMale ? '#FFFFFF' : '#57429D' },
                ]}>
                {t('male')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.boxStyle,
                {
                  backgroundColor: isFemale ? '#57429D' : null,
                  marginLeft: scale(15),
                },
              ]}
              onPress={() => genderForFemale()}>
              <Text
                style={[
                  styles.boxTitle,
                  { color: isFemale ? '#FFFFFF' : '#57429D' },
                ]}>
                {t('female')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(34),
            marginHorizontal: scale(28),
          }}>
          <Text style={styles.subText}>{t('location')}</Text>
          <View
            style={[
              styles.switch,
              {
                backgroundColor: isEnabled
                  ? 'rgba(87, 66, 157, 0.15)'
                  : '#E9EAEB',
              },
            ]}>
            <Switch
              trackColor={{ false: '#E9EAEB', true: 'rgba(87, 66, 157, 0.15)' }}
              thumbColor={isEnabled ? '#57429D' : '#f4f3f4'}
              onValueChange={toggleSwitchforLocation}
              value={isEnabled}
              style={styles.toggle}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(34),
            marginHorizontal: scale(28),
          }}>
          <Text style={styles.subText}>{t('camera')}</Text>
          <View
            style={[
              styles.switch,
              {
                backgroundColor: isCamera
                  ? 'rgba(87, 66, 157, 0.15)'
                  : '#E9EAEB',
              },
            ]}>
            <Switch
              trackColor={{ false: '#E9EAEB', true: 'rgba(87, 66, 157, 0.15)' }}
              thumbColor={isCamera ? '#57429D' : '#f4f3f4'}
              ios_backgroundColor="#E9EAEB"
              onValueChange={toggleSwitchForCamera}
              value={isCamera}
              style={styles.toggle}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnBottomView}>
        <Button
          buttonText={t('Start now')}
          disabled={
            (isMale == true || isFemale == true) &&
              isEnabled === true &&
              isCamera === true
              ? false
              : true
          }
          marginTop={wp(3)}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'DISCOUNT_HOME' }],
            })
            // navigation.navigate('DISCOUNT_HOME')
          }
          opacity={
            (isMale == true || isFemale == true) &&
              isEnabled === true &&
              isCamera === true
              ? 1
              : 0.7
          }
        />
      </View>
    </View>
  );
};

export default OnBoardPermission;
