//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonMenuComponent from '../../../../BusinessUtills/components/Client Components/SalonMenuComponent/SalonMenuComponent';
import InfoAddLocation from '../InfoAddLocation';
import AddLocationProfilePhotoScreen from '../addLocationProfilePhotoScreen';
import AddLocationSheduleScreen from '../AddLocationShedule';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import Title from '../../../../BusinessUtills/components/Title/Title';
import Button from '../../../../BusinessUtills/components/Button/Button';
import moment from 'moment';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {SALON_DETAIL} from '../../../../../redux/store/actions/salons_Actions';

const AddLocationHome = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(1);
  const [checkValidation, setCheckValidation] = useState(false);
  const [fillProfileData, setFillProfileData] = useState({});
  const [profileImagesData, setProfileImagesData] = useState({});
  const [schedule, setSchedule] = useState({});
  const [loading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  const MenuData = [
    {
      id: 1,
      title: t('info'),
    },
    {
      id: 2,
      title: t('profilePhoto'),
    },
    {
      id: 3,
      title: t('schedule'),
    },
  ];

  const handlePageChange = () => {
    if (checkValidation) {
      if (selectedId === 1) {
        setSelectedId(2);
      } else if (selectedId === 2) {
        setSelectedId(3);
      }
    } else {
      alert(t('pleaseFillData'));
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

  const callBackProfileImagesData = profileData => {
    if (profileData.logo !== '' && profileData.profile !== '') {
      setProfileImagesData({
        profile: [
          {
            uri: profileData?.profile?.assets[0]?.uri,
            fileName: profileData?.profile?.assets[0]?.fileName,
            type: profileData?.profile?.assets[0]?.type,
          },
        ],
        logo: [
          {
            uri: profileData?.logo?.assets[0]?.uri,
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

  const checkSheduleValue = data => {
    let dayDummy = [];
    let offDayFummy = [];
    if (data.day.length > 0) {
      data.day.map(item => {
        dayDummy.push(item.value);
      });
      data.dayOff.map(item => {
        offDayFummy.push(item.value);
      });

      setSchedule(
        JSON.stringify({
          day: dayDummy,
          dayOff: offDayFummy,
          to: moment(data.to).format('hh:mm A'),
          from: moment(data.from).format('hh:mm A'),
        }),
      );
      setCheckValidation(true);
    } else {
      setCheckValidation(false);
    }
  };

  const callApiForAddLocation = () => {
    if (schedule.length > 0) {
      setIsLoading(true);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('businessName', fillProfileData?.businessName);
      data.append('address', fillProfileData?.address1);
      data.append('location[lat]', fillProfileData?.location?.latitude);
      data.append('location[lng]', fillProfileData?.location?.longitude);
      data.append('state', fillProfileData?.state);
      data.append('postCode', fillProfileData?.postCode);
      data.append('city', fillProfileData?.city);
      data.append('schedule', schedule);
      data.append('profile', {
        uri: profileImagesData?.profile[0]?.uri,
        type: profileImagesData?.profile[0]?.type,
        name: profileImagesData?.profile[0]?.fileName,
      });
      data.append('logo', {
        uri: profileImagesData?.logo[0]?.uri,
        type: profileImagesData?.logo[0]?.type,
        name: profileImagesData?.logo[0]?.fileName,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}addSalon`,
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
          setIsLoading(false);
          if (res.success) {
            dispatch({type: SALON_DETAIL, payload: res?.data?.salon});
            navigation.navigate('DASHBOARD_SCREEN');
          }
        })
        .catch(function (error) {
          setIsLoading(false);
        });
    } else {
      alert(t('pleaseAddSchedule'));
    }
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BackIcon />
      <Title
        title={t('addLocation')}
        marginBottom={hp(1)}
        alignSelf={'baseline'}
        marginLeft={wp(5)}
      />
      <View style={styles.container}></View>
      <View style={styles.body}>
        <View style={{marginLeft: wp('4%')}}>
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
                  backgroundColor={{backgroundColor}}
                  color={{color}}
                />
              );
            }}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>

        {selectedId === 1 ? (
          <InfoAddLocation checkCallBack={callBackData} />
        ) : selectedId === 2 ? (
          <AddLocationProfilePhotoScreen
            currentPage={selectedId}
            callBackProfileImagesData={callBackProfileImagesData}
          />
        ) : selectedId === 3 ? (
          <AddLocationSheduleScreen
            currentPage={selectedId}
            checkSheduleValue={checkSheduleValue}
          />
        ) : (
          <InfoAddLocation checkCallBack={callBackData} />
        )}
        <View style={{paddingHorizontal: wp(4)}}>
          <Button
            buttonText={selectedId === 3 ? t('addLocation') : t('next')}
            width="100%"
            marginTop={hp(4)}
            onPress={() => {
              selectedId === 3 ? callApiForAddLocation() : handlePageChange();
            }}
          />
        </View>
        <CustomeLoader visible={loading} />
      </View>
    </View>
  );
};

export default AddLocationHome;
