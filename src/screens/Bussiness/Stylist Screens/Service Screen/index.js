//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {useTranslation} from 'react-i18next';

const ServiceScreen = ({data, salonData}) => {
  const [loading, setLoading] = useState(false);
  const [services, setservices] = useState([]);
  const stylistId = data?._id;
  const salonId = salonData?.salon?._id;
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getStylistServices(stylistId, salonId);
    }
  }, [isFocused]);

  const getStylistServices = () => {
    var data = JSON.stringify({
      salonId: salonId,
      stylistId: stylistId,
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}business/stylistServices`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response?.data?.success === true) {
          setservices(response?.data?.data);
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
      ) : services.length > 0 ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {services?.map(item => {
            return (
              <ServiceDetailComponent
                key={item?._id}
                cat={item?.servname}
                textColor={'black'}
                currency={item?.currency}
                time={item?.approxtime}
                price={item?.price}
                img={item?.icon}
                service={true}
                onPress={() => setSelectedId(item?._id)}
              />
            );
          })}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{t('weeklyStylist')}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <SimpleText text={t('noServiceFound')} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{t('weeklyStylist')}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ServiceScreen;
