//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

//================================ Local Imported Files ======================================//
import styles from './styles';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Icon from '../../../../BusinessUtills/assets/icons/icon.svg';
import UploadIcon from '../../../../BusinessUtills/assets/icons/upload.svg';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import Title from '../../../../BusinessUtills/components/Title/Title';
import Header from '../../../../BusinessUtills/components/Header/Header';
import Input from '../../../../BusinessUtills/components/Input/Input';
import ServiceComponent from '../../../../BusinessUtills/components/ServiceComponent/ServiceComponent';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import {useIsFocused} from '@react-navigation/core';
import BConfig from '../../../../BusinessUtills/config/config';
import {showDanger, showWarning} from '../../../../../Utils/FlashMessage';
import {useSelector} from 'react-redux';
import {SALON_OFFER} from '../../../../../redux/store/actions/salons_Actions';

const AddNewOffer = ({navigation}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [profileImg, setProfileImg] = useState();
  const [logo, setLogo] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogo, setIsLogo] = useState(true);
  const [click, setClick] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [description, setDescription] = useState(null);
  const [offerName, setOfferName] = useState('15% off');
  const [days, setDays] = useState('Every monday');
  const [data, setData] = useState([]);
  const [serviceID, setServiceID] = useState();
  const [servName, setServeName] = useState();
  const [serviceType, setServiceType] = useState([]);
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllServices();
    }
  }, [isFocused]);
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
        showWarning('Write permission err', err);
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
        showWarning(t('userCancelledCameraPicker'));
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        showWarning(t('cameraNotAvailable'));
        return;
      } else if (response.errorCode == 'permission') {
        showWarning(t('permissionNotSatisfied'));
        return;
      } else if (response.errorCode == 'others') {
        showDanger(response.errorMessage);
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
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
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
  const getAllServices = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}getAllService`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setData(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedValue(response.data.data[0]._id);
            setServeName(response.data.data[0].servname);
            getTypeOfServices(response.data.data[0]._id);
          } else {
            showWarning(t('noServiceFound'));
          }
        }
      })
      .catch(function (error) {});
  };
  const getTypeOfServices = id => {
    setServiceID(id);
    var data = JSON.stringify({
      serviceId: id,
      salonId: MainBranch?.salon?._id,
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getServiceTypeByService`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setServiceType(response.data.data);
        }
      })
      .catch(function (error) {});
  };

  const NewOffer = () => {
    if (
      profileImg === null ||
      offerName === null ||
      days === null ||
      serviceID === null ||
      servName === null ||
      selectedId === null ||
      description === null
    ) {
      showWarning(t('mandatory'));
    } else {
      var FormData = require('form-data');
      var data = new FormData();
      data.append('profileImage', {
        uri: profileImg?.assets[0]?.uri,
        type: profileImg?.assets[0]?.type,
        name: profileImg?.assets[0]?.fileName,
      });
      data.append('offerDescription', offerName);
      data.append('days', days);
      data.append('salonId', MainBranch?.salon?._id);
      data.append('serviceId', serviceID);
      data.append('serviceName', servName);
      data.append('serviceTypeId', selectedId);
      data.append('description', description);

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}/business/createOffer`,
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
          if (res.success) {
            dispatch({type: SALON_OFFER, payload: res?.data});
            navigation.goBack();
          }
        })
        .catch(function (error) {});
    }
  };
  return (
    <View style={styles.body}>
      <Header
        direction={'RTL'}
        headerBack={true}
        onBackPress={() => navigation.goBack()}
        randomText={t('save')}
        onPress={NewOffer}
        headerColor={'white'}
      />
      <ScrollView style={styles.innerBody} showsVerticalScrollIndicator={false}>
        <Title title={'Add new offer'} alignSelf={'baseline'} />

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
        <Input
          title={t('offerName')}
          placeholder={t('offerName')}
          value={offerName}
          onChangeText={setOfferName}
        />
        <Input
          title={t('days')}
          placeholder={t('days')}
          value={days}
          onChangeText={setDays}
        />
        <SemiMediumTitle title={t('chooseSerive')} fontSize={wp(5)} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: wp(5),
            justifyContent: 'space-between',
          }}>
          {data.map((item, index) => {
            const backgroundColor =
              item._id === selectedValue ? colors.yellow : colors.white;
            return (
              <ServiceComponent
                key={item._id}
                marginRight={wp(1)}
                marginBottom={hp(1.6)}
                title={item.servname}
                onPress={() => {
                  setClick(index),
                    setSelectedValue(item._id),
                    getTypeOfServices(item._id, item.servname);
                }}
                bgColor={
                  item.isSelected == 'true' ? colors.yellow : colors.white
                }
                backgroundColor={{backgroundColor}}
                icon={item.icon}
              />
            );
          })}
        </View>
        <SemiMediumTitle title={t('typeOfService')} fontSize={wp(5)} />
        <View>
          {serviceType.length > 0 ? (
            serviceType.map(item => {
              const backgroundColor =
                item._id === selectedId ? colors.yellow : colors.white;
              return (
                <ServiceDetailComponent
                  key={item._id}
                  textColor={'black'}
                  cat={item.name}
                  time={item.duration}
                  img={item.icon}
                  service={true}
                  backgroundColor={{backgroundColor}}
                  onPress={() => setSelectedId(item._id)}
                />
              );
            })
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'black'}}>{t('noServiceFound')}</Text>
            </View>
          )}
        </View>

        <TextInput
          style={styles.input}
          textAlignVertical="top"
          numberOfLines={8}
          multiline
          value={description}
          onChangeText={description => setDescription(description)}
          placeholder={t('fillDescription')}
          selectionColor={colors.black}
          placeholderTextColor={colors.subHeading}
        />
      </ScrollView>
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

export default AddNewOffer;
