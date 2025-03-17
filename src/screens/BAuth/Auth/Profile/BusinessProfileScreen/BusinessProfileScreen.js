//================================ React Native Imported Files ======================================//
import React, {useState, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SemiTitle from '../../../../../BusinessUtills/components/SemiTitle';
import SimpleText from '../../../../../BusinessUtills/components/SimpleText/SimpleText';
import Button from '../../../../../BusinessUtills/components/Button/Button';
import PagerView from 'react-native-pager-view';
import DescriptionScreen from '../DescriptionScreen';
import ProfileImagesScreen from '../ProfileImagesScreen';
import ProfilePhotosScreen from '../PortfolioPhotosScreen';
import ProfileInfoScreen from '../ProfileInfo';
import BusinessInfoScreen from '../BusinessInfoScreen';
import BConfig from '../../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import {showWarning} from '../../../../../../Utils/FlashMessage';
import CustomeLoader from '../../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {CLOSE_TAB} from '../../../../../../redux/store/actions/sheetManagerActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessProfileScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [checkValidation, setCheckValidation] = useState(false);
  const [salonId, setSalonId] = useState('');
  const [fillProfileData, setFillProfileData] = useState({});
  const [descriptionData, setDescriptionData] = useState('');
  const [albumData, setAlbumData] = useState('');
  const [profileImagesData, setProfileImagesData] = useState({});
  const [profilePhotosData, setProfilePhotosData] = useState([]);
  const [businessInfoData, setBusinessInfoData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [albumLoader, setAlbumLoader] = useState(false);
  const [businessLoader, setBusinessLoader] = useState(false);
  const [checkScreenOne, setCheckScreenOne] = useState();

  useEffect(() => {
    const checkToken = async () => {
      const Token = await AsyncStorage.getItem('cleanedToken');
      const NewToken = JSON.parse(Token);
      BConfig.token = NewToken;
    };
    checkToken();
  }, [BConfig.token]);

  const handlePageChange = () => {
    if (currentPage === 0) {
      if (
        fillProfileData?.businessName != undefined &&
        fillProfileData?.address1 != undefined &&
        fillProfileData?.city != undefined &&
        fillProfileData?.state != undefined &&
        fillProfileData?.postCode != undefined &&
        fillProfileData?.numberOfSalon != undefined
      ) {
        setCurrentPage(currentPage + 1);
        pagerRef.current.setPage(currentPage + 1);
      } else {
        setCheckScreenOne('CheckNow');
        showWarning(t('mandatory'));
      }
    } else if (currentPage === 1) {
      if (descriptionData != '') {
        callApiForFillInfo();
      } else {
        showWarning(t('fillDescription'));
      }
    } else if (currentPage === 2) {
      if (
        profileImagesData.logo[0].fileName != '' &&
        profileImagesData.profile[0].fileName != ''
      ) {
        callApiForProfileImages();
      } else {
        showWarning(t('pleaseSelectImage'));
      }
    } else if (currentPage === 3) {
      if (
        profilePhotosData[0]?.assets[0]?.uri != undefined &&
        profilePhotosData[1]?.assets[0]?.uri != undefined &&
        profilePhotosData[2]?.assets[0]?.uri != undefined &&
        albumData != ''
      ) {
        callApiForProfilePhotos();
      } else {
        showWarning(t('mandatory'));
      }
    } else if (currentPage === 4) {
      if (
        businessInfoData[0]?.link != '' ||
        businessInfoData[1]?.link != '' ||
        businessInfoData[2]?.link != ''
      ) {
        callApiForBusinessInfo();
      } else {
        showWarning(t('pleaseEnterData'));
      }
    } else {
      showWarning(t('mandatory'));
    }
  };

  const callBackData = data => {
    if (
      data[1].businessNameValidError === 'Done' &&
      data[1].address1ValidError === 'Done' &&
      data[1].cityValidError === 'Done' &&
      data[1].stateValidError === 'Done' &&
      data[1].postCodeValidError === 'Done' &&
      data[1].markerValidError === 'Done'
    ) {
      setCheckValidation(true);
      setFillProfileData(data[0]);
    } else {
      setCheckValidation(false);
    }
  };

  const callBackDiscriptionData = dataDescription => {
    if (
      dataDescription.description != '' &&
      dataDescription.descriptionValidError === 'Done'
    ) {
      setDescriptionData(dataDescription.description);
      setCheckValidation(true);
    } else {
      setCheckValidation(false);
    }
  };

  const validProfileImgData = profileData => {
    if (profileData.logo !== '' && profileData.profile !== '') {
      setProfileImagesData({
        profile: [
          {
            uri: profileData?.profile?.path,
            fileName: profileData?.profile?.path?.split('/').pop(),
            type: profileData?.profile?.mime,
          },
        ],
        logo: [
          {
            uri: profileData?.logo?.path,
            fileName: profileData?.logo?.path?.split('/').pop(),
            type: profileData?.logo?.mime,
          },
        ],
      });
      setCheckValidation(true);
    } else if (profileData?.logo === '' && profileData?.profile === '') {
      setCheckValidation(false);
    }
  };

  const callBackProfileImagesData = callData => {
    validProfileImgData(callData);
  };

  const validProfilePhotos = photos => {
    if (
      photos?.profilePhotos[0] != '' &&
      photos?.profilePhotos[1] != '' &&
      photos?.profilePhotos[2] != ''
    ) {
      setProfilePhotosData([
        photos.profilePhotos[0],
        photos.profilePhotos[1],
        photos.profilePhotos[2],
      ]);
      setAlbumData(photos.album);
      setCheckValidation(true);
    } else if (photos === [] || photos === '') {
      setCheckValidation(false);
    }
  };

  const callBackProfilePhotosData = profilePhotosData => {
    validProfilePhotos(profilePhotosData);
  };

  const callBackBusinessInfoData = BusinessInfo => {
    validBusinessInfo(BusinessInfo);
  };
  const validBusinessInfo = businessInfo => {
    if (
      (businessInfo.socialLinks[0] !== null &&
        businessInfo.socialLinks[3].fbValidError === 'Done') ||
      (businessInfo.socialLinks[1] !== null &&
        businessInfo.socialLinks[3].youtubeValidError === 'Done') ||
      (businessInfo.socialLinks[2] !== null &&
        businessInfo.socialLinks[3].instagramValidError === 'Done')
    ) {
      setBusinessInfoData([
        businessInfo.socialLinks[0],
        businessInfo.socialLinks[1],
        businessInfo.socialLinks[2],
      ]);
      setCheckValidation(true);
    } else {
      if (
        businessInfo.socialLinks[0].link === '' &&
        businessInfo.socialLinks[1].link === '' &&
        businessInfo.socialLinks[2].link === ''
      )
        setCheckValidation(false);
    }
  };

  const callApiForFillInfo = () => {
    var data = JSON.stringify({
      businessName: fillProfileData?.businessName,
      address: fillProfileData?.address1,
      location: {
        lat: fillProfileData?.location?.latitude,
        lng: fillProfileData?.location?.longitude,
      },
      city: fillProfileData?.city,
      state: fillProfileData?.state,
      postCode: fillProfileData?.postCode,
      description: descriptionData,
      numberOfSalon: fillProfileData?.numberOfSalon,
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/profile`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setCurrentPage(currentPage + 1);
          pagerRef.current.setPage(currentPage + 1);
          let res = response.data;
          setSalonId(res.data.salonId);
        } else if (response?.data?.success === 'false') {
        }
      })
      .catch(function (error) {
        alert(t('somethingWentWrong'));
      });
  };

  const callApiForProfileImages = () => {
    setLoader(true);
    var FormData = require('form-data');
    var data = new FormData();
    data.append('profile', {
      uri: profileImagesData?.profile[0]?.uri,
      type: profileImagesData.profile[0]?.type,
      name: profileImagesData.profile[0].fileName,
    });
    data.append('logo', {
      uri: profileImagesData?.logo[0]?.uri,
      type: profileImagesData?.logo[0]?.type,
      name: profileImagesData?.logo[0]?.fileName,
    });

    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/uploadProfileAndLogo/${salonId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setLoader(false);
          setCurrentPage(currentPage + 1);
          pagerRef.current.setPage(currentPage + 1);
        }
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        alert(t('somethingWentWrong'));
      });
  };
  const callApiForProfilePhotos = () => {
    setAlbumLoader(true);
    var FormData = require('form-data');
    var data = new FormData();
    data.append('portfolio-images', {
      uri: profilePhotosData[0]?.assets[0]?.uri,
      type: profilePhotosData[0]?.assets[0]?.type,
      name: profilePhotosData[0]?.assets[0]?.fileName,
    });
    data.append('portfolio-images', {
      uri: profilePhotosData[1]?.assets[0]?.uri,
      type: profilePhotosData[1]?.assets[0]?.type,
      name: profilePhotosData[1]?.assets[0]?.fileName,
    });
    data.append('portfolio-images', {
      uri: profilePhotosData[2]?.assets[0]?.uri,
      type: profilePhotosData[2]?.assets[0]?.type,
      name: profilePhotosData[2]?.assets[0]?.fileName,
    });
    data.append('albumName', albumData);
    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/uploadPortfolio/${salonId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setAlbumLoader(false);
          setCurrentPage(currentPage + 1);
          pagerRef.current.setPage(currentPage + 1);
        }
        setAlbumLoader(false);
      })
      .catch(function (error) {
        setAlbumLoader(false);
        alert(t('somethingWentWrong'));
      });
  };
  const callApiForBusinessInfo = () => {
    setBusinessLoader(true);
    var data = JSON.stringify({
      socialLinks: [
        {
          link: businessInfoData[0]?.link,
          plateform: businessInfoData[0]?.plateform,
        },
        {
          link: businessInfoData[1]?.link,
          plateform: businessInfoData[1]?.plateform,
        },
        {
          link: businessInfoData[2]?.link,
          plateform: businessInfoData[2]?.plateform,
        },
      ],
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/addSocialLinks`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setBusinessLoader(false);
          let res = response.data;
          setSalonId(res.data.salonId);
          navigation.reset({
            index: 0,
            routes: [{name: 'DASHBOARD_SCREEN'}],
          });
        } else if (response?.data?.success === 'false') {
          setBusinessLoader(false);
        }
      })
      .catch(function (error) {
        setBusinessLoader(false);
        alert(t('somethingWentWrong'));
      });
  };

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: colors.secondary}}
      keyboardDismissMode
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
            marginVertical: scale(10),
          }}>
          <SemiTitle title={t('fillInProfileInfo')} alignSelf={'center'} />
          {currentPage == 3 ? (
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                setCurrentPage(4);
                pagerRef.current.setPage(currentPage + 1);
              }}>
              <Text>SKIP</Text>
            </TouchableOpacity>
          ) : null}
          {currentPage == 4 ? (
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                dispatch({type: CLOSE_TAB, payload: false});
                navigation.navigate('DASHBOARD_SCREEN');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'DASHBOARD_SCREEN'}],
                });
              }}>
              <Text>SKIP</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.tabContainer}>
          <View style={currentPage === 0 ? styles.active : styles.inActive} />
          <View style={currentPage === 1 ? styles.active : styles.inActive} />
          <View style={currentPage === 2 ? styles.active : styles.inActive} />
          <View style={currentPage === 3 ? styles.active : styles.inActive} />
          <View style={currentPage === 4 ? styles.active : styles.inActive} />
        </View>
        <SimpleText
          text={`Step ${currentPage + 1} of 5`}
          alignSelf="flex-start"
          marginTop={hp(2)}
        />

        <View style={styles.body}>
          <PagerView
            scrollEnabled={false}
            style={{flex: 1}}
            initialPage={0}
            ref={pagerRef}
            onPageSelected={e => {
              setCurrentPage(e.nativeEvent.position);
            }}>
            <View key="1">
              <ProfileInfoScreen
                callBackData={callBackData}
                CheckFields={checkScreenOne}
              />
            </View>
            <View key="2">
              <DescriptionScreen
                currentPage={currentPage}
                callBackDiscriptionData={callBackDiscriptionData}
              />
            </View>
            <View key="3">
              <ProfileImagesScreen
                currentPage={currentPage}
                callBackProfileImagesData={callBackProfileImagesData}
              />
              <CustomeLoader visible={loader} />
            </View>
            <View key="4">
              <ProfilePhotosScreen
                currentPage={currentPage}
                callBackProfilePhotosData={callBackProfilePhotosData}
              />
              <CustomeLoader visible={albumLoader} />
            </View>
            <View key="5">
              <BusinessInfoScreen
                currentPage={currentPage}
                callBackBusinessInfoData={callBackBusinessInfoData}
              />
              <CustomeLoader visible={businessLoader} />
            </View>
          </PagerView>
          <View style={{marginBottom: currentPage === 1 ? 55 : 0}}>
            <Button
              buttonText={currentPage === 4 ? "let's start" : t('next')}
              onPress={() => handlePageChange()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BusinessProfileScreen;
