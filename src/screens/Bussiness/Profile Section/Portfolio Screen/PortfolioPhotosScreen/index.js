//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import Icon from '../../../../../BusinessUtills/assets/icons/icon.svg';
import UploadIcon from '../../../../../BusinessUtills/assets/icons/upload.svg';
import SemiMediumTitle from '../../../../../BusinessUtills/components/Semi Medium Title';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import MediumTitle from '../../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import Input from '../../../../../BusinessUtills/components/Input/Input';
import Header from '../../../../../BusinessUtills/components/Header/Header';
import BConfig from '../../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ProfilePortfolio = ({navigation}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [album, setAlbum] = useState(null);
  const [imageCounter, setImageCounter] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
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
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {

      if (response.didCancel) {
        alert(t('userCancelledCameraPicker'));
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert(t('cameraNotAvailable'));
        return;
      } else if (response.errorCode == 'permission') {
        alert(t('permissionNotSatisfied'));
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      {
        profilePhotos.push(response);
      }
      setImageCounter(imageCounter + 1);
    });
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
          alert(t('userCancelledCameraPicker'));
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert(t('cameraNotAvailable'));
          return;
        } else if (response.errorCode == 'permission') {
          alert(t('permissionNotSatisfied'));
          return;
        } else if (response.errorCode == 'others') {
          alert('this sis camera issue: ', response.errorMessage);
          return;
        }
        {
          profilePhotos.push(response);
        }
        setImageCounter(imageCounter + 1);
      });
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const valid = () => {
    if (album === null || profilePhotos.length < 3) {
      alert(t('mandatory'));
    } else {
      setIsLoading(true);

      var FormData = require('form-data');
      var data = new FormData();
      data.append('portfolio-images', {
        uri: profilePhotos[0]?.assets[0]?.uri,
        type: profilePhotos[0]?.assets[0]?.type,
        name: profilePhotos[0]?.assets[0]?.fileName,
      });
      data.append('portfolio-images', {
        uri: profilePhotos[1]?.assets[0]?.uri,
        type: profilePhotos[1]?.assets[0]?.type,
        name: profilePhotos[1]?.assets[0]?.fileName,
      });
      data.append('portfolio-images', {
        uri: profilePhotos[2]?.assets[0]?.uri,
        type: profilePhotos[2]?.assets[0]?.type,
        name: profilePhotos[2]?.assets[0]?.fileName,
      });
      data.append('albumName', album);

      var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}business/uploadPortfolio/${MainBranch?.salon?._id}`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          setIsLoading(false);
          if (res.success) {
            alert('Successfully Added');
            MainBranch?.salon = res?.data?.salonData
            navigation.goBack();
          }
        })
        .catch(function (error) {
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={{backgroundColor: colors.white, height: hp('100%')}}>
      <Header
        direction={'RTL'}
        randomText={t('save')}
        headerColor={colors.white}
        headerBack={true}
        onBackPress={() => navigation.goBack()}
        onPress={() => valid()}
        small
      />
      <View style={styles.body}>
        <Input
          value={album}
          onChangeText={album => setAlbum(album)}
          placeholder={t('albumPlaceHolder')}
          title={t('AlbumName')}
        />
        <View style={styles.profileImgBg}>
          {imageCounter > 0 ? (
            <Image
              source={{uri: profilePhotos[0]?.assets[0]?.uri}}
              style={styles.profileImg}
            />
          ) : (
            <Icon width={wp(10.2)} height={wp(10.2)} />
          )}
        </View>

        <View style={styles.imagesBg}>
          <View style={styles.profileImgBg1}>
            {imageCounter > 1 ? (
              <Image
                source={{uri: profilePhotos[1]?.assets[0]?.uri}}
                style={styles.profileImg1}
              />
            ) : (
              <Icon width={wp(10.2)} height={wp(10.2)} />
            )}
          </View>
          <View style={styles.profileImgBg1}>
            {imageCounter > 2 ? (
              <Image
                source={{uri: profilePhotos[2]?.assets[0]?.uri}}
                style={styles.profileImg1}
              />
            ) : (
              <Icon width={wp(10.2)} height={wp(10.2)} />
            )}
          </View>
        </View>
        <TouchableOpacity
          disabled={imageCounter > 2 ? true : false}
          style={styles.textIconBg}
          activeOpacity={0.6}
          onPress={() => toggleModal()}>
          <UploadIcon width={24} height={16} style={{marginRight: wp(3.7)}} />
          <SemiMediumTitle
            title={t('uploadPortfolioImage')}
            color={colors.btnColor}
            marginTop={hp(0.5)}
          />
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <MediumTitle title={t('choosePhoto')} marginTop={wp(5)} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                captureImage('photo'), toggleModal();
              }}>
              <SmallTitle
                title={t('takePhoto')}
                alignSelf="flex-start"
                marginTop={wp(5)}
                color={colors.subHeading}
                width={wp(80)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                chooseFile('photo'), toggleModal();
              }}>
              <SmallTitle
                title={t('chooseFromLibrary')}
                alignSelf="flex-start"
                marginTop={wp(4)}
                color={colors.subHeading}
                width={wp(80)}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => toggleModal()}>
              <SmallTitle
                title={t('cancel')}
                alignSelf="flex-start"
                marginTop={wp(4)}
                color={colors.subHeading}
                marginBottom={wp(4)}
                width={wp(80)}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <CustomeLoader visible={loading} />
      </View>
    </View>
  );
};

export default ProfilePortfolio;
