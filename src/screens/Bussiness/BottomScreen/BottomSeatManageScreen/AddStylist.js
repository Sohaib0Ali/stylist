import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LInput from '../Component/LInput';
import PhoneInput from 'react-native-phone-number-input';
import {t} from 'i18next';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import Button from '../../../../BusinessUtills/components/Button/Button';
import BConfig from '../../../../BusinessUtills/config/config';
import ServiceList from '../Component/ServiceList';
import axios from 'axios';
import DropdownMenu from '../Component/DropdownMenu';
import {TouchableOpacity} from 'react-native';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  showDanger,
  showSuccess,
  showWarning,
} from '../../../../../Utils/FlashMessage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';
import PickerComponent from '../../../../BusinessUtills/components/PickerComponent/PickerComponent';
import PositionPickerComponent from '../../../../BusinessUtills/components/PositionPicker/PositionPickerComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import ImagePIckerModel from '../Component/ImagePIckerModel';
import images from '../../../../BusinessUtills/assets/images/images';
import {useSelector} from 'react-redux';
import Translator from 'react-native-translator';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useNavigation} from '@react-navigation/native';
import GenderPickerComponent from '../../../../components/GenderPicker/GenderPickerComponent';

const AddStylist = ({onPressAdd}) => {
  const navigation = useNavigation();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const [fullName, setFullName] = useState('');
  const [position, setPostion] = useState('Top Master');
  const [experience, setExperience] = useState('');
  const [gender, setGender] = useState('Male');
  const [Email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [massage, setMassage] = useState('');
  const [logo, setLogo] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [arabicLaguage, setArabicLaguage] = useState('');
  const [franchLaguage, setFranchLaguage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const refRBSheet = useRef();
  const refGenderSheet = useRef();

  //Get API Services
  const [data, setData] = useState([]);
  const [servName, setServeName] = useState();
  const [serviceType, setServiceType] = useState([]);
  const [serviceID, setServiceID] = useState();
  const serId = [];
  let [selectedId, setSelectedId] = useState();
  const phoneInput = useRef(null);

  useEffect(() => {
    getAllServices();
  }, [servName]);

  const getAllServices = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}getAllService`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setData(response?.data?.data);
          if (response.data.data.length > 0) {
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
    if (serId.length !== 0) {
      serId.push({
        serid: id,
      });
    }
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
      setLogo(response);
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
        setLogo(response);
      });
    }
  };
  const [phoneValidError, setPhoneValidError] = useState('');

  const handleValidPhone = val => {
    let reg = /^[-+]?[0-9]+$/;

    if (val.length === 0) {
      setPhoneValidError(t('required'));
    } else if (val.length < 10) {
      setPhoneValidError(t('minimum10char'));
    } else if (val.length > 13) {
      setPhoneValidError(t('max13Char'));
    } else if (reg.test(val) === false) {
      setPhoneValidError(t('onlyDigit'));
    } else if (reg.test(val) === true) {
      setPhoneValidError(t('done'));
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [firstNameValidError, setFirstNameValidError] = useState('');

  const handleValidName = val => {
    if (val.length === 0) {
      setFirstNameValidError(t('validFirstName'));
    } else if (val.length < 3) {
      setFirstNameValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setFirstNameValidError(t('max20Char'));
    } else {
      setFirstNameValidError(t('done'));
    }
  };

  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError(t('validEmail'));
    } else if (reg.test(val) === false) {
      setEmailValidError(t('pleaseEnterValidEmail'));
    } else if (reg.test(val) === true) {
      setEmailValidError(t('done'));
    }
  };

  const [experianceValidError, setexperianceValidError] = useState('');
  const handleValidexperiance = val => {
    if (isNaN(val)) {
      setexperianceValidError(t('onlynumbers'));
    } else if (val.length !== 1 && val.length !== 2) {
      setexperianceValidError(t('validExperience'));
    } else {
      setexperianceValidError(t('done'));
    }
  };

  const callApi = async () => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedId.length; i++) {
        const {serviceId, subCategory} = selectedId[i];
        formData.append(`serviceTypeData[${i}][serviceId]`, serviceId);
        for (let j = 0; j < subCategory.length; j++) {
          formData.append(
            `serviceTypeData[${i}][subCategory][]`,
            subCategory[j],
          );
        }
      }
      formData.append('profilePic', {
        uri: logo?.assets[0]?.uri,
        type: logo?.assets[0]?.type,
        name: logo?.assets[0]?.fileName,
      });

      formData.append('salonId', MainBranch?.salon?._id);
      formData.append('gender', gender.toLowerCase());
      formData.append('position', position);
      formData.append('fullName', fullName);
      formData.append('email', Email);
      formData.append('phoneNo', phoneNumber);
      formData.append('experience', experience);
      try {
        const headers = {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        };
        const response = await axios.post(
          `${BConfig.baseUrl}business/addStylist`,
          formData,
          {headers},
        );
        if (response?.data?.success) {
          setShowLoader(false);
          navigation.navigate('DashboardScreen', {
            screenType: 'Screen_A',
          });
          // onPressAdd('Add stylist');
          showSuccess(t('successFully'));
        }
      } catch (error) {
        setShowLoader(false);
        showWarning(t('something went wrong'));
      }
    } catch (error) {
      setShowLoader(false);
    }
  };

  const handleData = data => {
    setSelectedId(data);
  };
  const valid = () => {
    if (
      firstNameValidError === 'Done' &&
      emailValidError === 'Done' &&
      phoneValidError === 'Done'
    ) {
      callApi();
    } else {
      showWarning(t('mandatory'));
      if (firstNameValidError != 'Done') {
        setFirstNameValidError(t('validFirstName'));
      }
      if (emailValidError != 'Done') {
        setEmailValidError(t('validEmail'));
      }
      if (phoneValidError != 'Done') {
        setPhoneValidError(t('required'));
      }
    }
  };

  return (
    <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: wp(6)}}>
        <Text style={[styles.subTextHeading, {marginTop: hp(2)}]}>
          Add Stylist
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp(1),
            borderWidth: scale(0.8),
            borderColor: colors.grey,
            borderRadius: wp(2),
            marginTop: wp(2),
          }}>
          <View style={styles.logoBg}>
            {logo === undefined ? (
              <Image
                style={{
                  width: wp(10.2),
                  height: wp(10.2),
                  resizeMode: 'contain',
                }}
                source={images.Exclude}
              />
            ) : (
              <Image source={{uri: logo?.assets[0]?.uri}} style={styles.logo} />
            )}
          </View>
          <TouchableOpacity
            style={styles.textIconBg}
            activeOpacity={0.6}
            onPress={() => {
              toggleModal();
            }}>
            <Image
              style={{
                width: 24,
                height: 16,
                opacity: 0.6,
                resizeMode: 'cover',
                marginRight: scale(5),
              }}
              source={images.cloud_Upload}
            />
            <SemiMediumTitle
              title={t('uploadProfileImage')}
              color={colors.btnColor}
            />
          </TouchableOpacity>
        </View>
        <PickerComponent
          paddingHorizontal={wp(3)}
          value={position}
          title={t('position')}
          marginBottom={wp(1)}
          direction="LTR"
          onPress={() => refRBSheet.current.open()}
        />
        <LInput
          title={t('Full name')}
          onChangeText={text => {
            setFullName(text);
            handleValidName(text);
          }}
          placeholder={'Full name '}
          value={fullName}
          textConinerstyle={{marginTop: hp(1)}}
          language={'English'}
        />
        {firstNameValidError !== 'Done' && firstNameValidError !== '' ? (
          <SmallTitle
            title={firstNameValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Translator
          type="google"
          from="en"
          to="ar"
          value={fullName}
          onTranslated={test => {
            test == 'Enter a URL'
              ? setArabicLaguage(' ')
              : setArabicLaguage(test);
          }}
        />
        <LInput
          title={t('Full name')}
          value={arabicLaguage}
          onChangeText={text => {
            setArabicLaguage(text);
          }}
          placeholder={'Full name'}
          textConinerstyle={{marginTop: hp(0)}}
          language={'*Arabic'}
          direction={'RTL'}
        />
        <Translator
          type="google"
          from="en"
          to="fr"
          value={fullName}
          onTranslated={test => {
            test == 'Enter a URL'
              ? setFranchLaguage(' ')
              : setFranchLaguage(test);
          }}
        />
        <LInput
          title={'Full name'}
          onChangeText={text => setFranchLaguage(text)}
          placeholder={'Full name'}
          value={franchLaguage}
          textConinerstyle={{marginTop: hp(0)}}
          language={'*French'}
        />
        <LInput
          title={t('Years of experience')}
          onChangeText={experience => {
            setExperience(experience);
            handleValidexperiance(experience);
          }}
          placeholder={'Years of experience'}
          value={experience}
          textConinerstyle={{marginTop: hp(0)}}
        />
        {experianceValidError !== 'Done' && experianceValidError !== '' ? (
          <SmallTitle
            title={experianceValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <View style={{marginTop: verticalScale(-5)}}>
          <PickerComponent
            value={gender}
            title={t('gender')}
            direction="LTR"
            onPress={() => refGenderSheet.current.open()}
            paddingHorizontal={wp(3)}
          />
        </View>
        {/* <LInput
          title={t('Service for the gender')}
          onChangeText={gender => {
            setGender(gender);
            handleValidGender(gender);
          }}
          placeholder={'Enter gender'}
          value={gender}
          textConinerstyle={{marginTop: hp(0)}}
        />
        {genderValidError !== 'Done' && genderValidError !== '' ? (
          <SmallTitle
            title={genderValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
            numberofLOne={2}
          />
        ) : null} */}
        <LInput
          title={t('Email')}
          onChangeText={Email => {
            setEmail(Email);
            handleValidEmail(Email);
          }}
          placeholder={'Email'}
          value={Email}
          textConinerstyle={{marginTop: hp(1)}}
        />
        {emailValidError !== 'Done' && emailValidError !== '' ? (
          <SmallTitle
            title={emailValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}

        <View style={styles.phoneBg}>
          <Text style={styles.title}>{t('phoneNumber')}</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="MA"
            containerStyle={styles.phoneContainer}
            countryPickerButtonStyle={{backgroundColor: 'transparent'}}
            textContainerStyle={styles.textInput}
            onChangeFormattedText={text => {
              setphoneNumber(text);
              handleValidPhone(text);
            }}
          />
        </View>
        {phoneValidError !== 'Done' && phoneValidError !== '' ? (
          <SmallTitle
            title={phoneValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
        <Text style={{fontWeight: '400', color: '#5E5E5F', fontSize: 16}}>
          Stylist service types
        </Text>
        <ServiceList
          Data={data}
          selectedSrvName={setMassage}
          getTypeOfServices={getTypeOfServices}
          servicetype={serviceType}
        />

        <LInput
          title={t('Stylist service ')}
          placeholder={'Massage'}
          value={massage}
          textConinerstyle={{marginTop: hp(1)}}
          isDisable={true}
        />
        <DropdownMenu
          title={t('Available treatments')}
          placeholder={
            serviceType != '' ? 'Please select' : 'Please add treatment'
          }
          serviceId={serviceID}
          Data={serviceType}
          textConinerstyle={{marginTop: hp(0)}}
          onPassData={handleData}
        />

        <Button
          buttonText={'Invite via Email'}
          width="90%"
          marginTop={hp(5)}
          marginBottom={verticalScale(200)}
          onPress={() => valid()}
        />
        <Button
          buttonText={'Copy link for share'}
          width="90%"
          bgColor={'#FFFFFF'}
          textColor={'#57429D'}
          marginTop={hp(2)}
          marginBottom={hp(10)}
        />
      </View>
      <RBSheet
        height={hp(38)}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}>
        <PositionPickerComponent
          getCountValue={selectedPosition => {
            setPostion(
              selectedPosition == 1
                ? 'Top Master'
                : selectedPosition == 2
                ? 'Manager'
                : selectedPosition == 3
                ? 'Master'
                : selectedPosition == 4
                ? 'Traniee'
                : 'Top Maste',
            );
          }}
          onPressLeft={() => refRBSheet.current.close()}
          onPressRight={() => refRBSheet.current.close()}
        />
      </RBSheet>
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
      <CustomeLoader visible={showLoader} />
      <RBSheet
        height={hp(38)}
        ref={refGenderSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}>
        <GenderPickerComponent
          getCountValue={selectedGender => {
            setGender(
              selectedGender == 1
                ? t('male')
                : selectedGender == 2
                ? t('female')
                : t('male'),
            );
          }}
          onPressLeft={() => refGenderSheet.current.close()}
          onPressRight={() => refGenderSheet.current.close()}
        />
      </RBSheet>
    </ScrollView>
  );
};

export default AddStylist;

const styles = StyleSheet.create({
  subTextHeading: {
    color: '#5E5E5F',
    fontSize: 16,
    fontWeight: '400',
  },
  phoneBg: {
    marginBottom: hp(1),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: wp(2),
    height: Platform.OS === 'ios' ? hp(8) : hp(9),
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: hp(0.9),
    marginLeft: wp(3),
  },
  phoneContainer: {
    borderRadius: wp(2),
    width: '100%',
    backgroundColor: 'transparent',
  },
  textInput: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  logoBg: {
    width: wp(15),
    height: wp(15),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(22),
    alignSelf: 'center',
    margin: hp(1.5),
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: wp(22),
  },
  textIconBg: {
    marginLeft: wp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
});
