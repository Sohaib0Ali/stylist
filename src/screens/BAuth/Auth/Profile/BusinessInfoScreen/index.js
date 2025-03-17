//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import SmallTitle from '../../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import images from '../../../../../BusinessUtills/assets/images/images';
import {scale} from 'react-native-size-matters';

const BusinessInfoScreen = ({callBackBusinessInfoData, currentPage}) => {
  const {t} = useTranslation();
  const [instagram, setInstagram] = useState('');
  const [fb, setFB] = useState('');
  const [youtube, setYoutube] = useState('');
  const isFocused = useIsFocused();
  const [instagramValidError, setInstagramValidError] = useState('');

  const handleValidInstagram = val => {
    if (val.length !== 0) {
      setInstagramValidError('Done');
    }
  };

  const [fbValidError, setFbValidError] = useState('');
  const handleValidFb = val => {
    if (val.length !== 0) {
      setFbValidError('Done');
    }
  };
  const [youtubeValidError, setYoutubeValidError] = useState('');
  const handleValidYoutube = val => {
    if (val.length !== 0) {
      setYoutubeValidError('Done');
    }
  };

  useEffect(() => {
    if (isFocused)
      callBackBusinessInfoData({
        socialLinks: [
          {
            link: fb,
            plateform: 'Facebook',
          },
          {
            link: instagram,
            plateform: 'Instagram',
          },
          {
            link: youtube,
            plateform: 'Youtube',
          },
          {
            fbValidError: fbValidError,
            youtubeValidError: youtubeValidError,
            instagramValidError: instagramValidError,
          },
        ],
      });
  }, [
    isFocused,
    fb,
    instagram,
    youtube,
    fbValidError,
    instagramValidError,
    youtubeValidError,
    currentPage,
  ]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={{...styles.title, alignSelf: 'flex-start'}}>
            {t('https')}
          </Text>

          <TextInput
            style={styles.input}
            value={instagram}
            onChangeText={instagram => {
              setInstagram(instagram), handleValidInstagram(instagram);
            }}
            placeholder={t('instagramPlaceHolder')}
            selectionColor={colors.black}
            placeholderTextColor={colors.grey}
          />
        </View>
        <Image
          source={images.instagram}
          style={{height: scale(24), width: scale(24), alignSelf: 'center'}}
        />
        <View />
        <View />
      </View>
      {instagramValidError !== 'Done' && instagramValidError !== '' ? (
        <SmallTitle
          title={instagramValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={{...styles.title, alignSelf: 'flex-start'}}>
            {t('https')}
          </Text>

          <TextInput
            style={styles.input}
            value={fb}
            onChangeText={fb => {
              setFB(fb), handleValidFb(fb);
            }}
            placeholder={t('facebooklaceHolder')}
            selectionColor={colors.black}
            placeholderTextColor={colors.grey}
          />
        </View>
        <Image
          source={images.facebook}
          style={{height: scale(24), width: scale(24), alignSelf: 'center'}}
        />
        <View />
        <View />
      </View>
      {fbValidError !== 'Done' && fbValidError !== '' ? (
        <SmallTitle
          title={fbValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={{...styles.title, alignSelf: 'flex-start'}}>
            {t('https')}
          </Text>
          <TextInput
            style={styles.input}
            value={youtube}
            onChangeText={youtube => {
              setYoutube(youtube), handleValidYoutube(youtube);
            }}
            placeholder={t('youtubePlaceHolder')}
            selectionColor={colors.black}
            placeholderTextColor={colors.grey}
          />
        </View>
        <Image
          source={images.youtube}
          style={{height: scale(24), width: scale(24), alignSelf: 'center'}}
        />
        <View />
        <View />
      </View>
      {youtubeValidError !== 'Done' && youtubeValidError !== '' ? (
        <SmallTitle
          title={youtubeValidError}
          alignSelf="flex-start"
          color={colors.green}
          marginBottom={wp(4)}
          marginLeft={wp(5)}
          width={wp(80)}
        />
      ) : null}
    </View>
  );
};

export default BusinessInfoScreen;
