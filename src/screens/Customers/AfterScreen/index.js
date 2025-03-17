import {
  View,
  ScrollView,
  PermissionsAndroid,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import SmallText from '../../../components/SmallText/SmallText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MemoryBeforeAfterComponet from '../../../components/Client Components/MemoryBeforeAfterComponet';
import styles from './style';
import axios from 'axios';
import Config from '../../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rating} from 'react-native-rating-element';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import icons from '../../../assets/icons/icons';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import {useTranslation} from 'react-i18next';

const BeforeMemories = ({navigation, route}) => {
  const {t} = useTranslation();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [bookingData, setBookingData] = useState({});

  let SalonName = route?.params?.bookindId?.salon?.businessName;
  let Address =
    route?.params?.bookindId?.salon?.address +
    ', ' +
    route?.params?.bookindId?.salon?.city;
  const [filePath, setFilePath] = useState();
  useEffect(() => {
    getBookingInfo();
    _retrieveData();
  }, []);

  const getBookingInfo = async () => {
    let Data = await AsyncStorage.getItem('BeforePicture');
    setBookingData(JSON.parse(Data));
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('tokenValue');
      Config.token = JSON.parse(value);
    } catch (error) {}
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert(t('cancelledCameraPicker'));
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert(t('CameraNotAvailable'));
          return;
        } else if (response.errorCode == 'permission') {
          alert(t('permissionNotSatisfied'));
          return;
        } else if (response.errorCode == 'others') {
          alert(t('cameraIssue'), response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t('cameraPermission'),
            message: t('needsCameraPermission'),
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: t('storageWritePermission'),
            message: t('needsWritePermission'),
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert(t('writePermissionErr'), err);
      }
      return false;
    } else return true;
  };

  const valid = () => {
    if (filePath) {
      setLoading(true);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('rating', rating);
      {
        filePath
          ? data.append('after-img', {
              uri: filePath.assets[0].uri,
              type: filePath.assets[0].type,
              name: filePath.assets[0].fileName,
            })
          : null;
      }

      var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${Config.baseUrl}afterMoment/${bookingData._id}`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            navigation.replace('ADD_REVIEW_SCREEN', {bookingData: bookingData});
          }
        })
        .catch(function (error) {});
    }
  };

  return (
    <View style={styles.container}>
      <Title
        paddingHorizontal={wp('4%')}
        title={t('memories')}
        alignSelf="flex-start"
        marginTop={hp(1)}
        marginBottom={hp(5)}
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <MemoryBeforeAfterComponet
          title={SalonName}
          text={Address}
          img1={filePath ? filePath.assets[0].uri : null}
          img={bookingData ? bookingData.beforeImageURL : null}
        />
        {rating === 0 ? (
          <View style={{paddingHorizontal: wp(4), marginTop: wp(4)}}>
            <SmallTitle
              alignSelf={'auto'}
              title={'Rate & review'}
              fontSize={wp(6)}
            />
            <SmallText alignSelf={'auto'} text={'Rate & review'} />
          </View>
        ) : null}

        <View style={{flexDirection: 'row', marginHorizontal: wp(4)}}>
          <View style={styles.reviewContainer}>
            <View style={styles.iconBg}>
              <Image style={styles.icon} source={images.manIcon} />
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Rating
              rated={rating}
              ratingBackgroundColor="##d4d4d4"
              totalCount={5}
              size={wp(8)}
              marginBetweenRatingIcon={wp(3)}
              onIconTap={position => setRating(position)}
              direction="row"
              type="custom"
              selectedIconImage={icons.star}
              emptyIconImage={icons.emptyStar}
            />
          </View>
        </View>
        {rating != 0 ? (
          <View style={{paddingHorizontal: wp(6), marginTop: wp(4)}}>
            <SmallText alignSelf={'auto'} text={t('appriciateRatingString')} />
          </View>
        ) : null}

        <View style={styles.textArea}>
          <TextInput
            backgroundColor={colors.secondary}
            style={styles.input}
            numberOfLines={3}
            value={review}
            onChangeText={setReview}
            placeholder={t('DescribeRating')}
            selectionColor={colors.black}
            placeholderTextColor={colors.grey}
            multiline
          />
        </View>

        {filePath ? (
          loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.FAB}>
              <Button
                buttonText={t('save')}
                onPress={() => {
                  valid();
                }}
              />
            </View>
          )
        ) : (
          <View style={styles.FAB}>
            <Button
              buttonText={t('addPhotoAfter')}
              onPress={() => {
                captureImage('photo');
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BeforeMemories;
