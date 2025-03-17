//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import images from '../../../../../BusinessUtills/assets/images/images';
import SemiMediumTitle from '../../../../../BusinessUtills/components/Semi Medium Title';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePIckerModel from '../../../../Bussiness/BottomScreen/Component/ImagePIckerModel';

const ProfileImagesScreen = ({callBackProfileImagesData, currentPage}) => {
  const {t} = useTranslation();
  const [profileImg, setProfileImg] = useState('');
  const [logo, setLogo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogo, setIsLogo] = useState(true);
  const isFocused = useIsFocused();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
  }, []);

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

  const chooseFile = async type => {
    try {
      let options = {
        mediaType: type,
        cropping: true,
        cropperCircleOverlay: true,
      };
      const image = await ImageCropPicker.openPicker(options);
      if (image && image.path) {
        {
          isLogo ? setLogo(image) : setProfileImg(image);
        }
      }
    } catch (error) {}
  };

  const captureImage = async type => {
    try {
      let options = {
        mediaType: type,
        cropping: true,
        cropperCircleOverlay: true,
      };

      const image = await ImageCropPicker.openCamera(options);
      if (image && image.path) {
        {
          isLogo ? setLogo(image) : setProfileImg(image);
        }
      }
    } catch (error) {}
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
    <>
      <View style={styles.body}>
        <View style={styles.profileImgBg}>
          {profileImg ? (
            <Image source={{uri: profileImg?.path}} style={styles.profileImg} />
          ) : (
            <Image
              source={images.Exclude}
              style={{
                height: scale(35),
                width: scale(35),
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.textIconBg}
          activeOpacity={0.6}
          onPress={() => {
            toggleModal(), setIsLogo(false);
          }}>
          <Image
            source={images.cloud_Upload}
            style={{
              marginRight: 12,
              height: scale(24),
              width: scale(24),
              alignSelf: 'center',
            }}
          />
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
              source={{uri: logo?.path}}
              resizeMode="stretch"
            />
          ) : (
            <Image
              source={images.Exclude}
              style={{
                height: scale(25),
                width: scale(25),
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
        <TouchableOpacity
          style={{...styles.textIconBg, marginBottom: hp(2.2)}}
          activeOpacity={0.6}
          onPress={() => {
            toggleModal(), setIsLogo(true);
          }}>
          <Image
            source={images.cloud_Upload}
            style={{
              marginRight: 12,
              height: scale(24),
              width: scale(24),
              alignSelf: 'center',
            }}
          />
          <SemiMediumTitle
            title={t('uploadProfileLogo')}
            color={colors.btnColor}
            marginTop={hp(0.5)}
          />
        </TouchableOpacity>
      </View>
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
    </>
  );
};

export default ProfileImagesScreen;
