//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Text,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
//================================ Local Imported Files ======================================//
import styles from './style';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import BConfig from '../../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {showDanger, showWarning} from '../../../../../../Utils/FlashMessage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ImagePIckerModel from '../../../BottomScreen/Component/ImagePIckerModel';
import PortfolioScreen from '..';

const StylistPortfolio = ({stylistId, selectedIndex}) => {
  const StyList = useSelector(state => state?.SalonDetails?.SalonStylist);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
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
        showWarning('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
    };
    launchImageLibrary(options, response => {
      setProfilePhotos(prevPhotos => [...prevPhotos, ...response.assets]);
      setImageCounter(prevCounter => prevCounter + response.assets.length);
    });
  };

  const captureImage = async type => {
    toggleModal();

    let options = {
      cropping: true,
      width: 300,
      height: 400,
      includeBase64: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          showWarning(t('userCancelledCameraPicker'));
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          showWarning(t('cameraNotAvailable'));
          return;
        } else if (response.errorCode == 'permission') {
          showWarning(t('permissionNotSatisfied'));
          return;
        } else if (response.errorCode == 'others') {
          showDanger(t('cameraIssue'), response.errorMessage);
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

  const valid = () => {
    if (profilePhotos?.length < 3) {
      showWarning(t('mandatory'));
    } else {
      setIsLoading(false);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('stylistId', stylistId);
      data.append('portfolio-img', {
        uri: profilePhotos[0]?.uri,
        type: profilePhotos[0]?.type,
        name: 'file1',
      });
      data.append('portfolio-img', {
        uri: profilePhotos[1]?.uri,
        type: profilePhotos[1]?.type,
        name: 'file2',
      });
      data.append('portfolio-img', {
        uri: profilePhotos[2]?.uri,
        type: profilePhotos[2]?.type,
        name: 'file3',
      });
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}business/addstylistPortfolio`,
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
          if (res?.data?.success) {
            if (selectedIndex) StyList[selectedIndex] = res?.data;
          }
        })
        .catch(function (error) {
          setIsLoading(false);
        });
    }
    setAddPhoto(true);
  };
  return (
    <>
      <ScrollView style={{backgroundColor: colors.white}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{fontSize: 22, fontWeight: '600', marginLeft: scale(20)}}>
            Portfolio
          </Text>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Text
              style={{fontSize: 17, marginRight: scale(20), color: '#57429D'}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.profileImgBg}>
            {
              profilePhotos?.length === 0 && <></>
              // <Icon width={wp(10.2)} height={wp(10.2)} />
            }

            {profilePhotos?.length >= 1 ? (
              <Image
                source={{uri: profilePhotos[0]?.uri}}
                // source={{uri: profilePhotos[0]?.path}}
                style={styles.profileImg}
              />
            ) : (
              <></>
              // <Icon width={wp(10.2)} height={wp(10.2)} />
            )}
          </View>

          <View style={styles.imagesBg}>
            <View style={styles.profileImgBg1}>
              {profilePhotos?.length >= 2 ? (
                <Image
                  source={{uri: profilePhotos[1]?.uri}}
                  // source={{uri: profilePhotos[1]?.path}}
                  style={styles.profileImg1}
                />
              ) : (
                <></>
                // <Icon width={wp(10.2)} height={wp(10.2)} />
              )}
            </View>
            <View style={styles.profileImgBg1}>
              {profilePhotos?.length >= 3 ? (
                <Image
                  source={{uri: profilePhotos[2]?.uri}}
                  // source={{uri: profilePhotos[2]?.path}}
                  style={styles.profileImg1}
                />
              ) : (
                <></>
                // <Icon width={wp(10.2)} height={wp(10.2)} />
              )}
            </View>
          </View>
          <TouchableOpacity
            style={[styles.buttonBG, {marginBottom: verticalScale(150)}]}
            onPress={() => {
              valid();
            }}>
            <Icons name="layers" size={20} color="#57429D" />
            <Text style={styles.buttonText2}>{t('Add photo')}</Text>
          </TouchableOpacity>
          {addPhoto === true ? (
            <PortfolioScreen updatedData={profilePhotos} />
          ) : null}
          <CustomeLoader visible={loading} />
        </View>
      </ScrollView>
      {isModalVisible && (
        <ImagePIckerModel
          marginTop={verticalScale(-100)}
          OnPressChooseImg={() => {
            chooseFile('photo');
            toggleModal();
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

export default StylistPortfolio;
