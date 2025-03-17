//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Text,
} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ImagePIckerModel from '../../BottomScreen/Component/ImagePIckerModel';

const EditProfilePhotoScreen = ({data, callBackProfileImagesData}) => {
  const [profileImg, setProfileImg] = useState(data?.profileImage);
  const [logo, setLogo] = useState(data?.profileLogo);
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
      const res = response?.assets[0].uri;
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
        isLogo ? setLogo(response) : setProfileImg(response);
      }
    });
  };
  useEffect(() => {
    if (isFocused) {
      callBackProfileImagesData({
        profile: profileImg,
        logo: logo,
      });
    }
  }, [isFocused, profileImg, logo]);

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
        const res = response?.assets[0].uri;
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

  return (
    <View style={styles.body}>
      <View style={styles.profileImgBg}>
        {profileImg ? (
          <Image
            source={
              profileImg?.assets
                ? {uri: profileImg?.assets[0]?.uri}
                : {uri: profileImg}
            }
            style={styles.profileImg}
          />
        ) : (
          // <Icon width={wp(10.2)} height={wp(10.2)} />
          <Text>hello</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.textIconBg}
        activeOpacity={0.6}
        onPress={() => {
          toggleModal(), setIsLogo(false);
        }}>
        {/* <UploadIcon width={24} height={16} style={{ marginRight: wp(3.7) }} /> */}
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
            source={logo?.assets ? {uri: logo?.assets[0]?.uri} : {uri: logo}}
            resizeMode="stretch"
          />
        ) : (
          // <Icon width={wp(10.2)} height={wp(10.2)} />
          <Text>hello</Text>
        )}
      </View>
      <TouchableOpacity
        style={{...styles.textIconBg, marginBottom: hp(2.2)}}
        activeOpacity={0.6}
        onPress={() => {
          toggleModal(), setIsLogo(true);
        }}>
        {/* <UploadIcon width={24} height={16} style={{ marginRight: wp(3.7) }} /> */}
        <SemiMediumTitle
          title={t('uploadProfileLogo')}
          color={colors.btnColor}
          marginTop={hp(0.5)}
        />
      </TouchableOpacity>
      {isModalVisible && (
        <ImagePIckerModel
          OnPressChooseImg={() => {
            toggleModal();
            chooseFile('photo');
          }}
          OnPressTakePhoto={() => {
            captureImage('photo');
            toggleModal();
          }}
          OnpressCancle={() => toggleModal()}
        />
      )}
    </View>
  );
};

export default EditProfilePhotoScreen;
