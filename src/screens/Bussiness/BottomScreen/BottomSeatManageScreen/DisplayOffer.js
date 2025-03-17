import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import BConfig from '../../../../BusinessUtills/config/config';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import Button from '../../../../BusinessUtills/components/Button/Button';
import ServiceDetailComponent from '../../../../BusinessUtills/components/Business Components/Service Component/ServiceDetailComponent/ServiceDetailComponent';
import {useSelector} from 'react-redux';
import {SALON_OFFER} from '../../../../../redux/store/actions/salons_Actions';

const DisplayOffer = ({OnAddOffer}) => {
  const Salon_Offers = useSelector(state => state?.SalonDetails?.SalonOffer);
  const [offers, setOffers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setOffers(Salon_Offers);
    }
  }, [isFocused, Salon_Offers]);

  const handleValueChange = id => {
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
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.createOfferText}>Create offer</Text>
        <View style={{marginBottom: verticalScale(50)}}>
          <FlatList
            data={offers}
            style={styles.flatList}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
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
                  onSwitchValueChange={handleValueChange}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText="Create offer"
          width="100%"
          onPress={() => OnAddOffer('AddNEWOFFER')}
          marginTop={verticalScale(-30)}
        />
      </View>
    </View>
  );
};

export default DisplayOffer;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(400),
  },
  createOfferText: {
    marginTop: hp(1),
    fontSize: scale(16),
    lineHeight: scale(22),
    color: '#5E5E5F',
    fontFamily: fonts.Exo2Regular,
    fontWeight: '400',
  },
  flatList: {
    flexGrow: 1,
  },
  buttonContainer: {
    bottom: scale(15),
    width: '100%',
    paddingHorizontal: hp(2),
  },
});
