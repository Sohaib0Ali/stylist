//================================ React Native Imported Files ======================================//
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import images from '../../../../assets/images/images';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import Input from '../../../../components/Input/Input';
import {Switch} from 'react-native-switch';
import PickerComponent from '../../../../components/PickerComponent/PickerComponent';
import icons from '../../../../assets/icons/icons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BackIcon from '../../../../assets/icons/backIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import GenderPickerComponent from '../../../../components/GenderPicker/GenderPickerComponent';
import ShareData from '../../../../../Utils/ShareData';
import {showSuccess, showWarning} from '../../../../../Utils/FlashMessage';
import Config from '../../../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import ImagePIckerModel from '../../../Bussiness/BottomScreen/Component/ImagePIckerModel';

const EditProfileScreen = ({navigation, img}) => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [dexter, setDexter] = useState(false);
  const [thora, setThora] = useState(false);
  const refRBSheet = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState();
  const [manIcon, setManIcon] = useState('');
  const [uriObj, setUriObj] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    let userDetail = Config.userDetail;
    let userData = ShareData.getInstance();
    setAccount(userDetail.name);
    setEmail(userDetail?.email);
    setUriObj(userDetail?.profileImageURL);
    setGender(userDetail?.gender);

    ShareData.styleBot = ShareData.styleBot = ''
      ? ShareData.styleBot
      : userDetail?.styleBot;
    if (userDetail.styleBot == 'Dexter') {
      setDexter(true), setThora(false), (ShareData.styleBot = 'Dexter');
    } else {
      setDexter(false), setThora(true), (ShareData.styleBot = 'Thora');
    }
  }, []);

  const _storeUserData = async data => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    } catch (error) {}
  };

  const CallApiForUpdateData = async () => {
    if (account === '') {
      showWarning(t('enterName'));
    } else if (email === '') {
      showWarning(t('enterEmail'));
    }
    if (email != '' && account != '') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (reg.test(email) === false) {
        showWarning(t('validEmail'));
      } else {
        setLoading(true);
        var FormData = require('form-data');
        var data = new FormData();
        data.append('account', account);
        data.append('email', email);
        data.append('gender', gender);
        {
          filePath
            ? data.append('profilePic', {
                uri: filePath.assets[0].uri,
                type: filePath.assets[0].type,
                name: filePath.assets[0].fileName,
              })
            : null;
        }
        data.append('styleBot', dexter ? 'Dexter' : 'Thora');

        var config = {
          method: 'patch',
          url: `${Config.baseUrl}updateUser`,
          headers: {
            Authorization: `Bearer ${Config.token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            setLoading(false);
            if (response.data.success) {
              showSuccess(response.data.msg);
              _storeUserData(response.data.data);
              Config.userDetail = response.data.data;
              navigation.goBack();
            }
          })
          .catch(function (error) {
            setLoading(false);
            showWarning(error?.response?.data?.msg);
          });
      }
    }
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
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
      setUriObj(response?.assets[0]?.uri);
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
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert('this sis camera issue: ', response.errorMessage);
          return;
        }
        setFilePath(response);
        setUriObj(response?.assets[0]?.uri);
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (dexter) {
      ShareData.styleBot = 'Dexter';
    } else {
      ShareData.styleBot = 'Thora';
    }
  }, [dexter, thora]);
  useEffect(() => {
    AsyncStorage.getItem('selectedLang').then(value => {
      if (value) {
        setSelectedLanguage(value);
        i18n.changeLanguage(value);
      }
    });
  }, []);
  const handleLangChange = async itemValue => {
    setSelectedLanguage(itemValue);
    i18n.changeLanguage(itemValue);
    await AsyncStorage.setItem('selectedLang', itemValue);
  };
  const items = [
    {label: t('english'), value: 'en'},
    {label: t('arabic'), value: 'ar'},
  ];
  return (
    <View style={styles.container}>
      <View
        style={styles.header}
        onPress={() => navigation.navigate('EDIT_PROFILE_SCREEN')}>
        <TouchableOpacity
          style={{paddingRight: wp(6), paddingVertical: wp(4)}}
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}>
          <Image
            style={styles.backIcon}
            source={icons.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            CallApiForUpdateData();
          }}>
          <SimpleText
            text={t('done')}
            alignSelf="flex-end"
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(4)}}>
          <View style={styles.imgBg}>
            {!uriObj ? (
              <Image style={styles.img} source={img} resizeMode="contain" />
            ) : (
              <Image
                style={styles.img}
                source={uriObj ? {uri: uriObj} : images.manIcon}
                resizeMode="stretch"
              />
            )}
          </View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <MediumTitle
              title={t('choosePhoto')}
              color={colors.btnColor}
              alignSelf="center"
              marginTop={hp(0.5)}
              marginBottom={hp(3)}
            />
          </TouchableOpacity>

          <Input
            value={account}
            onChangeText={account => setAccount(account)}
            title={t('account')}
            placeholder={t('accountPlaceHolder')}
          />
          <Input
            value={email}
            onChangeText={email => setEmail(email)}
            title={t('email')}
            placeholder={t('emailPlaceHolder')}
          />

          <PickerComponent
            value={gender}
            title={t('genderPreference')}
            direction="LTR"
            onPress={() => refRBSheet.current.open()}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}></View>
          <MediumTitle title={t('styleBot')} marginTop={hp(3.5)} />
          <TouchableOpacity
            style={{...styles.itemContainer, marginTop: hp(3)}}
            activeOpacity={0.6}>
            <View style={styles.iconTextBg}>
              <View style={styles.snapBg}>
                <Image
                  source={icons.snap}
                  style={styles.snapIcon}
                  resizeMode="contain"
                />
              </View>
              <SimpleText
                text={t('dexter')}
                color={dexter ? colors.headingBlack : colors.subHeading}
              />
            </View>

            <Switch
              value={dexter}
              onValueChange={dexter => {
                setDexter(dexter), setThora(!dexter);
              }}
              disabled={false}
              circleSize={wp(8)}
              barHeight={wp(8.9)}
              circleBorderWidth={0}
              backgroundActive={colors.lightGreen}
              backgroundInactive={colors.grey}
              circleActiveColor={colors.white}
              circleInActiveColor={colors.white}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={wp(66)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.itemContainer, marginTop: hp(3)}}
            activeOpacity={0.6}>
            <View style={styles.iconTextBg}>
              <View style={styles.snapBg}>
                <Image
                  source={icons.thoraIcon}
                  style={styles.snapIcon}
                  resizeMode="contain"
                />
              </View>
              <SimpleText
                text={t('thora')}
                color={thora ? colors.headingBlack : colors.subHeading}
              />
            </View>

            <Switch
              value={thora}
              onValueChange={thora => {
                setThora(thora), setDexter(!thora);
              }}
              disabled={false}
              circleSize={wp(8)}
              barHeight={wp(8.9)}
              circleBorderWidth={0}
              backgroundActive={colors.lightGreen}
              backgroundInactive={colors.grey}
              circleActiveColor={colors.white}
              circleInActiveColor={colors.white}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={wp(66)}
            />
          </TouchableOpacity>

          <View style={{flex: 1}}>
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
                onPressLeft={() => refRBSheet.current.close()}
                onPressRight={() => refRBSheet.current.close()}
              />
            </RBSheet>
          </View>
        </View>
      </ScrollView>
      <CustomeLoader visible={loading} />
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

export default EditProfileScreen;
