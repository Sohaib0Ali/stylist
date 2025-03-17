import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Header from '../../../../BusinessUtills/components/Header/Header';
import Title from '../../../../BusinessUtills/components/Title/Title';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {SALON_OFFER} from '../../../../../redux/store/actions/salons_Actions';

const OffersScreen = () => {
  const dispatch = useDispatch();
  const Salon_Offers = useSelector(state => state?.SalonDetails?.SalonOffer);
  const [offers, setOffers] = useState();
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  const {t} = useTranslation();

  useEffect(() => {
    if (isFocused) setOffers(Salon_Offers);
  }, [isFocused]);

  const handleValueChange = (value, id) => {
    var data = '';
    var config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}/business/activeAndInactiveOffer/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          dispatch({type: SALON_OFFER, payload: res?.data});
        }
      })
      .catch(function (error) {});
  };
  return (
    <View style={styles.container}>
      <Header
        direction={'RTL'}
        headerBack={true}
        onBackPress={() => navigation.goBack()}
        headerColor={'white'}
      />
      <Title
        title={t('offers')}
        alignSelf={'baseline'}
        paddingHorizontal={wp('4%')}
      />
      <ScrollView style={{height: hp(60)}} showsVerticalScrollIndicator={false}>
        {offers?.map(item => {
          const backgroundColor =
            item._id === selectedId ? colors.yellow : colors.white;
          return (
            <ServiceDetailComponent
              key={item._id}
              id={item._id}
              cat={item.offerDescription}
              time={item.days}
              borderRadius={wp(3.1)}
              status={item.status}
              offer={true}
              img={item.serviceId.icon}
              service={true}
              checkswitch={true}
              backgroundColor={{backgroundColor}}
              onSwitchValueChange={handleValueChange}
            />
          );
        })}
        <View style={{paddingHorizontal: wp('4%')}}></View>
      </ScrollView>

      <View style={{paddingHorizontal: wp('4%')}}>
        <Button
          buttonText={t('addOffer')}
          width="100%"
          marginTop={hp(3)}
          onPress={() => navigation.navigate('ADD_NEW_OFFERS')}
        />
      </View>
    </View>
  );
};

export default OffersScreen;
