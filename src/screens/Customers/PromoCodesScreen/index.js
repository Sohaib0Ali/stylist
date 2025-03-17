//================================ React Native Imported Files ======================================//
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../components/Header/Header';
import Title from '../../../components/Title/Title';
import PromoCodeComponent from '../../../components/Client Components/PromoCodeComponent';
import SemiTitle from '../../../components/SemiTitle';
import colors from '../../../assets/colors/colors';
import Config from '../../../config/config';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import {showWarning} from '../../../../Utils/FlashMessage';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');
let aspectRatio = width / height;
let ltDelta = 0.0412;
let lgDelta = ltDelta * aspectRatio;

const PromoCodesScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [promoData, setPromoData] = useState([]);
  const [nearByData, setNearByData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    latitude: 0,
    latitudeDelta: ltDelta,
    longitudeDelta: lgDelta,
  });

  useEffect(() => {
    if (userPosition.latitude != 0) {
      getPromoCodeData();
    }
  }, [userPosition]);

  useEffect(() => {
    if (isFocused) {
      getMyCurrentLocation();
    }
  }, [isFocused]);

  const getMyCurrentLocation = () => {
    getLocation()
      .then(location => {
        let myLocation = {};
        myLocation.latitude = location.coords.latitude;
        myLocation.longitude = location.coords.longitude;
        myLocation.latitudeDelta = ltDelta;
        myLocation.longitudeDelta = lgDelta;
        setUserPosition(myLocation);
      })
      .catch(error => {
        setLocationGranted(false);
      });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse')
          .then(response => {
            if (response === 'granted') {
              Geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
              );
            } else {
              reject('location permission denied');
              alert('Location must be granted for this operation');
            }
          })
          .catch(error => reject(error));
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then(response => {
            if (response === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                position => {
                  resolve(position);
                },
                error => {
                  reject(error);
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
              );
            } else {
              reject('location permission denied');
            }
          })
          .catch(error => reject(error));
      }
    });
  };

  const getPromoCodeData = () => {
    setLoading(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}getUserPromoCodes?lat=${userPosition.latitude}&lng=${userPosition.longitude}`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        setLoading(false);
        if (res.success) {
          setPromoData(res.data.promoCodes);
          setNearByData(res.data.nearby);
        }
      })
      .catch(function (error) {
        setLoading(false);
        showWarning(t('TryAgain'));
      });
  };

  return (
    <View style={styles.container}>
      <Header small />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          paddingHorizontal={wp('4%')}
          marginRight={wp(1)}
          title={t('promoCodes')}
          alignSelf="flex-start"
          marginBottom={hp(1)}
        />

        <FlatList
          contentContainerStyle={{
            paddingBottom: hp('4%'),
            backgroundColor: colors.secondary,
          }}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={promoData}
          renderItem={({item, index}) => (
            <PromoCodeComponent
              img={item.pictureURL}
              discount={item.discount}
              offerName={item.code}
              offers={item.description}
              onPress={() => navigation.navigate('DISCOUNT_SCREEN')}
            />
          )}
          keyExtractor={item => item._id}
        />

        <SemiTitle
          title={t('nearYou')}
          marginBottom={hp(1)}
          marginRight={wp(1)}
          paddingHorizontal={wp('4%')}
        />
        <FlatList
          contentContainerStyle={{paddingBottom: hp('4%')}}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nearByData}
          renderItem={({item, index}) => (
            <PromoCodeComponent
              img={item.pictureURL}
              discount={item.discount}
              offerName={item.code}
              offers={item.description}
              onPress={() => navigation.navigate('DISCOUNT_SCREEN')}
            />
          )}
          keyExtractor={item => item._id}
        />
      </ScrollView>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default PromoCodesScreen;
