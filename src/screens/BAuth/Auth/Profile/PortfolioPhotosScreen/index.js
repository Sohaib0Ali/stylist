//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import images from '../../../../../BusinessUtills/assets/images/images';
import SemiMediumTitle from '../../../../../BusinessUtills/components/Semi Medium Title';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Input from '../../../../../BusinessUtills/components/Input/Input';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import ImagePIckerModel from '../../../../Bussiness/BottomScreen/Component/ImagePIckerModel';

const ProfilePhotosScreen = ({currentPage, callBackProfilePhotosData}) => {
  const {t} = useTranslation();
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [album, setAlbum] = useState('');
  const [imageCounter, setImageCounter] = useState(0);
  const isFocused = useIsFocused();
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
    };
    launchImageLibrary(options, response => {
      const newProfilePhotos = [...profilePhotos, response];
      setProfilePhotos(newProfilePhotos);
      setImageCounter(newProfilePhotos.length);
    });
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
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
        } else {
          profilePhotos.push(response);
        }

        setImageCounter(imageCounter + 1);
      });
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isFocused) {
      callBackProfilePhotosData({profilePhotos, album: album});
    }
  }, [isFocused, profilePhotos, album, imageCounter, currentPage]);
  return (
    <>
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
              source={{uri: profilePhotos[0]?.assets?.uri}}
              style={styles.profileImg}
            />
          ) : (
            <Image
              source={images.Exclude}
              style={{height: scale(35), width: scale(35), resizeMode: 'cover'}}
            />
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
              <Image
                source={images.Exclude}
                style={{
                  height: scale(30),
                  width: scale(30),
                  resizeMode: 'cover',
                }}
              />
            )}
          </View>
          <View style={styles.profileImgBg1}>
            {imageCounter > 2 ? (
              <Image
                source={{uri: profilePhotos[2]?.assets[0]?.uri}}
                style={styles.profileImg1}
              />
            ) : (
              <Image
                source={images.Exclude}
                style={{
                  height: scale(30),
                  width: scale(30),
                  resizeMode: 'cover',
                }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          disabled={imageCounter > 2 ? true : false}
          style={styles.textIconBg}
          activeOpacity={0.6}
          onPress={() => toggleModal()}>
          <SemiMediumTitle
            title={t('uploadPortfolioImage')}
            color={colors.btnColor}
            marginTop={hp(0.5)}
          />
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <ImagePIckerModel
          OnPressChooseImg={() => {
            toggleModal();
            chooseFile('photo'), console.log('===Camera');
          }}
          OnPressTakePhoto={() => {
            captureImage('photo');
            toggleModal(), console.log('===>Choose');
          }}
          OnpressCancle={() => toggleModal()}
        />
      )}
    </>
  );
};

export default ProfilePhotosScreen;
