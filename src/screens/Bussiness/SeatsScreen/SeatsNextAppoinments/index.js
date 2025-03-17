//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonMenuComponent from '../../../../BusinessUtills/components/Client Components/SalonMenuComponent/SalonMenuComponent';
import BackIcon from '../../../../BusinessUtills/components/BackIcon/BackIcon';
import MediumTitle from '../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import StylistAppointment from '../../../../BusinessUtills/components/Business Components/Stylist Component/AppointmentComponent';
import {useNavigation} from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const SeatsNextAppoinmentsScreen = props => {
  const isFocused = useIsFocused();
  let stylistId = props?.route?.params?.stylistId;
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const {t} = useTranslation();
  const MenuData = [
    {
      id: 1,
      title: t('today'),
    },
    {
      id: 2,
      title: t('tommorow'),
    },
    {
      id: 3,
      title: t('thisWeek'),
    },
  ];

  useEffect(() => {
    if (isFocused) {
      getAllAppoinments();
    }
  }, [isFocused]);

  const getAllAppoinments = () => {
    var data = '';

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getBookingsByStylistId/${stylistId}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          setToday(res?.data?.today);
          setTomorrow(res?.data?.tomorrow);
          setThisWeek(res?.data?.thisWeek);
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BackIcon paddingHorizontal={0} icon={icons.plus} />
      <View style={{flexDirection: 'row', paddingHorizontal: hp(2)}}>
        <View style={{justifyContent: 'center'}}>
          <SemiMediumTitle fontSize={wp(7)} title={t('seats2')} />
        </View>
        <View style={styles.available}>
          <SemiMediumTitle title={t('available')} />
        </View>
      </View>
      <View style={{paddingHorizontal: hp(2)}}>
        <MediumTitle
          title={t('nextAppoinments')}
          marginBottom={hp(2)}
          alignSelf={'baseline'}
          marginLeft={wp(5)}
        />
      </View>

      <View style={styles.body}>
        <View>
          <FlatList
            contentContainerStyle={{
              marginBottom: hp(4.8),
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
                  key={item.id}
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
        {selectedId === 1 ? (
          today?.length > 0 ? (
            <FlatList
              data={today}
              renderItem={({item}) => {
                const backgroundColor =
                  item?.id === selectedId ? colors.yellow : colors.white;
                return (
                  <StylistAppointment
                    name={item?.serviceName}
                    typeName={item?.serviceTypeName}
                    textColor={'black'}
                    price={item?.amount}
                    currency={item?.currency}
                    scheduletime={item.bookingDateTime}
                    iconImage={item?.icon}
                    status={item?.status}
                    service={true}
                    backgroundColor={{backgroundColor}}
                    onPress={() =>
                      navigation.navigate('STYLIST_CONFIRM_APPOINTMENT', {
                        dataSelect: item,
                      })
                    }
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
            />
          ) : (
            <SimpleText text={t('noAppointment')} />
          )
        ) : selectedId === 2 ? (
          tomorrow?.length > 0 ? (
            <FlatList
              data={tomorrow}
              renderItem={({item}) => {
                const backgroundColor =
                  item?.id === selectedId ? colors.yellow : colors.white;
                return (
                  <StylistAppointment
                    name={item?.serviceName}
                    typeName={item?.serviceTypeName}
                    textColor={'black'}
                    price={item?.amount}
                    currency={item?.currency}
                    scheduletime={item.bookingDateTime}
                    iconImage={item?.icon}
                    status={item?.status}
                    service={true}
                    backgroundColor={{backgroundColor}}
                    onPress={() =>
                      navigation.navigate('STYLIST_CONFIRM_APPOINTMENT', {
                        dataSelect: item,
                      })
                    }
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
            />
          ) : (
            <SimpleText text={t('noAppointment')} />
          )
        ) : selectedId === 3 ? (
          thisWeek?.length > 0 ? (
            <FlatList
              data={thisWeek}
              renderItem={({item}) => {
                const backgroundColor =
                  item?.id === selectedId ? colors.yellow : colors.white;
                return (
                  <StylistAppointment
                    name={item?.serviceName}
                    typeName={item?.serviceTypeName}
                    textColor={'black'}
                    price={item?.amount}
                    currency={item?.currency}
                    scheduletime={item.bookingDateTime}
                    iconImage={item?.icon}
                    status={item?.status}
                    service={true}
                    backgroundColor={{backgroundColor}}
                    onPress={() =>
                      navigation.navigate('STYLIST_CONFIRM_APPOINTMENT', {
                        dataSelect: item,
                      })
                    }
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
            />
          ) : (
            <SimpleText text={t('noAppointment')} />
          )
        ) : today?.length > 0 ? (
          <FlatList
            data={today}
            renderItem={({item}) => {
              const backgroundColor =
                item?.id === selectedId ? colors.yellow : colors.white;
              return (
                <StylistAppointment
                  name={item?.serviceName}
                  typeName={item?.serviceTypeName}
                  textColor={'black'}
                  price={item?.amount}
                  currency={item?.currency}
                  scheduletime={item.bookingDateTime}
                  iconImage={item?.icon}
                  status={item?.status}
                  service={true}
                  backgroundColor={{backgroundColor}}
                  onPress={() =>
                    navigation.navigate('STYLIST_CONFIRM_APPOINTMENT', {
                      dataSelect: item,
                    })
                  }
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?._id}
          />
        ) : (
          <SimpleText text={t('noAppointment')} />
        )}
      </View>
    </View>
  );
};

export default SeatsNextAppoinmentsScreen;
