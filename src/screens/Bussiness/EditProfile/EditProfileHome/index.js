//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, ScrollView, FlatList, ActivityIndicator} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonMenuComponent from '../../../../BusinessUtills/components/Client Components/SalonMenuComponent/SalonMenuComponent';
import InfoEditProfile from '../InfoEditProfile';
import EditProfilePhotoScreen from '../EditProfilePhotoScreen';
import EditProfileSheduleScreen from '../EditProfileShedule';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import {useIsFocused} from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {MAIN_BRANCH} from '../../../../../redux/store/actions/salons_Actions';

const EditProfileHome = ({navigation, route}) => {
  const dispatch = useDispatch();
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const SalonData = useSelector(state => state?.SalonDetails?.SalonDetails);

  const {t} = useTranslation();
  const MenuData = [
    {
      id: '1',
      title: t('info'),
    },
    {
      id: '2',
      title: t('profilePhoto'),
    },
    {
      id: '3',
      title: t('schedule'),
    },
  ];
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(route?.params?.data?.salon);
  const [loading, setLoading] = useState(false);
  const [profileChangeCheck, setProfileChangeCheck] = useState(false);
  const [logoChangeCheck, setLogoChangeCheck] = useState(false);
  const sID = route?.params?.data?.salon?._id;

  useEffect(() => {
    if (isFocused) {
      setData(prev => {
        return {
          ...prev,
          schedule: MainBranch?.salon?.schedule,
        };
      });
    } else {
    }
  }, [isFocused]);

  const getMatchedSalon = salon => {
    SalonData?.map((item, index) => {
      if (item?.salon?._id === MainBranch?.salon?._id) {
        SalonData[index].salon = salon;
        navigation.goBack();
      }
    });
  };

  const [checkValidation, setCheckValidation] = useState(false);
  const [profileImagesData, setProfileImagesData] = useState({
    profile: [{uri: ''}],
    logo: [{uri: ''}],
  });

  const callBackData = infoData => {
    setData(prev => {
      return {
        ...prev,
        companyName: infoData[0].companyName,
        businessName: infoData[0].businessName,
        city: infoData[0].city,
        state: infoData[0].state,
        postCode: infoData[0].postCode,
        address: infoData[0].address,
      };
    });
  };

  const callBackProfileImagesData = callData => {
    if (callData?.profile?.assets) {
      setProfileChangeCheck(true);
      setData(prev => {
        return {
          ...prev,
          profileImage: callData?.profile?.assets[0]?.uri,
          profileImageName: callData?.profile?.assets[0]?.fileName,
          profileImageType: callData?.profile?.assets[0]?.type,
        };
      });
    }
    if (callData?.logo?.assets) {
      setLogoChangeCheck(true);
      setData(prev => {
        return {
          ...prev,
          profileLogo: callData?.logo?.assets[0]?.uri,
          profileLogoName: callData?.logo?.assets[0]?.fileName,
          profileLogoType: callData?.logo?.assets[0]?.type,
        };
      });
    }
  };
  const validProfileImgData = profileData => {
    if (profileData.logo !== '' && profileData.profile !== '') {
      setProfileImagesData({
        profile: [
          {
            uri: profileData?.profile.assets[0]?.uri,
            fileName: profileData?.profile?.assets[0]?.fileName,
            type: profileData?.profile?.assets[0]?.type,
          },
        ],
        logo: [
          {
            uri: profileData?.logo,
            fileName: profileData?.logo?.assets[0]?.fileName,
            type: profileData?.logo?.assets[0]?.type,
          },
        ],
      });
      setCheckValidation(true);
    } else if (profileData?.logo === '' && profileData?.profile === '') {
      setCheckValidation(false);
    }
  };
  const callBackScheduleData = scheduleData => {
    if (
      scheduleData.description != '' &&
      scheduleData.descriptionValidError === 'Done'
    ) {
      setDescriptionData(scheduleData.description);
    } else {
    }
  };

  const pressSave = async () => {
    if (
      data.businessName === '' ||
      data.city === '' ||
      data.state === '' ||
      data.postCode === '' ||
      data.address === ''
    ) {
      alert(t('pleaseFillData'));
    } else {
      setLoading(true);
      var FormData = require('form-data');
      var fromData = new FormData();
      fromData.append('account', data.companyName);
      fromData.append('businessName', data.businessName);
      fromData.append('address', data.address);
      fromData.append('city', data.city);
      fromData.append('state', data.state);
      fromData.append('postCode', data.postCode);
      {
        profileChangeCheck
          ? fromData.append('profile', {
              uri: data.profileImage,
              type: data.profileImageType,
              name: data.profileImageName,
            })
          : null;
      }
      {
        logoChangeCheck
          ? fromData.append('logo', {
              uri: data.profileLogo,
              type: data.profileLogoType,
              name: data.profileLogoName,
            })
          : null;
      }
      var config = {
        method: 'patch',
        url: `${BConfig.baseUrl}/business/updateSalon/${sID}`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: fromData,
      };

      try {
        const response = await axios(config);
        setLoading(false);
        const res = response.data;
        if (res?.success) {
          dispatch({type: MAIN_BRANCH, payload: res?.data});
          getMatchedSalon(res?.data);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BackIcon text={t('save')} pressSave={pressSave} />

      <View style={styles.container}></View>
      <View style={styles.body}>
        <View>
          <FlatList
            contentContainerStyle={{
              paddingVertical: hp(2.8),
            }}
            showsHorizontalScrollIndicator={false}
            data={MenuData}
            horizontal
            renderItem={({item, index}) => {
              const backgroundColor =
                item.id === selectedId
                  ? colors.headingBlack
                  : index == 0 && selectedId == null
                  ? colors.headingBlack
                  : colors.white;
              const color =
                item.id === selectedId
                  ? colors.white
                  : index == 0 && selectedId == null
                  ? colors.white
                  : colors.subHeading;
              return (
                <SalonMenuComponent
                  title={item.title}
                  onPress={() => setSelectedId(item.id)}
                  backgroundColor={{backgroundColor}}
                  color={{color}}
                />
              );
            }}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>

        {data ? (
          selectedId === '1' ? (
            <InfoEditProfile data={data} callBackData={callBackData} />
          ) : selectedId === '2' ? (
            <EditProfilePhotoScreen
              data={data}
              callBackProfileImagesData={callBackProfileImagesData}
            />
          ) : selectedId === '3' ? (
            <EditProfileSheduleScreen
              data={data}
              callBackScheduleData={callBackScheduleData}
            />
          ) : (
            <InfoEditProfile data={data} callBackData={callBackData} />
          )
        ) : (
          <ActivityIndicator color={'#57429D'} size={'large'} />
        )}
      </View>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default EditProfileHome;
