//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

//================================ Local Imported Files ======================================//
import Input from '../../../../BusinessUtills/components/Input/Input';
import PickerComponent from '../../../../BusinessUtills/components/PickerComponent/PickerComponent';
import Title from '../../../../BusinessUtills/components/Title/Title';
import styles from './style';
import PhoneInput from 'react-native-phone-number-input';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import PositionPickerComponent from '../../../../BusinessUtills/components/PositionPicker/PositionPickerComponent';
import Header from '../../../../BusinessUtills/components/Header/Header';
import {showDanger, showWarning} from '../../../../../Utils/FlashMessage';
import Icon from '../../../../BusinessUtills/assets/icons/icon.svg';
import UploadIcon from '../../../../BusinessUtills/assets/icons/upload.svg';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const AddNewStylist = ({navigation}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [position, setPosition] = useState('Top Master');
  const refRBSheet = useRef();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [price, setprice] = useState('');
  const [experiance, setexperiance] = useState('');
  const [logo, setLogo] = useState();

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
        setLogo(response);
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const valid = () => {
    if (
      firstNameValidError === 'Done' &&
      lastNameValidError === 'Done' &&
      emailValidError === 'Done' &&
      phoneValidError === 'Done' &&
      priceValidError
    ) {
      callApi();
    } else {
      showWarning(t('mandatory'));
    }
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
  const [lastNameValidError, setLastNameValidError] = useState('');

  const handleValidlastName = val => {
    if (val.length === 0) {
      setLastNameValidError(t('validLastName'));
    } else if (val.length < 3) {
      setLastNameValidError(t('minimumChar'));
    } else if (val.length > 20) {
      setLastNameValidError(t('max20Char'));
    } else {
      setLastNameValidError(t('done'));
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
  const [priceValidError, setpriceValidError] = useState('');
  const handleValidprice = val => {
    if (val.length === 0) {
      setpriceValidError(t('validStartingPrice'));
    } else if (val.length > 4) {
      setpriceValidError(t('minimumChar'));
    } else {
      setpriceValidError(t('done'));
    }
  };
  const [experianceValidError, setexperianceValidError] = useState('');
  const handleValidexperiance = val => {
    if (val.length === 0) {
      setexperianceValidError(t('validExperience'));
    } else {
      setexperianceValidError(t('done'));
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

  const callApi = async () => {
    setLoading(true);

    var FormData = require('form-data');

    var data = new FormData();
    data.append('salonId', MainBranch?.salon?._id);
    data.append('position', position);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('email', email);
    data.append('phoneNo', phoneNumber);
    data.append('profilePic', {
      uri: logo?.assets[0]?.uri,
      type: logo?.assets[0]?.type,
      name: logo?.assets[0].fileName,
    });
    data.append('experience', experiance);
    data.append('price', price);
    var config = {
      method: 'post',
      url: `${BConfig.baseUrl}business/addStylist`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        setLoading(false);

        if (res.success) {
          navigation.goBack();
        } else {
          setLoading(false);
          if (error.response) {
            showDanger(error?.response?.data?.msg);
          }
        }
      })
      .catch(function (error) {});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null} // Adjust behavior based on platform
    >
      <View
        style={{flex: 1, paddingBottom: wp(4), backgroundColor: colors.white}}>
        <Header
          direction={'RTL'}
          randomText={'Save'}
          headerColor={'white'}
          headerBack={true}
          onBackPress={() => navigation.goBack()}
          onPress={() => valid()}
          small
        />
        <ScrollView
          ref={scrollViewRef}
          onScrollBeginDrag={() => {
            Keyboard.dismiss();
          }}
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          <Title
            title={t('addnewtype')}
            alignSelf={'baseline'}
            marginBottom={hp(2)}
          />

          <View
            style={{
              flexDirection: 'row',
              marginBottom: wp(4),
              borderWidth: wp(0.4),
              borderColor: colors.grey,
              borderRadius: wp(2),
            }}>
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
              style={styles.textIconBg}
              activeOpacity={0.6}
              onPress={() => {
                toggleModal();
              }}>
              <UploadIcon
                width={24}
                height={16}
                style={{marginRight: wp(3.7)}}
              />
              <SemiMediumTitle
                title={t('uploadProfileImage')}
                color={colors.btnColor}
              />
            </TouchableOpacity>
          </View>

          <PickerComponent
            paddingHorizontal={wp(3.1)}
            value={position}
            title={t('position')}
            marginBottom={wp(2)}
            direction="LTR"
            onPress={() => refRBSheet.current.open()}
          />
          <Input
            title={t('firstname')}
            value={firstName}
            onChangeText={firstName => {
              setFirstName(firstName), handleValidName(firstName);
            }}
            placeholder={t('firstname')}
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

          <Input
            title={t('lastname')}
            value={lastName}
            onChangeText={lastName => {
              setLastName(lastName), handleValidlastName(lastName);
            }}
            placeholder={t('lastname')}
          />
          {lastNameValidError !== 'Done' && lastNameValidError !== '' ? (
            <SmallTitle
              title={lastNameValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(80)}
            />
          ) : null}

          <Input
            title={t('email')}
            value={email}
            onChangeText={email => {
              setEmail(email);
              handleValidEmail(email);
            }}
            placeholder={t('emailPlaceHolder')}
            keyboardType={'email-address'}
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
          <Input
            title={t('price')}
            value={price}
            keyboardType={'numeric'}
            onChangeText={price => {
              setprice(price), handleValidprice(price);
            }}
            placeholder={t('price')}
          />
          {priceValidError !== 'Done' && priceValidError !== '' ? (
            <SmallTitle
              title={priceValidError}
              alignSelf="flex-start"
              color={colors.green}
              marginBottom={wp(4)}
              marginLeft={wp(5)}
              width={wp(80)}
            />
          ) : null}

          <Input
            title={t('experience')}
            value={experiance}
            onChangeText={price => {
              setexperiance(price), handleValidexperiance(price);
            }}
            placeholder={t('experiencePlaceHolder')}
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
              marginTop={hp(1.5)}
              marginLeft={wp(5)}
              width={wp(80)}
            />
          ) : null}

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
                setPosition(
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
          <CustomeLoader visible={loading} />
        </ScrollView>
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
    </KeyboardAvoidingView>
  );
};

export default AddNewStylist;
