//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

//================================ Local Imported Files ======================================//

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import StylistAppointment from '../../../../BusinessUtills/components/Business Components/Stylist Component/AppointmentComponent';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {useTranslation} from 'react-i18next';

const AppointmentScreen = ({data, salonData}) => {
  const navigation = useNavigation();
  const stylistId = data?._id;
  const salonId = salonData?.salon?._id;
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getStylistServices(stylistId, salonId);
    }
  }, [isFocused]);

  const getStylistServices = () => {
    let data = JSON.stringify({
      salonId: salonId,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/getStylistBooking/${stylistId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then(function (response) {
        if (response.data.success === true) {
          setAppointments(response.data.data);
          setLoading(false);
        } else {
          alert(t('somethingWentWrong'));
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const [selectedId, setSelectedId] = useState(null);
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'#57429D'}
          style={{marginTop: '3%'}}
        />
      ) : appointments.length > 0 ? (
        <View style={{height: hp(40)}}>
          <FlatList
            data={appointments}
            renderItem={({item}) => {
              const backgroundColor =
                item?._id === selectedId ? colors.yellow : colors.white;
              return (
                <StylistAppointment
                  name={item?.serviceName}
                  typeName={item?.serviceTypeName}
                  textColor={'black'}
                  price={item?.amount}
                  currency={item?.currency}
                  scheduletime={item.bookingDateTime}
                  img={item?.icon}
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
        </View>
      ) : (
        <SimpleText text={t('noAppointment')} />
      )}
      <Button
        buttonText={t('addAppoinments')}
        marginTop={hp(2)}
        onPress={() =>
          navigation.navigate('STYLIST_ADD_APPOINTMENT', {stylistId: stylistId})
        }
      />
    </View>
  );
};

export default AppointmentScreen;
