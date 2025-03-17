import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import {t} from 'i18next';
import {showSuccess, showWarning} from '../../../../../Utils/FlashMessage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Image} from 'react-native';
import LInput from '../Component/LInput';
import {scale, verticalScale} from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/AntDesign';
import Button from '../../../../BusinessUtills/components/Button/Button';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import DropdownMenu from '../Component/DropdownMenu';
import ServiceList from '../Component/ServiceList';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import images from '../../../../BusinessUtills/assets/images/images';
import ImagePIckerModel from '../Component/ImagePIckerModel';
import {useDispatch, useSelector} from 'react-redux';
import {SALON_OFFER} from '../../../../../redux/store/actions/salons_Actions';
import Translator from 'react-native-translator';

const AddOffer = ({OnAddClick}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [profileImg, setProfileImg] = useState();
  const [isLogo, setIsLogo] = useState(true);
  const [offerName, setOfferName] = useState('');
  const [styleServices, setStyleServices] = useState('');
  const [tretmentType, setTretmentType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [logo, setLogo] = useState();
  const [gender, setIsGender] = useState('');
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [arabicLaguage, setArabicLaguage] = useState('');
  const [franchLaguage, setFranchLaguage] = useState('');

  //Services Details

  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [servName, setServeName] = useState();
  const [serviceType, setServiceType] = useState([]);
  const [serviceID, setServiceID] = useState();
  const [selectedId, setSelectedId] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSelect = useCallback(
    value => {
      setIsGender(value);
    },
    [setIsGender],
  );

  useEffect(() => {
    getAllServices();
  }, [isFocused]);
  const getAllServices = () => {
    axios
      .get(`${BConfig.baseUrl}getAllService`, {
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const data = response.data;
        if (data.success) {
          setData(data.data);
          if (data.data.length > 0) {
            setSelectedValue(data.data[0]._id);
            setServeName(data.data[0].servname);
            getTypeOfServices(data.data[0]._id);
          } else {
            showWarning(t('noServiceFound'));
          }
        }
      })
      .catch(error => {});
  };
  const getTypeOfServices = id => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const NewOffer = async () => {
    if (
      profileImg === null ||
      offerName === null ||
      serviceID === null ||
      servName === null ||
      selectedId === null
    ) {
      showWarning(t('mandatory'));
    } else {
      setLoading(true);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('profileImage', {
        uri: profileImg?.assets[0]?.uri,
        type: profileImg?.assets[0]?.type,
        name: profileImg?.assets[0]?.fileName,
      });
      data.append('offerDescription', offerName);
      data.append('days', 'EveryDay');
      data.append('salonId', MainBranch?.salon?._id);
      data.append('serviceId', serviceID);
      data.append('serviceName', servName);
      data.append('serviceTypeId', selectedId);
      data.append('description', 'Validate offer!');
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
      try {
        const response = await axios(config);
        let res = response.data;
        if (res.success) {
          setLoading(false);
          showSuccess('Offer created successfully');
          dispatch({type: SALON_OFFER, payload: res?.data});
          navigation.navigate('DashboardScreen', {
            screenType: 'Screen_A',
          });
          // OnAddClick('Create Offer');
        }
      } catch (error) {
        setLoading(false);
      }
    }
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
  return (
    <View style={styles.maiContainer}>
      <View>
        <ScrollView
          style={styles.innerBody}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.subTextHeading, {marginTop: hp(2)}]}>
            Upload offer banner
          </Text>
          <View style={styles.profileImgBg}>
            {profileImg === undefined ? (
              <Image
                style={{
                  width: wp(10.2),
                  height: wp(10.2),
                  resizeMode: 'contain',
                }}
                source={images.Exclude}
              />
            ) : (
              <Image
                source={{uri: profileImg?.assets[0]?.uri}}
                style={styles.profileImg}
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
              style={{
                width: 24,
                height: 16,
                opacity: 0.6,
                resizeMode: 'cover',
                marginEnd: scale(5),
              }}
              source={images.cloud_Upload}
            />
            <SemiMediumTitle
              title={t('uploadProfileImage')}
              color={colors.btnColor}
              marginTop={hp(0.5)}
            />
          </TouchableOpacity>

          <LInput
            title={t('Offer name')}
            onChangeText={setOfferName}
            placeholder={'Offer name'}
            value={offerName}
            textConinerstyle={{marginTop: hp(2)}}
          />
          <View style={styles.dayselectView}>
            <Text style={{marginLeft: scale(15)}}>Days</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: scale(15), color: '#5E5E5F'}}>
                Every Monday
              </Text>
              <Icons name="right" size={11} style={{marginRight: scale(25)}} />
            </View>
          </View>
          <Text style={[styles.subTextHeading, {marginTop: hp(1)}]}>
            Offer applied on
          </Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => onSelect('Both')}>
              {gender === 'Both' ? (
                <View style={styles.radioSelected} />
              ) : (
                <View style={styles.radioNotselect} />
              )}
              <Text style={styles.radioText}>Both</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, {marginLeft: scale(15)}]}
              onPress={() => onSelect('Male')}>
              {gender === 'Male' ? (
                <View style={styles.radioSelected} />
              ) : (
                <View style={styles.radioNotselect} />
              )}
              <Text style={styles.radioText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, {marginLeft: scale(15)}]}
              onPress={() => onSelect('Female')}>
              {gender === 'Female' ? (
                <View style={styles.radioSelected} />
              ) : (
                <View style={styles.radioNotselect} />
              )}
              <Text style={styles.radioText}>Female</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.subTextHeading, {marginTop: hp(2)}]}>
            Offer service types
          </Text>
          <ServiceList
            Data={data}
            selectedSrvName={setStyleServices}
            getTypeOfServices={getTypeOfServices}
            isCount={false}
          />
          <LInput
            title={t('Stylist service ')}
            onChangeText={setStyleServices}
            placeholder={'Stylist service '}
            value={styleServices}
            textConinerstyle={{marginTop: hp(1)}}
            isDisable={true}
          />
          <Translator
            type="google"
            from="en"
            to="ar"
            value={styleServices}
            onTranslated={test => {
              test == 'Enter a URL'
                ? setArabicLaguage(' ')
                : setArabicLaguage(test);
            }}
          />
          <Translator
            type="google"
            from="en"
            to="fr"
            value={styleServices}
            onTranslated={test => {
              test == 'Enter a URL'
                ? setFranchLaguage(' ')
                : setFranchLaguage(test);
            }}
          />
          <DropdownMenu
            title={t('Massage treatments')}
            placeholder={
              tretmentType === '' ? 'Massage treatments' : tretmentType
            }
            slectedserviceName={setTretmentType}
            value={tretmentType}
            Data={serviceType}
            textConinerstyle={{marginTop: hp(0)}}
            selecteID={setSelectedId}
            onPassData={() => {}}
            singleselect={true}
          />
          <LInput
            title={t('Stylist service')}
            onChangeText={setArabicLaguage}
            placeholder={'Stylist service'}
            value={arabicLaguage}
            textConinerstyle={{marginTop: hp(0)}}
            language={'*Arabic'}
            direction={'RTL'}
          />
          <LInput
            title={'Stylist service'}
            onChangeText={text => setFranchLaguage(text)}
            placeholder={'Stylist service'}
            value={franchLaguage}
            textConinerstyle={{marginTop: hp(0)}}
            language={'*French'}
          />
          <DropdownMenu
            title={t('Massage treatments')}
            placeholder={
              tretmentType === '' ? 'Massage treatments' : tretmentType
            }
            value={tretmentType}
            Data={serviceType}
            textConinerstyle={{marginTop: hp(0)}}
            language={'*Arabic'}
            direction={'RTL'}
            selecteID={setSelectedId}
          />

          <Button
            buttonText={'Add'}
            width="90%"
            marginTop={hp(2)}
            marginBottom={verticalScale(300)}
            onPress={() => NewOffer()}
          />
        </ScrollView>
        <CustomeLoader visible={loading} />
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
    </View>
  );
};

export default AddOffer;

const styles = StyleSheet.create({
  maiContainer: {
    flex: 1,
  },
  innerBody: {
    paddingHorizontal: wp(4, 1),
    marginBottom: hp(5),
  },
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  profileImgBg: {
    height: wp(60),
    marginTop: hp(1),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  dayselectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F6F5F3',
    height: scale(55),
    borderRadius: scale(15),
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(35),
    marginTop: hp(1),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#27232C',
  },
  radioNotselect: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#848286',
  },
  textIconBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3.6),
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  serviceList: {
    flexDirection: 'row',
    marginHorizontal: scale(10),
    borderRadius: scale(15),
    paddingHorizontal: scale(6),
    backgroundColor: '#F0EEEB',
  },
});
