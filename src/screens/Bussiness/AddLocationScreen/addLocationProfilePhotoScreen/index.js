//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Icon from '../../../../BusinessUtills/assets/icons/icon.svg';
import UploadIcon from '../../../../BusinessUtills/assets/icons/upload.svg';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import MediumTitle from '../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AddLocationProfilePhotoScreen = ({
  callBackProfileImagesData,
  currentPage,
}) => {
  const [profileImg, setProfileImg] = useState('');
  const [logo, setLogo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogo, setIsLogo] = useState(true);
  const isFocused = useIsFocused();
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
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert(t('use'));
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
        isLogo ? setLogo(response) : setProfileImg(response);
      }
    });
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
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
          alert(t('cameraIssue'), response.errorMessage);
          return;
        }
        {
          isLogo ? setLogo(response) : setProfileImg(response);
        }
      });
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isFocused) {
      callBackProfileImagesData({
        profile: profileImg,
        logo: logo,
      });
    }
  }, [isFocused, profileImg, logo, currentPage]);
  return (
    <View style={styles.body}>
      <View style={styles.profileImgBg}>
        {profileImg ? (
          <Image
            source={{uri: profileImg?.assets[0]?.uri}}
            style={styles.profileImg}
          />
        ) : (
          <Icon width={wp(10.2)} height={wp(10.2)} />
        )}
      </View>
      <TouchableOpacity
        style={styles.textIconBg}
        activeOpacity={0.6}
        onPress={() => {
          toggleModal(), setIsLogo(false);
        }}>
        <UploadIcon width={24} height={16} style={{marginRight: wp(3.7)}} />
        <SemiMediumTitle
          title={t('uploadProfileImage')}
          color={colors.btnColor}
          marginTop={hp(0.5)}
        />
      </TouchableOpacity>
      <View style={styles.logoBg}>
        {logo ? (
          <Image
            style={styles.logo}
            source={{uri: logo?.assets[0]?.uri}}
            resizeMode="contain"
          />
        ) : (
          <Icon width={wp(10.2)} height={wp(10.2)} />
        )}
      </View>
      <TouchableOpacity
        style={{...styles.textIconBg, marginBottom: hp(2.2)}}
        activeOpacity={0.6}
        onPress={() => {
          toggleModal(), setIsLogo(true);
        }}>
        <UploadIcon width={24} height={16} style={{marginRight: wp(3.7)}} />
        <SemiMediumTitle
          title={t('uploadProfileLogo')}
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
    </View>
  );
};

export default AddLocationProfilePhotoScreen;
